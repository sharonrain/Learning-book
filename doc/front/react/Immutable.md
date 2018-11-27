# Immutable

## 1. 什么是Immutable

JavaScript 中的对象一般是可变的（Mutable），因为使用了引用赋值，新的对象简单的引用了原始对象，改变新的对象将影响到原始对象。

Immutable Data 就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。

## 2. Immutable 实现的原理

**Persistent Data Structure**持久化数据结构，要保证旧数据同时可用且不变。
Immutable 使用了 **Structural Sharing**（结构共享），即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。

## 3. Immutable 库

1. immutable.js
   - 压缩后下载有 16K
   - 实现了一套完整的 Persistent Data Structure。
   - 有很多易用的数据类型。像 `Collection`、`List`、`Map`、`Set`、`Record`、`Seq`。
   - 有非常全面的`map`、`filter`、`groupBy`、`reduce``find`函数式操作方法。
   - 同时 API 也尽量与 Object 或 Array 类似。
2. seamless-immutable
   - 代码库非常小，压缩后下载只有 2K
   - 使用 `Object.defineProperty`扩展了 JavaScript 的 Array 和 Object 对象来实现，只支持 Array 和 Object 两种数据类型

## 4. Immutable 优点

1. Immutable 降低了 Mutable 带来的复杂度
2. 节省内存
   - Immutable.js 使用了 Structure Sharing 会尽量复用内存。没有被引用的对象会被垃圾回收。
3. Undo/Redo，Copy/Paste，甚至时间旅行这些功能做起来小菜一碟
   - 每次数据都是不一样的，只要把这些数据放到一个数组里储存起来，想回退到哪里就拿出对应数据即可
4. 并发安全
   - 目前无用， 因为 JavaScript 还是单线程运行的啊
5. 拥抱函数式编程
   - 纯函数式编程比面向对象更适用于前端开发。因为只要输入一致，输出必然一致，这样开发的组件更易于调试和组装。

## 5. 更多认识

1. 与 Object.freeze、const 区别
   - `Object.freeze` 和 ES6 中新加入的 `const` 都可以达到防止对象被篡改的功能，但它们是 shallowCopy 的。对象层级一深就要特殊处理了。
2. Cursor 的概念
   - Cursor 提供了可以直接访问这个深层数据的引用。

   ```js
   let data = Immutable.fromJS({ a: { b: { c: 1 } } });
   let cursor = Cursor.from(data, ['a', 'b'], newData => {
     // 当 cursor 或其子 cursor 执行 update 时调用
     console.log(newData);
   });

   cursor.get('c'); // 1
   cursor = cursor.update('c', x => x + 1);
   cursor.get('c'); // 2
   ```

3. React 建议把 `this.state` 当作 Immutable 的，因此修改前需要做一个 deepCopy,使用Immutable可以避免deepCopy的麻烦