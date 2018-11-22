
# Page LifeCycle API

Page Visibility API 只在网页对用户不可见时触发，对于网页被系统释放资源丢弃掉的问题无法解决。  
W3C新制定，统一了网页从诞生到卸载的行为模式，定义了新的事件。允许开发则相应网页各种转换。
Chrome 68 支持这个 API，对于老式浏览器可以使用谷歌开发的兼容库 [PageLifecycle.js](https://github.com/GoogleChromeLabs/page-lifecycle)。

## 1.生命周期阶段

![生命周期六个阶段](https://raw.githubusercontent.com/sharonrain/Learning-book/master/doc/front/assets/page-lifecycle-api-1.png)

1. activ:网页可见
2. Passive：网页可见，但没有输入焦点，无法输入。
3. Hidden：网页不可见，但尚未冻结
4. Terminated：网页卸载，总是在Hidden后。
5. Frozen：Hidden和Passive过久都有可能Frozen，网页不会再被分配CPU计算资源。定时器、回调函数、网络请求、DOM 操作都不会执行，不过正在运行的任务会执行完。
6. Discarded：长时间处于Frozen，又不被用户唤醒，则进入Discarded。浏览器自动卸载网页。（自动 Discarded 以后，Tab 窗口还是在的。如果用户重新访问这个 Tab 页，浏览器将会重新向服务器发出请求）

## 2.事件

网页的生命周期事件是在所有帧（frame）触发，不管是底层的帧，还是内嵌的帧。也就是说，内嵌\<iframe\>网页跟顶层网页一样，都会同时监听到下面的事件。  

1. focus事件：Passive=>Active触发
2. blur事件：Active=>Passive触发
3. visibilitychange事件：触发情况如下
    - Active=>Hidden触发
    - Hidden=>Active触发
    - Hidden=>Terminated触发，用户关闭界面时
    - 以通过```document.onvisibilitychange```属性指定这个事件的回调函数。
4. freeze事件：（**新增**）
    - 事件在网页进入 Frozen 阶段时触发
    - 通过```document.onfreeze```属性指定在进入 Frozen 阶段时调用的回调函数
5. resume事件：（**新增**）
    - resume事件在网页离开 Frozen 阶段,变为 Active / Passive / Hidden 阶段时触发
    - 通过```document.onresume```属性指定在离开 Frozen 阶段，进入可用时调用的回调函数
6. pageshow 事件
    - pageshow事件在用户加载网页时触发
    - 如果是从缓存中获取，则该事件对象的event.persisted属性为true，否则为false
7. pagehide 事件
    - pagehide事件在用户离开当前网页、进入另一个网页时触发。
    - 如果浏览器能够将当前页面添加到缓存以供稍后重用，则事件对象的event.persisted属性为true。 如果为true
8. beforeunload 事件
    - beforeunload事件在窗口或文档即将卸载时触发。
    - 该事件发生时，文档仍然可见，此时卸载仍可取消。
9. unload事件
    - unload事件在页面正在卸载时触发。经过这个事件，网页进入 Terminated 状态。

## 3.获取当前阶段

```js
const getState = () => {
  if (document.visibilityState === 'hidden') {
    return 'hidden';
  }
  if (document.hasFocus()) {
    return 'active';
  }
  return 'passive';
};
```

选项卡处于 Frozen 阶段，就随时有可能被系统丢弃，进入 Discarded 阶段。如果后来用户再次点击该选项卡，浏览器会重新加载该页面。此时，可以通过```document.wasDiscarded```了解页面是否被丢弃了。  

```js
if (document.wasDiscarded) {
  // 该网页已经不是原来的状态了，曾经被浏览器丢弃过
  // window对象上会新增window.clientId和window.discardedClientId两个属性
  // 来恢复丢弃前的状态。
  getPersistedState(self.discardedClientId);
}
```