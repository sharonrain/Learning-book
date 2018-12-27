# dva API

## dva Api

1. app = dva(opts), opts 包含
   - history：指定给路由用的 history，默认是 hashHistory
   - initialState：指定初始数据，优先级高于 model 中的 state，默认是 {}
   - opts 里也可以配所有的 hooks, 所有可配置的属性

   ```js
   const app = dva({
        history,
        initialState,
        // effect 执行错误或 subscription 通过 done 主动抛错时触发，可用于管理全局出错状态。subscription需要通过done抛出
        onError,
        // 在 action 被 dispatch 时触发，用于注册 redux 中间件。支持函数或函数数组格式。
        onAction,
        // state 改变时触发，可用于同步 state 到 localStorage，服务器端等
        onStateChange,
        // 封装 reducer 执行。比如借助 redux-undo
        onReducer,
        // 封装 effect 执行。比如 dva-loading 基于此实现了自动处理 loading 状态
        onEffect,
        // 热替换相关，目前用于 babel-plugin-dva-hmr
        onHmr,
        // 指定额外的 reducer，比如 redux-form 需要指定额外的 form reducer
        extraReducers,
        // 指定额外的 StoreEnhancer ，比如结合 redux-persist 的使用
        extraEnhancers,//区别于onAction，onAction注册middlerware，需要applymiddleware（...middleware）
    });
   ```

2. app.use(hooks): 配置 hooks 或者注册插件。（插件最终返回的是 hooks ）除了上面的hook还有_handleActions
3. app.unmodel(namespace) : 取消 model 注册，清理 reducers, effects 和 subscriptions。
4. app.replaceModel(model): 替换model为新model, 但会保留旧的state状态
   - 如果原来不存在相同namespace的model，那么执行app.model操作
5. app.router(({ history, app }) => RouterConfig)
   - 有些场景可能不使用路由，比如多页应用，所以也可以传入返回 JSX 元素的函数
   - ```app.router(() => <App />)```;
6. app.start(selector?) 启动应用。selector 可选，如果没有 selector 参数

## dva输出文件

1. dva/router: 默认输出 react-router 接口， react-router-redux 的接口通过属性 routerRedux 输出.
2. dva/fetch: 输出 isomorphic-fetch 的接口
3. dva/saga: 输出 redux-saga 的接口，主要用于用例的编写
4. dva/dynamic: 解决组件动态加载问题的 util 方法。

```js
import dynamic from 'dva/dynamic';

const UserPageComponent = dynamic({
  app,
  models: () => [
    import('./models/users'),
  ],
  component: () => import('./routes/UserPage'),
});
```

## dva应用

