
# Page Visibility API

## 1.如何了解用户正在离开页面

1. 以前会监听事件pagehide/beforeunload/unload,但是这三个事件在手机上都不一定会被触发（手机系统可以将一个进程切到后台，然后因为节省资源，杀死进程），而且监听upload和beforeunload两个事件，页面就不会缓存当前页面
2. 新增加的Page visibility api 可以监听到页面可见性变化，通过监听可见性，预判网页卸载，可以用来节省资源，减缓电能消耗等：
   - 暂停对服务器轮询
   - 暂停页面动画
   - 暂停正在播放的视频或者音频

## 2.document.visibilityState

1. 属性返回一个字符串，表示页面当前的可见性状态hidden/visible/prerender(只在支持预渲染的浏览器上才会出现)
2. Hidden情况，涵盖了页面可能被卸载的所有情况
   - 浏览器最小化
   - 切换成背景页面
   - 卸载（unload）界面
   - 操作系统触发锁屏
3. 该属性只针对顶层窗口，内嵌iframe由顶层窗口决定

## 3.visibilitychange事件

1. 只要document.visibilityState变化，会触发visibilitychange事件，可以通过监听该事件,跟踪页面可见性

   ```js
   document.addEventListener('visibilitychange',() => {})
   document.onvisibilitychange(() => {})
   ```