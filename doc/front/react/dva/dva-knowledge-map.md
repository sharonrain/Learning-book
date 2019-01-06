# knowledge map

[JS 函数式编程指南](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)

## react and redux

### react

1. react 没有解决的问题
   - 通信,目前只提供一种手段，传参数。
   - 数据流：数据如何和视图串联起来？路由和数据如何绑定？如何编写异步逻辑？
   - 路由： react-router、redux、redux-saga(异步)

### redux

[redux](https://cn.redux.js.org/docs/basics/ExampleTodoList.html)

1. redux 是一个数据管理框架
2. Redux 本身是一个很轻的库，解决 component -> action -> reducer -> state 的单向数据流转问题。
3. 优点：
   - 可预测性；大量使用 pure function 和 plain object 等概念(reducer 和 action creator 是 pure function，state 和 action 是 plain object)，并且 state 是 immutable 的。
   - 可扩展性；通过 middleware 定制 action 的处理，通过 reducer enhancer 扩展 reducer 等等
4. 数据异步处理：
   - redux-thunk 是支持函数形式的 action，这样在 action 里就可以 dispatch 其他的 action 了。
   - redux-promise 和上面的类似，支持 promise 形式的 action，这样 action 里就可以通过看似同步的方式来组织代码。
   - redux-saga 把所有的业务逻辑都放到 saga 里，这样可以让 reducer, action 和 component 都很纯粹，干他们原本需要干的事情。
   - 前面两个在 action 需要组合、取消等操作时，会不好处理。且改变了action使得action变得不存了。

```js
yield sagaEffects.fork(function*() {
    yield sagaEffects.take(`${model.namespace}/@@CANCEL_EFFECTS`);
    yield sagaEffects.cancel(task);
});
```

### react-redux

1. react-redux针对react开发了一个插件，提供了Provider和connect两个API
2. Provider源码主要是为了将store提供到context中
3. connect

    ```js
    connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
    // ownProps是组件中自己的props
    mapStateToProps(state, ownProps) : stateProps
    // 将action作为props绑定到component上
    mapDispatchToProps(dispatch, ownProps): dispatchProps

    //dispatch 两种写法：
    const mapDispatchToProps = (dispatch, ownProps) => {
        return {
            increase: (...args) => dispatch(actions.increase(...args)),
            decrease: (...args) => dispatch(actions.decrease(...args))
        }
    }

    const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
        increase: action.increase,
        decrease: action.decrease
    });
    }
    // merge stateProps/dispatchProps and ownProps together
    // 通常情况下，不传这个参数，connect 就会使用 Object.assign 替代该方法。
    [mergeProps(stateProps, dispatchProps, ownProps): props]
    ```

### immer

1. produce(currentState, producer: (draftState) => void): nextState
2. 保持当前状态的immutable，并且利用draft维护可变状态，等结束后，产生新的next的immutalbe
3. 优势
   - Immutability with normal js
   - 方便deep update
   - bundle只有2kb
   - 更少的噪声，更清晰的code

## redux sage

### Es6 Generator

1. ES6 提供的一种异步编程解决方案
2. Generator 函数特征
    - function关键字和函数名之间有一个星号
    - 函数体内部使用yield表达式
3. 调用 Generator 函数后，该函数并不执行，返回的是一个指向内部状态的指针对象。通过next方法，使得指针移向下一个状态。
4. **Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。**
5. 由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口。

   ```js
    var myIterable = {};
    myIterable[Symbol.iterator] = function* () {
        yield 1;
        yield 2;
        yield 3;
    };

    [...myIterable] // [1, 2, 3]
   ```

6. next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。

   ```js
   function* foo(x) {
        var y = 2 * (yield (x + 1));
        var z = yield (y / 3);
        return (x + y + z);
    }
    var b = foo(5);
    b.next() // { value:6, done:false }
    b.next(12) // { value:8, done:false }
    b.next(13) // { value:42, done:true }
   ```

7. for...of循环可以自动遍历 Generator 函数时生成的Iterator对象，且此时不再需要调用next方法。

   ```js
   function* foo() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        yield 5;
        return 6;
    }

    for (let v of foo()) {
        console.log(v);
    }
    // 1 2 3 4 5
   ```

### redux-sage

[Redux-sage-doc](https://redux-saga-in-chinese.js.org/)
[Redux-sage-eng](https://redux-saga.js.org/docs/Glossary.html)

1. redux-saga 使用了 ES6 的 Generator 功能，让异步的流程更易于读取，写入和测试。
    - 集中处理 redux 副作用问题；被实现为 generator；类 redux-thunk 中间件；watch/worker（监听->执行） 的工作形式。
2. 可以用来替换redux-thunk中间件。通过创建 Sagas 去搜集所有的副作用逻辑到一个集中的地方。
    - Reducers 负责处理action的state转换
    - Sagas 负责策划统筹合成和异步操作
3. Effects
    - put, 作用和 redux 中的 dispatch 相同
    - select, 作用和 redux thunk 中的 getState 相同。
        ```js
        const id = yield select(state => state.id);
        ```
    - take, 等待 redux dispatch 匹配某个 pattern 的 action
    - takeEvery
       ```js
       //利用 take 实现 logMiddleware 的例子
       yield takeEvery('*', function* logger(action) {
            const newState = yield select();

            console.log('received action:', action);
            console.log('state become:', newState);
        });
       //等价于
       while (true) {
            const action = yield take('*');
            const newState = yield select();

            console.log('received action:', action);
            console.log('state become:', newState);
        }
       ```
    - takeLatest得到最新那个请求的响应
4. 错误处理
   - 全局错误处理， effects 和 subscriptions 的抛错全部会走 onError hook，所以可以在 onError 里统一处理错误。
   - 本地错误处理，如果需要对某些 effects 的错误进行特殊处理，需要在 effect 内部加 try catch 。
5. redux-saga 可以用 fork 和 call 来调用子 saga ，其中 fork 是无阻塞型调用，call 是阻塞型调用。
6. 优缺点
    - 优点：保持 action 的简单纯粹；redux-saga 提供了丰富的 Effects，方便处理复杂的异步问题上；扩展性强；声明式的 Effects，使代码更易测试；
    - 缺点：与其他中间件难搭配，调试困难，babel常错位，redux-saga不强制捕获异常，没有捕获异常时很难调试。
7. saga的应用场景是复杂异步，如长时事务LLT(long live transcation)等业务场景。
    - 方便测试，可以使用takeEvery打印logger。
    - 提供takeLatest/takeEvery/throttle方法，可以便利的实现对事件的仅关注最近事件、关注每一次、事件限频
    - 提供cancel/delay方法，可以便利的取消、延迟异步请求
    - 提供race(effects),[…effects]方法来支持竞态和并行场景
    - 提供channel机制支持外部事件

## router

### history

1. history 知道如何去监听浏览器地址栏的变化， 并解析这个 URL 转化为 location 对象
2. 常用的 history 有三种形式
   - browserHistory: 使用浏览器中的 History API 用于处理 URL,需要服务器配置
   - hashHistory: 使用 URL 中的 hash（#）部分去创建形如 example.com/#/some/path 的路由，无需服务器配置。
   - createMemoryHistory： 不会在地址栏被操作或读取

### react-router 4

#### react router 4 哲学

1. 动态映射： React组件渲染是动态发生的，那么就让Route变成一个React组件，和其他组件一样被渲染


### react-router dva

1. dva基于 action 进行页面跳转

   ```js
   import { routerRedux } from 'dva/router';

    // Inside Effects
    yield put(routerRedux.push('/logout'));

    // Outside Effects
    dispatch(routerRedux.push('/logout'));

    // With query
    routerRedux.push({
    pathname: '/logout',
    query: {
        page: 2,
    },
    });
   ```

### react-router-redux

1. react-router-redux 是 redux 的一个中间件, 加强了React Router库中history这个实例，以允许将history中接受到的变化反应到state中去。
2. dva 在此基础上又进行了一层代理，把代理后的对象当作初始值传递给了 dva-core，方便其在 model 的 subscriptions 中监听 router 变化。

## build

### roadhog

1. [link](https://github.com/sorrycc/roadhog/blob/master/README_zh-cn.md)
2. 可配置版本的create-react-app
