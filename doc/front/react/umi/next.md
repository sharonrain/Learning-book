# next.js

## why next.js

SEO（Search Engine Optimization）:利用搜索引擎的规则提高网站在有关搜索引擎内的自然排名  

目前Google和Bing是支持js的执行的，但是不支持异步，所以抓取到的可能是菊花图，但是有的浏览器都不支持js的执行
利用SSR（服务端渲染）的方式来进行前端的SAP设计比较火热（对于论坛类的网站，非常重要）  

服务器端渲染缺点：

- 更高的成本，需要考虑浏览器兼容性，交互行为通过组件管理，组件从当前视图反解数据结构花费时间久。

优点：

- SEO 友好，HTML 直接输出对搜索引擎的抓取和理解更有利
- 用户能够第一时间看到内容,首屏时间缩短，首屏渲染友好

在NextJs中，可以实现SSR快速渲染，当首次去打开浏览器请求数据时是服务端渲染，但此时点击页面时又变成前端渲染了，刷新点击后的页面就又变成服务端渲染，同构啊。

## introduce next.js

1. File-system routing

    ```/pages/about.js``` is served at ```site.com/about```.

2. automtic code splitting
    - 每个page中的import只会在改page load的时候被load

3. server side render
    - 每个pages/下面的component'自动进行server side render，通过getInitialProps fetch data,然后再client上re-mounted,对于SSR也可以使用动态加载
    - Next改变了组件的getInitialProps方法，传入了一个上下文对象，这个对象在服务端和客户端时候有不同的属性。因此可以在组件中处理上下文对象。
    - getInitialProps还会被用来获取数据

4. static export
