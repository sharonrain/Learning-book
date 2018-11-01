# React related knowledge compare

## 1. 框架对比思考

1. 前端需要解决的问题
   - 状态
   - 组织
     - 模块关系
     - 业务模型
   - 效率
     - 开发效率
     - 运行效率

2. 状态
   - 描述界面当前状况的数据可以称为状态。
   - 我们需要处理界面和数据之间的双向转换
   - 对状态做抽象，不同框架采用不同方式
     - Angular/Vue/Avalon/Regular/Knockout 通过类似模板的语法描述状态和数据的绑定关系，然后通过内部转换构建连接。
     - React走函数式流派，推崇单项数据流，给定原始数据，施加变化，从而到处另一个状态。

3. 组织
   - 业务代码组织，模块关系+业务模型
   - 模块关系解决依赖组件化，整个应用形成一个倒置的组件树
   - 业务模型：所处数据的业务数据，规则，流程的集合，例如Redux
   - 大部分人是缺乏整合能力的，小而美的库整合了，在棉铃不断增长的业务需求时候，还是需要一个大而全的方案。

4. 效率
   - 开发效率+运行效率 
   - 就开发效率而言，MVVM系的代码量会少一些，开发效率会高一些
   - 运行效率上，react原创的虚拟DOM有很大优势

## 2. MVVM vs Virtual Dom

1. Angular（脏检查）/knockout/Vue/Avalon（依赖收集） 均采用数据绑定，变化检查是数据层面的
   - 脏检查在数据量少的时候有些吃亏，但是依赖收集在初始化和数据变化时候都需要重新收集，数据量庞大时会产生一些消耗。
   - 在进行列表检查时候MVVM每一行都有viewmodel，所以肯定比react慢.
     - viewmodel >> virtual dom
     - Angular进行了列表重绘优化机制，track by id
2. React的检查是DOM结构层面
3. 结论
   - 初始渲染 Virtual Dom>脏检查>=依赖收集
   - 小量数据更新 依赖搜集>>Virtual dom+优化(shouldComponentUpdate) > 脏检查 > Virtual DOM(无优化)
   - 大量数据更新 脏检查+优化 >= 依赖收集+优化 > Virtual DOM >> MVVM无优化

## 3. vue卖点

1. 官方维护路由和状态管理类库
2. 专注于性能表现
3. 更低的学习成本，使用HTML
4. 更少的模板

## 4. MVVM和Virtual Dom

**MVVM**: 在模板中声明视图组件和状态的绑定，双向绑定引擎会在状态更新时候自动更新视图。  
**Virtual Dom**: 状态发生变化，用末班引擎重新渲染整个视图，替换旧视图，virtual Dom只是在这个基础上增加一些特殊的步骤避免整颗DOM树的变更。

DOM是很慢的，即使print一个简单的div，也很复杂。

```js
var div = document.createElement('div')
var str = ""
for (var key in div) {
  str = str + key + " "
}
console.log(str)
```

DOM树上的结构，属性信息都可以很容易的用Javascript表示出来。我们可以通过这个Javascript对象来构建一颗真正的DOM树（Virtual DOM）

Virtual Dom 实现

- 用Js对象模拟DOM树
- 比较两颗DOM树的差异（diff算法）
  - Virtual DOM只会对同一个层级元素对比
  - 深度优先遍历，记录差异
  - 差异类型：替换，**移动**/删除/新增，修改属性，修改文本
  - 其他情况都可以正常记录，当reorder的时候，可以通过节点移动来达到目的，而不是替换，替换开销很大（最小编辑距离问题，动态规划求解）
- 将差异应用到真正的DOM树上
  - 对DOM树进行深度优先遍历，找出节点差异，进行DOM操作