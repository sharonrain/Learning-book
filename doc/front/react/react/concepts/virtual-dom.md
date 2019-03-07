# Virtual Dom

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

## 1. React Diff

1. 传统Diff算法O(n^3), React Diff算法O(n)
2. diff策略

   - DOM中跨层级的移动特别少，可以忽略
     - Tree diff:两棵树只会比较同一层次的节点，对树只有一次遍历
     - React官方建议不要进行DOM节点跨层级操作
   - 拥有相同类的两个组件会产生相似的树形结构
     - Component diff: 不同类型的组件不会比较
   - 对于同一层级的一组节点，可以通过Id区分
     - Element diff: 有插入，移动和删除操作
     - 通过设置唯一 key的策略，对 element diff 进行算法优化

3. 