# DVA Learning Notes

## Why Dva?

### Start from react

#### react没有解决的问题

- react 的优势
  - 运行效率高：react是一个DOM的抽象层，通过组件构建虚拟DOM,运行效率高
  - 组件化：可以累积业务组件，也可以使用开源组件
- react没有解决的问题
  - 数据流问题
    - 组件之间的通信（通过redux解决）
    - 实现异步逻辑（通过redux-thunk/redux-promise/redux-saga来解决）
  - 路由（react-router）

>> 结论1：光使用react本身是无法编写大型复杂的应用的；redux的适用场景是：多交互、多数据源。

#### 流行的react实践方案

- 数据流方案： redux
- 异步操作： redux-sage
- 路由：react-router

一个简单的例子 react + redux + react-router

    ```js
    // view(page)
    class CoursesPage extends React.Component {
        ...
        render() {...};
    }
    const mapStateToProps = (state, ownProps) =>({...});
    const mapDispatchToProps = dispatch = > ({...});
    export default connect(
        mapStateToProps,
        mapDispatchToProps
    )(CoursesPage);

    // redux
    // create action
    export const action1 = state1 => ({ type: type1, ...state1 });
    export const action2 = () => dispatch => beginCall().then(state2 => dispatch(action2(state2))).catch(() =>{});

    // create reducer
    const reducer1 = (state = initialState, action) => newState;
    const rootReducer =  combineReducers({
        state1: reducer1,
        state2: reducer2,
    });

    // create store
    const store = createStore(rootReducer, [initialState], applyMiddleware(...middleware));

    // router
    const App = () => (
        <Router>
            <Route path="/" exact component={HomePage} />
            <Route path="/courses" component={CoursesPage} />
        </Router>
    )
    ```
**痛点**

1. 文件组织结构复杂
   - 引入redux后，需要写action\reducer，还需要在component中connect
   - 文件分离，需要来回切换，编辑（增删改）成本高
