# React Doc

## 主要概念

### JSX简介

JSX代表Objects，Babel 转译器会把 JSX 转换成一个名为 React.createElement() 的方法调用

```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
// equal to
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);

// react element
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
};
```

### 元素渲染

将React元素渲染到根DOM节点中，通过把它们都传递给 ReactDOM.render() 的方法来将其渲染到页面上。   
**react只会更新必要的部分** ： React DOM 首先会比较元素内容先后的不同，而在渲染过程中只会更新改变了的部分。  

### 组件 & Props

**所有的React组件必须像纯函数那样使用它们的props**

### State & 生命周期

正确地使用状态
* 不要直接更新状态,必须使用setState()
* 状态更新可能是异步的
  - React 可以将多个setState() 调用合并成一个调用来提高性能
  - 因为 this.props 和 this.state 可能是异步更新的，你不应该依靠它们的值来计算下一个状态。
  
    ```js
    // Correct
    // 接收先前的状态作为第一个参数，此次更新被应用时的props做为第二个参数
    this.setState((prevState, props) => ({
    counter: prevState.counter + props.increment
    }));
    ```
* 状态更新合并
  - 当你调用 setState() 时，React 将你提供的对象合并到当前状态
  - 可以调用 setState() 独立地更新它们
  
自顶向下或单向数据流。 任何状态始终由某些特定组件所有，并且从该状态导出的任何数据或 UI 只能影响树中下方的组件。

### 事件处理

1. 不能使用返回false的方式阻止默认行为，必须明确的使用 preventDefault
2. JSX中的回掉函数需要手动绑定this
   - 使用属性初始化语法 ```handleClick=()=>{}```
3. 在类组件中定义的监听函数，事件对象 e 要排在所传递参数的后面


### 条件渲染

```js
// if
if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }
// &&
{unreadMessages.length > 0 &&
    <h2>
        You have {unreadMessages.length} unread messages.
    </h2>
}
// 三目运算符
<div>
    The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
</div>
// 阻止组件渲染: 让 render 方法返回 null
// 组件的 render 方法返回 null 并不会影响该组件生命周期方法的回调。例如，componentWillUpdate 和 componentDidUpdate 依然可以被调用
```

### 列表&Keys

* Keys可以在DOM中的某些元素被增加或删除的时候帮助React识别哪些元素发生了变化
* Key会作为给React的提示，但不会传递给你的组件
* 只有一个map可以直接写在JSX中，如果一个map()嵌套了太多层级，那可能就是你提取出组件的一个好时机

### 表单
* HTML表单元素与React中的其他DOM元素有所不同,因为表单元素生来就保留一些内部状态。
  - 直接提交不受控组件，会自动到达一个新界面
* textarea标签
  - HTML通过子节点定义内容
  - React中```<textarea>```会用value属性来代替
     ```js
      handleChange(event) {
          this.setState({value: event.target.value});
      }
      <textarea value={this.state.value} onChange={this.handleChange} />
     ```
* select标签
  - HTML中通过option中的selected来表示选中
  - React中通过select中的value来表示选中
* ```<input type="text">, <textarea>, 和 <select>``` 都十分类似 - 他们都通过传入一个value属性来实现对组件的控制
* file input标签，由于该标签的 value 属性是只读的，是 React 中的一个非受控组件```<input type="file" />```
* 当你有处理多个受控的input元素时，你可以通过给每个元素添加一个name属性，来让处理函数根据 event.target.name的值来选择做什么
  ```js
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  // render
  (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  ```

### 状态提升

* 如果另一个组件也需要这些数据，你可以将数据提升至离它们最近的共同祖先中。
* 状态提升要写更多的“炉墙代码”，比起双向绑定方式，但带来的好处是，你也可以花更少的工作量找到和隔离bug。

### 组合 VS 继承

React 具有强大的组合模型，我们建议使用组合而不是继承来复用组件之间的代码
* 包含关系： 我们建议这些组件使用 children 属性将子元素直接传递到输出。
* 特殊实例： 通过配置属性用较特殊的组件来渲染较通用的组件。
  ```js
  function Dialog(props) {
    return (
        <FancyBorder color="blue">
        <h1 className="Dialog-title">
            {props.title}
        </h1>
        <p className="Dialog-message">
            {props.message}
        </p>
        </FancyBorder>
    );
    }

    function WelcomeDialog() {
    return (
        <Dialog
        title="Welcome"
        message="Thank you for visiting our spacecraft!" />

    );
  }
  ```


## Question

1. 箭头函数和普通函数的区别
###
```js
```