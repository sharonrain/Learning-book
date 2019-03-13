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


## 高级指引

### 深入 JSX

```js
//点表示法用于JSX类型
const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}

//React 会将小写开头的标签名认为是 HTML 原生标签, 用户定义标签需大写

//在运行时选择类型
const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // 正确！JSX 标签名可以为大写开头的变量。
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}

//JSX的属性(Props)
//表达式
<MyComponent foo={1 + 2 + 3 + 4} />
//字符串常量
<div>{props.number} is an {description} number</div>;
  //当传递一个字符串常量时，该值为HTML非转义的，下面等价
  <MyComponent message="&lt;3" />
  <MyComponent message={'<3'} />

//属性默认为“True”
//... 作为“展开(spread)
<Greeting {...props} />;
const { kind, ...other } = props;
<button className={className} {...other} />;

//JSX中的子代
//React 组件也可以返回包含多个元素的一个数组
render() {
  // 不需要使用额外的元素包裹数组中的元素！
  return [
    // 不要忘记 key :)
    <li key="A">First item</li>,
    <li key="B">Second item</li>,
    <li key="C">Third item</li>,
  ];
}

//布尔值、Null 和 Undefined 被忽略
//false、null、undefined 和 true 都是有效的子代，只是它们不会被渲染。
//注意数字0有可能被渲染，保证前面为bool值
```

### 使用PropTypes检查类型

propTypes 只在开发模式下进行检查  
```js
MyComponent.propTypes = {
  // 你可以将属性声明为以下 JS 原生类型
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 任何可被渲染的元素（包括数字、字符串、子元素或数组）。
  optionalNode: PropTypes.node,
  // 一个 React 元素,设置children为此时候，指定只传递一个子代
  optionalElement: PropTypes.element,
  // 你也可以声明属性为某个类的实例，这里使用 JS 的instanceof
  optionalMessage: PropTypes.instanceOf(Message),
  // 你也可以限制你的属性值是某个特定值之一
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),
  // 限制它为列举类型之一的对象
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),
  // 一个指定元素类型的数组
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
  // 一个指定类型的对象
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),
  // 一个指定属性及其类型的对象
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // 你也可以在任何 PropTypes 属性后面加上 `isRequired` 
  // 任意类型的数据
  requiredAny: PropTypes.any.isRequired,
  // 你也可以指定一个自定义验证器。它应该在验证失败时返回
  // 一个 Error 对象而不是 `console.warn` 或抛出异常。
  // 不过在 `oneOfType` 中它不起作用。
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // 不过你可以提供一个自定义的 `arrayOf` 或 `objectOf` 
  // 验证器，它应该在验证失败时返回一个 Error 对象。 它被用
  // 于验证数组或对象的每个值。验证器前两个参数的第一个是数组
  // 或对象本身，第二个是它们对应的键。
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```


## API 参考

### React.Component

我们强烈反对你自己创建组件的基类。 In React components, 代码重用主要通过组合而非继承达成。  
#### 组件生命周期

```js
// mount
constructor()
static getDerivedStateFromProps() //不常用
render()
componentDidMount()
//Avoid UNSAFE_componentWillMount()

// update
static getDerivedStateFromProps() //不常用
shouldComponentUpdate() //不常用
render()
getSnapshotBeforeUpdate() //不常用
componentDidUpdate()
//Avoid UNSAFE_componentWillUpdate()
//Avoid UNSAFE_componentWillReceiveProps()

//unmount
componentWillUnmount()

//deal with error
static getDerivedStateFromError()
componentDidCatch()
```

##### render

* 返回值，React 元素／数组和fragments／Portals（让你渲染孩子们到一个不同的DOM子树）／字符串和数字／布尔或null（不渲染）
* render()函数应该是纯的，意味着不应该改变组件的状态，且不会直接和浏览器交互
* 若 shouldComponentUpdate()返回false，render()函数将不会被调用。

##### constructor(props)

* 如果你不初始化状态，也不绑定方法，那么你就不需要为React组件实现构造函数。
* 定义构造函数时，你应该在任何其他的表达式之前调用super(props)，否则this.props为定义导致bug
* 构造函数是你唯一可以直接赋值this.state的地方,其他地方setState()

```js
// 以下用例，使用componentDidMount()来代替。
// 避免拷贝属性(props)到状态!!!!!!!!
this.state = { color: props.color };
// 此模式仅用于你希望故意忽略属性更新 
// 比较合理的是重命名属性被叫作 initialColor 或是 defaultColor
```

##### componentDidMount()

* 完成对Dom的操作，和从远端加载数据
* 建立订阅的好地方，记得在componentWillUnmount()取消订阅
* 调用setState()。它将会触发一次额外的渲染，但是它将在浏览器刷新屏幕之前发生。这保证了在此情况下即使render()将会调用两次，用户也不会看到中间状态。谨慎使用这一模式，因为它常导致性能问题。

##### componentDidUpdate(prevProps, prevState, snapshot)

* 使用此方法作为操作DOM的一次机会。这也是一个适合发送请求的地方，可在此对比了当前属性和前一次属性
  ```js
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.userID !== prevProps.userID) {
            this.fetchData(this.props.userID);
        }
    }
  ```
* 可以立即调用setState()。 但是要注意 必须把它包裹在一个条件中 就像前面的例子中那样。否则你将引发一个无限循环
* 如果你的组件实现了 getSnapshotBeforeUpdate() 生命周期，它的返回值将当作一个第三方快照参数被传递到 componentDidUpdate()。否则这个参数将是未定义undefined。
* 若shouldComponentUpdate()返回false，componentDidUpdate()将不会被调用。

##### componentWillUnmount()

* 可以在该方法里处理任何必要的清理工作，例如解绑定时器，取消网络请求，清理任何在componentDidMount环节创建的订阅。

##### 很少使用的生命周期方法

- shouldComponentUpdate(nextProps, nextState)
  * 这个方法的存在是作为一种性能优化。 
  * 考虑使用内建的 PureComponent 代替手写shouldComponentUpdate()。PureComponent 对属性和状态执行浅比较，因而降低要更新的几率。
  * 返回false不能阻止子组件当他们的状态改变时重新渲染。
  * **未来React**可能会将shouldComponentUpdate()作为一个线索而不是一个严格指令，返回false可能仍然使得组件重新渲染
- static getDerivedStateFromProps(nextProps, prevState)
  * 组件实例化后和接受新属性时将会调用getDerivedStateFromProps。它应该返回一个对象来更新状态，或者返回null来表明新属性不需要更新任何状态
  * 如果父组件导致了组件的重新渲染，即使属性没有更新，这一方法也会被调用。
  * 调用this.setState() 通常不会触发 getDerivedStateFromProps()

#### 其他API
```js
setState()
forceUpdate()
```

#### 类属性

```js
defaultProps
displayName
```
#### 实例属性

```js
props
state
```

## Question

1. 箭头函数和普通函数的区别
###
```js
```