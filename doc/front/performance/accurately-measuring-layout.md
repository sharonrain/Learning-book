
# Accurately measuring layout on the web
## 1. Link
[Accurately measuring layout on the web](https://nolanlawson.com/2018/09/25/accurately-measuring-layout-on-the-web/)   
## 2. web rendering pipeline
1. web rendering pipeline  
   - ![Web rendering pipeline](https://raw.githubusercontent.com/sharonrain/Learning-book/master/doc/front/performance/pictures/Accurately-measuring-layout-1.JPG)
   - Execute JavaScript – 执行（但不一定是编译）JavaScript，包括任何状态操作，虚拟DOM Diff和修改DOM.
   - Calculate style – 获取CSS样式表并将其选择器规则与DOM中的元素相匹配。 称为“formating”。
   - Calculate layout – 采用我们在步骤＃2中计算出的CSS样式，并找出应在屏幕上布置框的位置。 这也称为“reflow”
   - Render – 实际将像素放在屏幕上的过程。 这通常涉及绘画，合成，GPU加速和单独的渲染线程等.

2. performance measure
   - 通常我们只测试ExecuteJavascript的部分
   - 其实Style和layout也可以测试，只是因为浏览器不同，执行位置不同，见下图，并不好测试
      ![Web style layout different based on browser](https://raw.githubusercontent.com/sharonrain/Learning-book/master/doc/front/performance/pictures/Accurately-measuring-layout-2.JPG)
   - Render的过程很复杂，通常是单独线程和GPU之间的复杂相互作用，因此主线程上运行的javascript也不可见

3. 如何测试Style 和layout  
   通过setTimeout可以保证end marker在style/layout之后
   ```
   requestAnimationFrame(() => {
     setTimeout(() => {
        performance.mark('end')
     })
   })
   ```
4. 其他注意点  
   当component调用到了一些force style/layout recalculation的API时， 比如```getBoundingClientRect(), offsetTop``` 等。 样式和布局计算转移到JavaScript执行的中间， 如下：  
    - ![style/layout shift](https://raw.githubusercontent.com/sharonrain/Learning-book/master/doc/front/performance/pictures/Accurately-measuring-layout-3.JPG)