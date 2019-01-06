# Inverview

## Coding

[一个01字符串，求出现0、1出现次数相等的最长子串](https://blog.csdn.net/c_circle/article/details/78589130)
[找出旋转数组中的最小值](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/)
[堆排序](https://zh.wikipedia.org/wiki/%E5%A0%86%E6%8E%92%E5%BA%8F)
[DFS](https://leetcode.com/problems/permutations/discuss/18239/A-general-approach-to-backtracking-questions-in-Java-(Subsets-Permutations-Combination-Sum-Palindrome-Partioning))

## React 面试题目及答案

1. React的生命周期及自己的理解
   组件的声明周期有三种阶段，一种是初始化阶段（Mounting），一种是更新阶段（Updating）最后一种是析构阶段（Unmounting）。而这两个阶段的声明周期函数都是相似且有一一对应的关系的。  
   **组件的初始化阶段的声明周期函数以及重点用法如下：**
   - constructor(): 用于绑定事件以及初始化state（可以通过”fork”props的方式给state赋值）
   - componentWillMount(): 只会在服务端渲染时被调用，你可以在这里同步操作state
   - render(): 这个函数是用来渲染DOM没有错。但它只能用来渲染DOM，请保证它的纯粹性。如果有操作DOM或者和浏览器打交道的一系列操作，请在下一步骤componentDidMount中进行
   - componentDidMount(): 如果你有第三方操作DOM的类库需要初始化（类似于jQuery，Bootstrap的一些组件）操作DOM、或者请求异步数据，都应该放在这个步骤中做  
   **组件更新阶段：**
   - componentWillReceiveProps(nextProps): 在这里你可以拿到即将改变的状态，可以在这一步中通过setState方法设置state
   - shouldComponentUpdate(nextProps, nextState): 这一步骤非常重要，它的返回值决定了接下来的生命周期函数是否会被调用，默认返回true，即都会被调用；你也可以重写这个函数使它返回false。
   - componentWillUpdate(): 我也不知道这个声明周期函数的意义在哪里，在这个函数内你不能调用setState改变组件状态
   - render()
   - componentDidUpdate(): 和componentDidMount类似，在这里执行DOM操作以及发起网络请求  
   **组件析构阶段：**
   - componentWillUnmount(): 主要用于执行一些清理工作，比如取消网络请求，清楚多余的DOM元素等  

   setState只在componentWillMount\componentDidMount\componentWillReceiveProps
2. 介绍react优化
   - shouldComponentUpdate： 当这个函数返回false的时候，DOM tree直接不需要重新渲染，从而节省大量的计算资源。
      - 工具：使用React Pref，或者why-did-you-update都可以找到无需被重新渲染的组件，这个组件就是需要使用shouldComponetUpdate优化的组件
   - 可以直接使用React-Redux的connect帮助我们，会对props的优化比较
3. React Diff  
   传统Diff算法O(n^3), React Diff算法O(n)  
   diff策略
   - DOM中跨层级的移动特别少，可以忽略
     - Tree diff:两棵树只会比较同一层次的节点，对树只有一次遍历
     - React官方建议不要进行DOM节点跨层级操作
   - 拥有相同类的两个组件会产生相似的树形结构
     - Component diff: 不同类型的组件不会比较
   - 对于同一层级的一组节点，可以通过Id区分
     - Element diff: 有插入，移动和删除操作
     - 通过设置唯一 key的策略，对 element diff 进行算法优化
4. React vs Vue

## Webpack 面试题目及答案

1. webpack-dev-server和http服务器如nginx有什么区别?  

   webpack-dev-server使用内存来存储webpack开发环境下的打包文件，并且可以使用模块热更新，他比传统的http服务对开发更加简单高效。模块热更新可以使得代码修改过后不用刷新浏览器就可以更新，是高级版的自动刷新浏览器。(nginx热部署，替换worker进程)

2. 什么是长缓存？在webpack中如何做到长缓存优化？  

   浏览器在用户访问页面的时候，为了加快加载速度，会对用户访问的静态资源进行存储，但是每一次代码升级或是更新，都需要浏览器去下载新的代码，最方便和简单的更新方式就是引入新的文件名称。在webpack中可以在output纵输出的文件指定chunkhash,并且分离经常更新的代码和框架代码。通过NameModulesPlugin或是HashedModuleIdsPlugin使再次打包文件名不变。  

3. gulp/grunt和webpack的区别

   gulp / grunt 是一种构建工具，能够优化前端的工程流，比如自动刷新页面，combo, 压缩css, js, 编译less等等。就是使用gulp和grunt, 然后配置你需要的插件，就可以把以前需要手工做的事情让它帮你做了。  
   browserify / webpack，还有seajs / requirejs 这四个都是JS模块化的方案。其中seajs/ requirejs是一种类型， browserify / webpack 是另一种类型。
   - seajs/ require: 是一种在线“编译”模块的方案，相当于在页面上加载一个CMD/AMD 解释器。这样浏览器就认识了 define、exports、module这些东西。也就实现了模块化。
   - broserify / webpack: 是一个预编译模块的方案，更加智能。以webpack为例：首先它是预编译的，不需要再浏览器中加载解释器。另外，你在本地直接写JS, 不管是AMD / CMD / ES6 风格的模块化， 它都能认识。并且编译成浏览器认识的JS。

## 智力题目

1. 五个大小相同硬币，两两接触如何摆
   - 底下一个1，2,3放到1上面，4，5竖起来放到1上面


## docker

1. 如何控制容器占用系统资源（CPU，内存）的份额？  
   在使用docker create命令创建容器或使用docker run 创建并运行容器的时候，可以使用-c|–cpu-shares[=0]参数来调整同期使用CPU的权重，使用-m|–memory参数来调整容器使用内存的大小。
2. 可以在一个容器中同时运行多个应用进程吗？  
   一般不推荐在同一个容器内运行多个应用进程，如果有类似需求，可以通过额外的进程管理机制，比如supervisord来管理所运行的进程