1. [dva-wxapp](https://github.com/yautah/dva-wxapp)
2. [Pluralsight Course](https://codesandbox.io/s/zxz3mmn77p)
3. 使用dva开发复杂模型：
   1. 动态加载模型
      - 每个功能页面是通过路由切换，互相之间没有关系的话，通常会使用webpack的require.ensure来做代码模块的懒加载
      ```js
      const routes = [
        {
            path: '/',
            name: 'IndexPage',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                registerModel(app, require('./models/dashboard'));
                cb(null, require('./routes/IndexPage'));
                });
            },
        },
        {
            path: '/users',
            name: 'UsersPage',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                registerModel(app, require('./models/users'));
                cb(null, require('./routes/Users'));
                });
            },
        },
      ];
      ```

   2. 使用model共享全局信息,不必非要把model按照视图的结构进行组织，可以适当按照业务分类，把一些数据存在对应业务的model中，分别通过不同的effect去更新，在获取的地方再去组合，这样可以使得model拥有更好的复用性.
   3. 业务上可能遇到期望把一些与外部关联较少的model拆出来的需求，我们可能会拆出这样的一个model，然后用不同的视图容器去connect它
   4. 动态扩展model,用dva-model-extend扩展model，通过工厂函数来生成model。
   5. 支持长流程的业务逻辑
   6. 使用take操作进行事件监听
   7. 多任务调度
      - 任务的并行执行
         ```js
         const [result1, result2]  = yield [
            call(service1, param1),
            call(service2, param2)
         ]
         ```
      - 任务的竞争
         ```js
         const { data, timeout } = yield race({
            data: call(service, 'some data'),
            timeout: call(delay, 1000)
         });
         ```
   8. 跨model通信
       - 用namespace去指定接受action的model，完成各类组合

## dva 2.0

1. 提取了dva-core,其中只封装了redux和redux-sage存数据流方案
   - 使得dva可以应用在其他领域
   - 也可以满足dva在同一领域的多种实现，如 dva-react-router-3 和 dva-no-router
2. dispatch(effectAction) => Proimse
3. 新增 dva/dynamic 接口，配合 react-router@4 处理组件的按需加载
4. take 自动补全 namespace 前缀
5. effect 前后会额外触发 /@@start 和 /@@end 的 action，可利用此约定实现 put 的同步执行

   ```js
    yield put({ type: 'addDelay', payload: { amount: 2 } });
    yield take('addDelay/@@end');
    const count = yield select(state => state.count);
    yield put({ type: 'addDelay', payload: { amount: count, delay: 0 } });
   ```

**Break change**

1. 路由基于 react-router@4 实现，写法上会有不同
2. 同名 reducer 和 effect 不会 fallthrough（即两者都执行），而是仅执行 effect
3. history 的 location 属性上不再包含 query(history库变动)

## dva code analysis

### dva-core

1. use: plugin.use
2. model: push each model while it is valid
3. start: see below;

```js
const app = {
    _models: [prefixNamespace({ ...dvaModel })],
    _store: null,
    _plugin: plugin,
    use: plugin.use.bind(plugin),
    model,
    start,
  };
```

#### model related

1. checkModel: 对定义的 Model 进行检查是否符合要求
   - namespace必须被定义为字符串且唯一;
   - reducers可以为空，PlainObject 或者数组(数组reducers必须为[Object, Function]形式);
   - effects 可以为空，PlainObject
   - subscriptions 可以为空，PlainObject，subscription 必须为函数
2. prefixNamespace 该文件提供了对 reducer 和 effects 增加前缀(namespace)的工具性函数

#### saga related

1. getSaga: 将用户输入的 effects 部分的键值对函数进行管理
2. cratePromiseMiddleware 自定义的 redux 插件,用于支持effect, 方便在视图层 dispatch action 并处理回调.

   ```js
   dispatch({ type: 'count/addAsync' })
    .then(() => {
        console.log('done');
    });
   ```

#### redux

1. getReducer 这里面的函数其实主要就是调用了 handleActions 文件导出的函数
2. handleActions 是将 dva 风格的 reducer 和 state 转化成 redux 本来接受的那种方式
3. createStore 封装了 redux 原生的 createStore
4. constants 非常简单的常量文件，目前只定义了一个常量：NAMESPACE_SEP(/)
5. perfixedDispatch 该文件提供了对 Dispatch 增加前缀的工具性函数 prefixedDispatch
6. subscriptions 该文件提供了运行 subscriptions 和调用用户返回的 unlisten 函数以及删除缓存的功能
7. prefixType 判断是 reducer 还是 effects

#### plugin

1. Plugin 插件类：可以管理不同钩子事件的回调函数，拥有增加、获取、执行钩子函数的功能
2. utils 提供一些非常基础的工具函数

#### 主入口

1. createSagaMiddleware
2. createPromiseMiddleware
3. getSaga
4. getReducer
5. effects push to saga
6. set up subscription/run model

#### dynamic

1. 新增 dva/dynamic 接口，配合 react-router@4 处理组件的按需加载
2. react-router@4 的路由是组件式的，手动处理组件的按需加载并结合 model 和 app 有点麻烦，所以封装了 dva/dynamic util 方法。

    ```js
    const Users = dynamic({
    app,
    models: () => [
        import('./models/users'),
    ],
    component: () => import('./routes/Users'),
    });

    // render
    <Route exact path="/users" component={Users} />
    ```

### dva-immer

1. use immer 来handle Action

### dva-loading

[Link](https://github.com/Nbsaw/notes/issues/75)

1. 是一个处理effect的插件。
2. Dva-loading通过extraReducers和onEffect两个Hook来给原来的Model加上了一个全局的loading还有局部的loading以及处理Hide和Show的Reducers。
3. 给每个Effects执行开始的时候和执行结束的时候加上一个Action。
4. global会在有请求的时候被设置。其他的model下的loading会在请求执行的时候被设置为true。effects是指定actionType的loading状态。

### dva-no-router

1. dva without router enhance, the same as dva

### dva-react-router-3

1. dva with react router 3 enhance, the same as dva