2. 不便于组织业务模型
   - 目前的action\reducer按照视图结构进行组织的
   - 不好进行动态扩展
   - [Mobile opportunity example](https://msasg.visualstudio.com/Bing_Ads/_git/BingAdsMobile?path=%2Fapp%2Fredux%2Freducers%2Fopt-app%2Fopt-reducer.js&version=GBmaster)
3. 对大项目，难有动态加载方案

**继续讨论关于异步操作的问题**

1. what's redux-sage
   - 通过ES6 的 [Generator](http://es6.ruanyifeng.com/#docs/generator) 功能，让异步的流程更易于读取，写入和测试
   - 类似redux-thunk， 不过redux-thunk和redux-promise都相当于改造了action，但是redux-sage是把所有的业务逻辑都放到 saga 里，这样可以让 reducer, action 和 component 都很纯粹
   - An example
        ```js
            // this is a worker, will handle the action
            function *userFetch() {
                try {
                    yield put({ type: USERDATA_REQUEST });
                    let { data } = yield call(request.get, `/users/${uid}`);
                    yield put({ type: USERDATA_SUCCESS, data });
                } catch(e) {
                    yield put({ type: USERDATA_ERROR, error });
                }
            }
            // this is a watcher, will watch for dispatch actions
            function *userFetchWatcher() {
                takeEvery('user/fetch', userFetch);
            }
            // a task is like a process running in background
            function *rootSaga() {
                yield fork(userFetchWatcher);
            }
        ```
2. sage优势(优雅且强大)
   - 可以把所有的业务逻辑都放到sage中，让reducer,action和component都很纯粹
   - sage可以更好的支持长流程的业务逻辑
   - redux-sage可以更好的支持组合、取消、多任务调度等复杂操作。
3. sage缺点
   - 监听一个 action 需要走 fork -> watcher -> worker 的流程
   - 每个action都书写一遍，会显得很冗余

>> 结论2： react的最佳实践在项目中使用仍旧存在一些痛点和问题。

## What Dva

### dva basic

- Model 可认为是领域模型，用于把数据相关的逻辑聚合到一起
  - namespace/state/reducers/effects/subscriptions
- State 表示应用的数据层，由 model 的 state 组成全局的 state
- Reducer 是唯一可以修改 state 的地方，接收 state 和 action，返回新的 state
- Effect 用于处理异步逻辑，基于 redux-saga 实现,将异步转成同步写法，从而将effects转为纯函数。
- Subscription 表示订阅，用于订阅一个数据源，然后按需 dispatch action. 数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等.
- Router 路由配置信息

>> 结论3： dva没有引入新的概念，只是对数据相关逻辑做了一个聚合，产生了dva的model，通过sage将异步的reducer拆分出来作为effct，并且增加了订阅，enhance了路由

### what dva

1. dva-core = redux + redux-saga 数据流方案
   - dva-core 主要解决了 model 的问题，包括 state 管理、数据的异步加载、订阅-发布模式的实现，可以作为数据层在各处使用。
2. dva = dva-core + react-router
   - dva传递了一些初始化数据到 dva-core 所实现的 model 层，在dva-core的基础上，实现了 dva 的 view 层。
   - 并提供了一些dva中常用的方法函数。
      - dynamic 动态加载
      - 以下部分， dva只是搬运工
          - fetch 请求方法
          - saga(数据层处理异步的方法)。
          - react-router-dom和react-router-redux
          - react-redux的connect
3. dva数据流图
   ![dva数据流图](https://raw.githubusercontent.com/sharonrain/Learning-book/master/doc/front/react/assets/ESPP.JPG)

>> 结论4： dva是很薄的一层，主要逻辑在dva-core中，dva-core也可以作为一个独立的数据流解决方案。具体细节可以参考源码解读。

### an dva example

A real dva model

```js
export default {
    namespace: 'authors',
    state: {
        list: [],
    },
    reducers: {
        save(state, { payload: {data: list } }) {
            return { ...state, list };
        },
    },
    effects: {
        *fetch({ payload: { page = 1 } }, { call, put }) {
            const { data, headers } = yield call(authorsService.fetch, { page });
            yield put({
              type: 'save',
              payload: {
                data,
              },
            });
        },
        *create({ payload: values }, { call, put }) {
            yield call(authorsService.create, values);
            yield put({ type: 'reload' });
        },
        *reload(action, { put, select }) {
            const page = yield select(state => state.authors.page) || 1;
            yield put({ type: 'fetch', payload: { page } });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
          return history.listen(({ pathname, query }) => {
            if (pathname === '/authors') {
              dispatch({ type: 'fetch', payload: query || { } });
            }
          });
        },
    },
};
```

A dva example

```js
import dva from'dva';

const app = dva();
app.use(require('dva‐loading')()); // optional
app.model(require('./models/authors'));
app.router(require('./router'));
app.start();
```

### Use in Bingads

1. dva core是一个独立的数据解决方案，广泛应用于阿里内部（600+项目）
   bundle size: 78.6kb(minified), 24.4kb(minified+gzipped)
   download time: 488ms(50kb/s)
2. 目前CampaignUI对redux的使用情况：
   - 大部分feature都基于一些已经存在的component，但不是react
   - AdsAppsSharedComponent中的模块多是拆分的小模块，偏向于view的实现，只使用react，没有用到redux+react
   - AdsAppsCampaign中有一个feature(brand-management/business-portal-content)用到了react+redux的解决方案
3. 个人观点：
   - 目前dva在Bingads中暂时用不起来，因为暂时没有这样的需求，但dva对于一个有复杂数据流的start up项目确实是个很不错的选择，我们可以在开发新工具的时候使用,用起来体验感也方便
   - 对于Bingads中的新的feature，多数据流且使用到redux的时候可以考虑使用dva-core，实践效果优于redux
   - 但是对于new ui，new ui都是基于react，我们的整个网站可以考虑使用dva，或则借鉴dva的思想，搭建自己的底层框架，dva对model进行了封装且兼具扩展性，优化了大家的开发体验。

## 源码解读

### what dva-core done

dva-core主入口：
create dva

- Create dva with plugin: 详细见#3

start dva

- GetSaga： 详细见#1
- GetReducer： 详细见#2
- Create store: 详细见#5
- Run subscriptions: 详细见#4
- Set up app.model after app start: 详细见#7

1. 简化了saga书写:getSaga文件将统一对用户输入的 effects 部分的键值对函数进行管理。
   - 统一书写了fork -> watcher -> worker 的流程
   - 允许通过onEffect封装执行。比如 dva-loading 基于此实现了自动处理 loading 状态
   - 统一处理了每个sage的try .. catch
   - 使用时只需要简单配置对应的effect操作即可

        ```js
        {
            effects: {
                *fetch({ uid }, { call, put }) {
                    yield put({ type: USERDATA_REQUEST });
                    let { data } = yield call(request.get, `/users/${uid}`);
                    yield put({ type: USERDATA_SUCCESS, data });
                },
            },
        }
        ```

    (getSaga 最终返回了一个 generator 函数, 该函数遍历了** model 中 effects 属性**的所有方法,结合 index.js 里的 for (const m of app._models)，该遍历针对所有的 model, 对于每一个 effect，getSaga 生成了一个 watcher ，并使用 saga 函数的 fork 将该函数切分到另一个单独的线程中去（生成了一个 task 对象）。同时为了方便对该线程进行控制，在此 fork 了一个 generator 函数。在该函数中拦截了取消 effect 的 action, 一旦监听到则立刻取消分出去的 task 线程)  
    (getWatcher: applyOnEffect 对 effect 进行了动态代理，在保证 effect （即 _effect）正常调用的情况下，为期添加了 fns 的回调函数数组(即 onEffect)。使得在 effect 执行时， onEffect 内的每一个回调函数都可以被触发。因为没有经过 effects 的属性是数组的情况，所以 type 的值是 takeEvery，也就是监听每一个发出的 action)  
    (在 sagaWithOnEffect 函数中，sagas 使用传入的参数(也就是 action)执行了对应的 model 中 对应的 effect 方法，同时将返回值使用之前保存在 map 里的 resolve 返回了其返回值。同时在执行 effect 方法的时候，将 saga 本身的所有方法(put、call、fork 等等)作为第二个参数，使用 concat 拼接在 action 的后面。在执行 effect 方法前，又发出了 start 和 end 两个 action，方便 onEffect 的插件进行拦截和调用)

     - dva 通过 app._getSaga(m.effects, m, onError, plugin.get('onEffect')) 返回了一个 genenrator 函数。
     - 在 genenrator 函数中手动 fork 出一个 watcher 函数的监听线程(当然也 fork 了取消线程的功能)。
     - 该函数(在普通状态下)是一个 takeEvery 的阻塞是线程，接收 2 个参数。第一个参数为监听的 action，第二个参数为监听到 action 后的回调函数。
     - (普通状态下)的回调函数，就是手动调用了 model 里 effects 中对应属性的函数。在此之前之后发出了 start 和 end 的 action，同时用之前 promise 中间件保存在 map 中的 resolve 方法返回了值。
     - 最后使用 sagas.forEach(sagaMiddleware.run) 启动了 watcher 的监听

2. 省略了action的书写：getReducer和handleActions将dva的reducer转化为redux接受的reducer
   - 默认的handlerAction会自动将reducer的namespace + key作为action的type触发相应的reducer
   - 允许自定义handlerActions,例如dva-immer通过改写handlerActions实现了immer reducer
   - model中reducer的配置

        ```js
        {
            save(state, { data: list, total, page }) {
                return { ...state, list, total, page, authors };
            },
        }
        ```
3. 通过Plugin中不同种类的钩子事件来丰富数据流方案
   - 目前支持的hooks类型主要如下：

        ```js
        const hooks = [
            // effect 执行错误或 subscription 通过 done 主动抛错时触发，可用于管理全局出错状态。
            'onError',
            // state 改变时触发，可用于同步 state 到 localStorage，服务器端等
            'onStateChange',
            // 在 action 被 dispatch 时触发，用于注册 redux 中间件。支持函数或函数数组格式。
            'onAction',
            // 热替换相关，目前用于 babel-plugin-dva-hmr
            'onHmr',
            // 封装 reducer 执行。比如借助 redux-undo
            'onReducer',
            // 封装 effect 执行。比如 dva-loading 基于此实现了自动处理 loading 状态
            'onEffect',
            // 指定额外的 reducer，比如 redux-form 需要指定额外的 form reducer
            'extraReducers',
            // 指定额外的 StoreEnhancer ，比如结合 redux-persist 的使用
            'extraEnhancers',
            // 定义/转化reducer
            '_handleActions',
        ];
        ```
4. subscription
   - 订阅一个数据源，然后按需 dispatch action
   - 包含取消订阅函数
5. createstore
   - 创建带中间件cratePromiseMiddleware, sagaMiddleware, extraMiddlewares(onAction)的store
6. cratePromiseMiddleware: 自定义的 redux 插件,用于支持effect, 方便在视图层 dispatch action 并处理回调

   ```js
   dispatch({ type: 'count/addAsync' })
    .then(() => {
        console.log('done');
    });
   ```

7. app start后，可以通过app.model来inject 新的model, 通过app.unmodel来unregister model, app.replaceModel来替换model
   - inject的过程和index中start的过程相似，getreducer => replace store reducer => run sage => run subscription
   - unmodel的过程， deleteReducer => cancel effect => unlisten subscriptions
   - replace old, delete old model => inject new model

### what dva done

index 文件

1. 使用 call 给 dva-core 实例化的 app(这个时候还只有数据层) 的 start 方法增加了一些新功能（或者说，通过代理模式给 model 层增加了 view 层）
2. 使用 react-redux的Provider为react提供了store context, 从而使得connect过程中可以从为被代理的组件实现了从 context 中获得 store 的方法，如将dipatch存入到props中。
3. 添加了 redux 的中间件 react-redux-router，强化了 history 对象的listen功能。

dynamic文件

1. 动态load model和component，load完成后resolve返回AsyncComponent即需要加载的Component
    - 在 constructor 里面调用 this.load(); ( LoadingComponent 为占位 component)
    - 在 this.load(); 函数里面调用 dynamic 函数返回的 resolve 方法
    - resolve 方法实际上是一个 Promise，把相关 models 和 component 加载完之后 resolve (区分这两个 resolve)
    - 加载完成之后返回 AsyncComponent (即加载的 Component)

```js
import dynamic from 'dva/dynamic';

const UserPageComponent = dynamic({
  app, // router所挂载的实例
  models: () => [
    import('./models/users'),
  ],
  component: () => import('./routes/UserPage'),
});
```
