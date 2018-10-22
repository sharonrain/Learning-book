
# Web Worker
## 1.Link
[Web Worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)
## 2.Web Worker用法
JavaScript 语言采用的是单线程模型，Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。
Pros:
- 计算密集型或高延迟的任务，被 Worker 线程负担了
- 主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢

Cons:
- Worker 线程一旦新建成功，就会始终运行
- 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭.

### 2.1 注意点
1. 同源限制： Worker 线程运行的脚本文件必须与主线程的脚本文件同源。
2. DOM 限制：
   - Worker 线程所在的全局对象，与主线程不一
   - 无法读取主线程所在网页的 DOM 对象
   - 无法使用document、window、parent这些对-
   - 但是，Worker 线程可以navigator对象和location对象。

3. 通信联系：Worker 线程和主线程不能直接通信，必须通过消息完成。
4. 脚本限制：Worker 线程不能执行alert()方法和confirm()方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。
5. 文件限制： Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络。
### 2.2 基本用法
#### 2.2.1 主线程
1. 新建Worker线程
   ```
   var worker = new Worker('work.js');//work.js来自网络
   ```
2. 向Worker发消息
   ```
   //Message可以是任何类型的参数， 主线程给worker的数据
   worker.postMessage(Message);
   ```
3. 指定监听函数
   ```
   //指定监听函数，接收子线程发回来的消息
   worker.onmessage = (event) => { ... };
   ```
4. 完成后，主线程可以把他关掉
   ```
   worker.terminate();
   ```
#### 2.2.2 Worker线程
1. worker线程内部有一个监听函数，可以监听message事件
   ```
   // self代表子线程自身，即子线程的全局对象
   // 也可以使用self.onmessage代替self.addEventListener监听
   // self.postMessage()方法用来向主线程发送消息
   self.addEventListener('message', function (e) {
    self.postMessage('You said: ' + e.data);
    self.close();//用于在 Worker 内部关闭自身
   }, false);
   ```
#### 2.2.3 Worker加载脚本
1. Worker 内部如果要加载其他脚本，有一个专门的方法importScripts(),该方法可以同时加载多个脚本。
   ```
   importScripts('script1.js', 'script2.js');
   ```
#### 2.2.4 错误处理
1. 主线程可以监听 Worker 是否发生错误。
   ```
   worker.onerror((event) => {});
   worker.addEventListener('error', () => { ... })
   ```
2. Worker 内部也可以监听error事件。
#### 2.2.5 关闭worker
为了节省系统资源，必须关闭 Worker。
```
// 主线程
worker.terminate();

// Worker 线程
self.close();
```
### 2.3 数据通讯
1. 主线程与 Worker 之间的通信内容是**拷贝关系**，即是传值而不是传址，Worker 对通信内容的修改，不会影响到主线程。
2. 拷贝方式发送二进制数据，会造成性能问题，允许主线程把二进制数据直接转移给子线程，一旦转移，主线程就无法再使用这些二进制数据了. 转移写法：
   ```
   // Transferable Objects 格式
   worker.postMessage(arrayBuffer, [arrayBuffer]);

   // 例子
   var ab = new ArrayBuffer(1);
   worker.postMessage(ab, [ab]);
   ```
### 2.4 同页面的Web Worker
通常，Worker 载入的是一个单独的 JavaScript 脚本文件，但是也可以载入与主线程在同一个网页的代码。
实现方式：
1. 指定type属性是一个浏览器不认识的值
2. 将嵌入网页的脚本代码，转成一个二进制对象，为这个二进制对象生成 URL，再让 Worker 加载这个 URL。
   ```
   <!DOCTYPE html>
    <body>
       <script id="worker" type="app/worker">
         addEventListener('message', function () {
           postMessage('some message');
         }, false);
       </script>
     </body>
   </html>

   var blob = new Blob([document.querySelector('#worker').textContent]);
   var url = window.URL.createObjectURL(blob);
   var worker = new Worker(url);
   ```
## 3.实例
Worker 线程内部还能再新建 Worker 线程（目前只有 Firefox 浏览器支持）
```
\\主线程代码如下
var worker = new Worker('worker.js');
worker.onmessage = function (event) {
  document.getElementById('result').textContent = event.data;
};
\\Worker 线程代码如下
/ worker.js

// settings
var num_workers = 10;
var items_per_worker = 1000000;

// start the workers
var result = 0;
var pending_workers = num_workers;
for (var i = 0; i < num_workers; i += 1) {
  var worker = new Worker('core.js');
  worker.postMessage(i * items_per_worker);
  worker.postMessage((i + 1) * items_per_worker);
  worker.onmessage = storeResult;
}

// handle the results
function storeResult(event) {
  result += event.data;
  pending_workers -= 1;
  if (pending_workers <= 0)
    postMessage(result); // finished!
}
\\计算任务脚本的代码如下
// core.js
var start;
onmessage = getStart;
function getStart(event) {
  start = event.data;
  onmessage = getEnd;
}

var end;
function getEnd(event) {
  end = event.data;
  onmessage = null;
  work();
}

function work() {
  var result = 0;
  for (var i = start; i < end; i += 1) {
    // perform some complex calculation here
    result += 1;
  }
  postMessage(result);
  close();
}
```
## 4.API
### 4.1主线程
浏览器原生提供Worker()构造函数：
- 第一个参数是脚本的网址（必须遵守同源政策），该参数是必需的，且只能加载 JS 脚本
- 第二个参数是配置对象，该对象可选。它的一个作用就是指定 Worker 的名称
```
// 主线程
var myWorker = new Worker('worker.js', { name : 'myWorker' });
```
构造函数返回一个 Worker 线程对象, Worker 线程对象的属性和方法如下:
- Worker.onerror：指定 error 事件的监听函数。
- Worker.onmessage：指定 message 事件的监听函数，发送过来的数据在Event.data属性中。
- Worker.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
- Worker.postMessage()：向 Worker 线程发送消息。
- Worker.terminate()：立即终止 Worker 线程。
### 4.2Worker线程
Worker 线程有一些自己的全局属性和方法。
- self.name： Worker 的名字。该属性只读，由构造函数指定。
- self.onmessage：指定message事件的监听函数。
- self.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
- self.close()：关闭 Worker 线程。
- self.postMessage()：向产生这个 Worker 线程发送消息。
- self.importScripts()：加载 JS 脚本。