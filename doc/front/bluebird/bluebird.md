
# Bluebird 
## 1.Link
[bluebird api 英文文档](http://bluebirdjs.com/docs/api-reference.html)  
[bluebird api 中文文档](https://itbilu.com/nodejs/npm/VJHw6ScNb.html#api-new-promise)

## 2.API 详解
### 2.1 核心Core
#### 2.1.1 new Promise
该方法是一个构造函数，用于创建一个新的Promise实例，传入的函数参数中有两个参数：resolve和reject，这两个参数被封装到所创建的Promise实例中，分别用于执行成功和执行失败时的调用。  
```new Promise(function(function resolve, function reject) resolver) -> Promise```
#### 2.1.2 .then - 实例的then()方法
[Promise A+ 规范中的.then()方法](https://itbilu.com/javascript/js/VJiycgJq.html#promise)  
在promise.then方法中，onFulfilled、onRejected 两个都是可选参数  
只对正常结果处理：  
```promise.then(onFulfilled)```  
只对异常结果处理：  
```promise.then(undefined, onRejected)```    
```promise.catch(onRejected)```  

#### 2.1.3 .spread - 展开实例返回的结果数组
类似调用.then方法，但执行成功后的值(fulfillment值)必须是一个数组  
```.spread(
  [function(any values...) fulfilledHandler]
) -> Promise```  
.spread()方法会隐式的调用.all()方法，而在ES6中要显式的调用

#### 2.1.4 .catch - 实例异常处理方法
捕获部分异常  

	.catch(
	  class ErrorClass|function(any error)|Object predicate...,
	  function(any error) handler
	) -> Promise
捕获所有异常  
```.catch(function(any error) handler) -> Promise```

example:  

	somePromise.then(function() {
	  return a.b.c.d();
	}).catch(NetworkError, TimeoutError, function(e) {
	  //Will end up here on expected everyday network errors
	}).catch(function(e) {
	  //Catch any unexpected errors
	});
#### 2.1.5 .error - 实例操作异常处理
类似.catch，但它只捕获和处理**操作错误**。    

	// catch 捕获
	.catch(isOperationalError, function(e) {
	    // ...
	})
	
	// 等价于:
	.error(function(e) {
	    // ...
	});
#### 2.1.6 .finally - 实例最终调用方法

	.finally(function() handler) -> Promise
	.lastly(function() handler) -> Promise
#### 2.1.7 Promise.join - 关联多个不相关的实例
all很适合处理统一处理动态大小的列表，而.join使处理多个离散的Promise实例处理更加容易。  
方法的最后一个参数是一个回调函数，其中包含所有的处理成功的结果
 
	Promise.join(
	  Promise<any>|any values...,
	  function handler
	) -> Promise
Join将离散的promsie作为argument传入， All传入的是数组
#### 2.1.8 Promise.try - 包装为Promise实例
通过Promise.try启动一个promise链，并将所有同步异常封装到promise的reject处理中：  

	Promise.try(function() fn) -> Promise
	function getUserById(id) {
	  return Promise.try(function() {
	    if (typeof id !== "number") {
	      throw new Error("id must be a number");
	    }
	    return db.getUserById(id);
	  });
	}
经过Promise.try封装后，其同步和异步异常都可以通过.catch来捕获。
#### 2.1.9 Promise.method - 将函数包装为返回Promise实例的函数
包装指定的函数fn，包装后函数会返回一个Promise实例。   

	romise.method(function(...arguments) fn) -> function
#### 2.1.10 Promise.resolve - 包装值为Promiseresolved实例
过指定值创建Promiseresolved实例。如果值已使用Promise，那会返回它。如果值不是thenable对象，会将其包装成一个会执行成功的Promise实例，该值将会做为fulfillment值返回。

	Promise.resolve(Promise<any>|any value) -> Promise
#### 2.1.11 Promise.reject - 包装值为Promisereject实例
将指定的值包装为一个rejected状态的Promise实例   

	Promise.reject(any error) -> Promise
#### 2.1.12 Promise.bind - 包装值为Promisereject实例
类似于调用[Promise.bind(thisArg, [thisPromise])](http://bluebirdjs.com/docs/api/promise.bind.html)  
	.bind(any|Promise<any> thisArg) -> BoundPromise
当thisArg缺省时，默认bind this, 当thisArg是一个promise时候，返回fullfillment的值

### 2.2 同步检查（Synchronous inspection）
#### 2.2.1 PromiseInspection接口

	interface PromiseInspection {
	  any reason()
	  any value()
	  boolean isPending()
	  boolean isRejected()
	  boolean isFulfilled()
	  boolean isCancelled()
	}

PromiseInspection结果通过.reflect()方法提供。

	reflect() -> Promise<PromiseInspection>
#### 2.2.2 isFulfilled - 检查是否执行成功
检查promise是否执行成功

	.isFulfilled() -> boolean
#### 2.2.3 isRejected - 检查是否执行失败
检查promise是否执行失败

	.isRejected() -> boolean
#### 2.2.4 isPending - 检查是否处理中
检查promise是否处理中（非fulfilled、rejected或cancelled）

	.isPending() -> boolean
#### 2.2.5 isCancelled - 检查是否已取消
isCancelled - 检查是否已取消

	.isCancelled() -> boolean
#### 2.2.6 value - 执行结果
返回promise的执行结果，需要通过.isFulfilled()来判断已执行成功

	.value() -> any
#### 2.2.7 reason - 执行失败原因
返回promise的执行失败的原因，需要通过.isRejected()来判断已执行失败

	.reason() -> any
### 2.3 集合操作 （Collections）
#### 2.3.1 Promise.all - 执行多个Promise实例
等待多个Promise实例执行完成，promise数组中所有的promise实例都变为resolve的时候，该方法才会返回，并将所有结果传递到结果数组中。promise数组中任何一个promise为reject的话，则整个Promise.all调用会立即终止，并返回一个状态为reject的新的promise对象。

	Promise.all(Iterable<any>|Promise<Iterable<any>> input) -> Promise
#### 2.3.2 Promise.props - 对象属性包装成Promise实例
Promise.props功能与Promise.all功能类型，不同的是访方法用于对象属性或Map实体而不是可迭代值。  
对象属性或Map实体全部执行通过后返回一个promise，这个promise对象的fulfillment值是一个**拥有原对象或Map键值**的对象或Map

	Promise.props(Object|Map|Promise<Object|Map> input) -> Promise
#### 2.3.3 Promise.any - 执行成1个即返回
类似Promise.some，但成功数为1, 实现值不是数组而1个直接值。

	Promise.any(Iterable<any>|Promise<Iterable<any>> input) -> Promise
#### 2.3.4 Promise.some - 成功指定次数后返回
指定的```Iterable```数组或```Iterablepromise```，执行成功指定次数```count```后即返回，实现值是一个数组

	Promise.some(
	  Iterable<any>|Promise<Iterable<any>> input,
	  int count
	 ) -> Promise
注意，此处some和any都是并行操作，因此是最快返回的两个成功次数，而并非按照顺序。

#### 2.3.5 Promise.map - Map操作
为指定的Iterable数组或Iterablepromise，执行一个处理函数mapper并返回执行后的数组或Iterablepromise。  
Promises会等待mapper全部执行完成后返回，如果数组中的promise执行全部分成功则Promises中的执行成功值。如果任何一个promise执行失败，Promises对应的也是拒绝值。

	Promise.map(
	  Iterable<any>|Promise<Iterable>,
	  function(any item, int index, int length) mapper,
	  [Object {concurrency: int=Infinity} options]
	 ) -> Promise
#### 2.3.6 Promise.reduce - Reduce操作
reducer函数会最终返回一个promise。数组中的所有promise处理成功后，会返回一个成功状态的promise，任何一个执行失败都会返回一个拒绝状态的promise。

	Promise.reduce(["file1.txt", "file2.txt", "file3.txt"], function(total, fileName) {
	  return fs.readFileAsync(fileName, "utf8").then(function(contents) {
	    return total + parseInt(contents, 10);
	  });
	}, 0).then(function(total) {
	  //Total is 30
	});
#### 2.3.7 Promise.filter - filter过滤
为指定的Iterable数组或Iterablepromise，执行一个过滤函数filterer，并返回经过筛选后promises数组。

example:

	var Promise = require("bluebird");
	var E = require("core-error-predicates");
	var fs = Promise.promisifyAll(require("fs"));
	
	fs.readdirAsync(process.cwd()).filter(function(fileName) {
	  return fs.statAsync(fileName)
	    .then(function(stat) {
	      return stat.isDirectory();
	    })
	    .catch(E.FileAccessError, function() {
	      return false;
	    });
	}).each(function(directoryName) {
	  console.log(directoryName, " is an accessible directory");
	});

#### 2.3.8 Promise.each - 依次执行
iterator函数会最终返回一个promise。数组中的所有promise处理成功后，会返回一个成功状态的promise，任何一个执行失败都会返回一个拒绝状态的promise。

	Promise.each(
	  Iterable<any>|Promise<Iterable>,
	  function(any item, int index, int length) iterator
	) -> Promise
#### 2.3.9 Promise.mapSeries - 顺序执行的Map操作
同Promise.map，但会按数组顺序依次执行mapper

#### 2.3.10 Promise.race - 非Promise对象包成Promise对象
将数组中的非Promise对象，包装成Promise对象。

	Promise.race(Iterable<any>|Promise<Iterable>) -> Promise

#### 2.3.ll .all方法 - 实例all方法
相当于```Promise.all(this)```

	.all() -> Promise
#### 2.3.12 .props - 实例props方法
相当于```Promise.props(this)```

	.props() -> Promise
#### 2.3.13 .any - 实例any方法
相当于```Promise.any(this)```

	.any() -> Promise
#### 2.3.14 .some - 实例some方法
相当于```Promise.some(this)```

	.some() -> Promise
#### 2.3.15 .map - 实例map方法
相当于```Promise.map(this, mapper, options)``` 

	.map(
	  function(any item, int index, int length) mapper,
	  [Object {concurrency: int=Infinity} options]
	) -> Promise
#### 2.3.16 .filter - 实例filter方法
相当于```Promise.filter(this, filterer, options)```

	.filter(
	  function(any item, int index, int length) filterer,
	  [Object {concurrency: int=Infinity} options]
	) -> Promise
#### 2.3.17 .each - 实例each方法
相当于```Promise.each(this, iterator)```

	.each(function(any item, int index, int length) iterator) -> Promise
#### 2.3.18 .mapSeries - 实例mapSeries方法
相当于```Promise.mapSeries(this, iterator)```

	.mapSeries(function(any item, int index, int length) mapper) -> Promise

#### 2.3.19 .reduce - 实例reduce方法
相当于```Promise.reduce(this, iterator, initial)```

### 2.4 资源管理（Resource management）
#### 2.4.1 .disposer - 添加资源释放器
用于资源释放器方法的扩展方法，这个方法将在调用Promise.using时清除资源。

	.disposer(function(any resource, Promise usingOutcomePromise) disposer) -> Disposer
#### 2.4.2 promise.using - 使用资源
结合.disposer，确保无论任何情况，指定的资源释放器都会在promise回调时调用。using的第二个参数是一个handler

	// 会返回一个promise但是一个Disposer
	function getConnection() {
	  return db.connect().disposer(function(connection, promise) {
	    connection.close();
	  });
	}
	function useConnection(query) {
	  return Promise.using(getConnection(), function(connection) {
	    return connection.sendQuery(query).then(function(results) {
	      return process(results);
	    })
	  });
	}

### 2.5 Promise包装器（Promisification）
官方文档叫做Promisification，意思是将一个没有Promise的API对象包装成有Promise的API对象，即将其Promise化，或者可以理解成Promise包装器。
#### 2.5.1 Promise.promisify - 单个函数对象的Promise化
可以包装node.js对象，也可以包装Node.js fs模块中的readFile方法包装成一个Promise对象

	var readFile = Promise.promisify(require("fs").readFile);

	readFile("myfile.js", "utf8").then(function(contents) {
	  return eval(contents);
	}).then(function(result) {
	  console.log("The result of evaluating myfile.js", result);
	}).catch(SyntaxError, function(e) {
	  console.log("File had syntax error", e);
	//捕获错误
	}).catch(function(e) {
	  console.log("Error reading file", e);
	});
#### 2.5.2 Promise.promisifyAll - 对象属性的Promise化
将传入的对象实体的属性包装成Promise对象。如，我们可以fs模块中的所有方法都Promise化：

	var fs = Promise.promisifyAll(require("fs"));
	
	fs.readFileAsync("myfile.js", "utf8").then(function(contents) {
	    console.log(contents);
	}).catch(function(e) {
	    console.error(e.stack);
	});

#### 2.5.3 Promise.fromCallback - 包装为成功状态的

	Promise.fromCallback(
	  function(function callback) resolver,
	  [Object {multiArgs: boolean=false} options]
	) -> Promise
#### 2.5.4 Promise.asCallback - Promise对象的callback化

	.asCallback(
	  [function(any error, any value) callback],
	  [Object {spread: boolean=false} options]
	) -> this

### 2.6 定时器（Timers）
#### 2.6.1 Promise.delay - 延时执行
将指定的Promise对象value延时ms毫秒后执行

	Promise.delay(
	  int ms,
	  [any|Promise<any> value=undefined]
	) -> Promise
	Promise.delay(500).then()
#### 2.6.2 .delay - 实例延时执行
相当于```Promise.delay(ms, this)```。

#### 2.6.3 .timeout - 实例超时
返回一个在指定时间ms后变为失败状态的promise。

	.timeout(
	  int ms,
	  [String message="operation timed out"]
	) -> Promise
example:

	fs.readFileAsync("huge-file.txt").timeout(100).then(function(fileContents) {
	  // 执行成功的一些操作
	}).catch(Promise.TimeoutError, function(e) {
	  console.log("could not read file within 100ms");
	});

### 2.7 工具方法(Utility)
#### 2.7.1 .tap - 非失败状态调用

	.tap(function(any value) handler) -> Promise
类似	```.finally```，但只有在非失败状态被调用

	getUser().tap(function(user) {
	  //Like in finally, if you return a promise from the handler
	  //the promise is awaited for before passing the original value through
	  return recordStatsAsync();
	}).then(function(user) {
	  //user is the user from getUser(), not recordStatsAsync()
	});
#### 2.7.2 .call - call方法
	.call(
	  String methodName,
	  [any args...]
	)
一个便捷的call方法。

	promise.then(function(obj) {
	  return obj[methodName].call(obj, arg...);
	});
#### 2.7.3 .get - 获取属性值
便捷的属性访问器方法

	promise.then(function(obj) {
	  return obj[propertyName];
	});
#### 2.7.4 .return - 返回一个值
便捷的属性访问器方法

	.return(any value) -> Promise 
等同于

	.then(function() {
	 return value;
	});

#### 2.7.5 .throw - 抛出异常

	.throw(any reason) -> Promise
等同于

	.then(function() {
	 throw reason;
	});	
#### 2.7.6 .catchReturn - 捕获异常并返回一个值
	.catchReturn(
	  [class ErrorClass|function(any error) predicate],
	  any value
	) -> Promise
等同于

	.catch(function() {
	 return value;
	});
#### 2.7.7 .catchThrow - 捕获并抛出异常
	.catchThrow(
	  [class ErrorClass|function(any error) predicate],
	  any reason
	) -> Promise
等同于

	.catch(function() {
	 return value;
	});
#### 2.7.8 .reflect - 返回总是成功状态的promise
	.reflect() -> Promise<PromiseInspection>
#### 2.7.9 Promise.noConflict - 解决浏览器环境的命名冲突
	Promise.noConflict() -> Object
	// 从另一个promise库中返回 Bluebird命名空间:
	var promise = Bluebird.resolve(new Promise());
#### 2.7.10 Promise.setScheduler - 调度设置
	Promise.setScheduler(function(function fn) scheduler) -> function
设置一个在异步调度中使用的函数。

	Promise.setScheduler(function(fn) {
	  setTimeout(fn, 0);
	});

