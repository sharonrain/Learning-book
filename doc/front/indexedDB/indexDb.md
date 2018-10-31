
# 浏览器数据库 IndexedDB 入门

## 1.Link

[浏览器数据库 IndexedDB 入门教程](http://www.ruanyifeng.com/blog/2018/07/indexeddb.html)

## 2.What's IndexDB

### 2.1 现有的浏览器数据储存方案

1. Cookie 的大小不超过4KB，且每次请求都会发送回服务器.
2. LocalStorage 在 2.5MB 到 10MB 之间（各家浏览器不同），而且不提供搜索功能，不能建立自定义的索引。

### 2.2 IndexedDB简介

1. 浏览器提供的本地数据库
2. 可以被网页脚本创建和操作。
3. 允许储存大量数.
4. 提供查找接口，还能建立索引。
5. 不属于关系型数据库（不支持 SQL 查询语句），更接近 NoSQL 数据库。

### 2.3 IndexedDB特点

1. 键值对储存。
   - 数据以"键值对"的形式保存，每一个数据记录都有对应的主键，主键是独一无二的，不能有重复
   - 所有类型的数据都可以直接存入，包括 JavaScript 对象。
2. 异步。
   - IndexedDB 操作时不会锁死浏览器，用户依然可以进行其他操作。（LocalStorage是同步的）
   - 异步设计是为了防止大量数据的读写，拖慢网页的表现。
3. 支持事务。
   - IndexedDB 支持事务（transaction）：一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况。

4. 同源限制。
   - IndexedDB 受到同源限制，每一个数据库对应创建它的域名。网页只能访问自身域名下的数据库，而不能访问跨域的数据库。
5. 储存空间大。
   - IndexedDB 的储存空间一般不少于 250MB，甚至没有上限。
6. 支持二进制储存。
   - IndexedDB 不仅可以储存字符串，还可以储存二进制数据（ArrayBuffer 对象和 Blob 对象）。

### 2.3 IndexedDB基本概念

1. 数据库
   - 一系列相关数据的容器。每个域名（严格的说，是协议 + 域名 + 端口）都可以新建任意多个数据库。
   - IndexedDB 数据库有版本的概念。同一个时刻，只能有一个版本的数据库存在。
   - 修改数据库结构（新增或删除表、索引或者主键），只能通过升级数据库版本完成。

2. 对象仓库
   - 每个数据库包含若干个对象仓库（object store）。它类似于关系型数据库的表格。
3. 数据记录
   - 对象仓库保存的是数据记录。每条记录类似于关系型数据库的行，但是只有主键和数据体两部分。
   - 主键用来建立默认的索引，必须是不同的
   - 主键可以是数据记录里面的一个属性，也可以指定为一个递增的整数编号。
   - 数据体可以是任意数据类型，不限于对象。
4. 索引
   - 为了加速数据的检索，可以在对象仓库里面，为不同的属性建立索引。
5. 事务
   - 数据记录的读写和删改，都要通过事务完成。
   - 事务对象提供error、abort和complete三个事件，用来监听操作结果。

   > 数据库：IDBDatabase 对象  
对象仓库：IDBObjectStore 对象  
索引： IDBIndex 对象  
事务： IDBTransaction 对象  
操作请求：IDBRequest 对象  
指针： IDBCursor 对象  
主键集合：IDBKeyRange 对象  

## 3.操作流程

[详细API](https://wangdoc.com/javascript/bom/indexeddb.html#indexeddb-%E5%AF%B9%E8%B1%A1)

### 3.1 打开数据库

indexedDB.open(): 第一个参数是字符串，表示数据库的名字。如果指定的数据库不存在，就会新建数据库, 第二个参数是整数，表示数据库的版本。如果省略, 默认当前版本。

```js
var request = window.indexedDB.open(databaseName, version);
```

返回 IDBRequest 对象可通过三种事件error、success、upgradeneeded，处理打开数据库的操作结果。
如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件upgradeneeded

```js
var db;
// 这时通过事件对象的target.result属性，拿到数据库实例。
request.onupgradeneeded = function (event) {
  db = event.target.result;
}
```

### 3.2新建数据库

新建数据库与打开数据库是同一个操作, 不过upgradeneeded一定会被触发，很多操作也写在时间处理函数中。
新建数据库以后，第一件事是新建对象仓库（即新建表）。
之后可以新建索引

```js
request.onupgradeneeded = function (event) {
  db = event.target.result;
  var objectStore;
  if (!db.objectStoreNames.contains('person')) {
    objectStore = db.createObjectStore('person', { keyPath: 'id' });
    //也可以自动生成主键
    // objectStore = db.createObjectStore('person', { autoIncrement: true });
    objectStore.createIndex('name', 'name', { unique: false });
    objectStore.createIndex('email', 'email', { unique: true });
  }
}
```

### 3.3新增数据

新增数据指的是向对象仓库写入数据记录

```js
function add() {
  var request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .add({ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' });

  request.onsuccess = function (event) {
    console.log('数据写入成功');
  };

  request.onerror = function (event) {
    console.log('数据写入失败');
  }
}

add();
```

### 3.4读取数据

```js
function read() {
   var transaction = db.transaction(['person']);
   var objectStore = transaction.objectStore('person');
   var request = objectStore.get(1);

   request.onerror = function(event) {
     console.log('事务失败');
   };

   request.onsuccess = function( event) {
      if (request.result) {
        console.log('Name: ' + request.result.name);
        console.log('Age: ' + request.result.age);
        console.log('Email: ' + request.result.email);
      } else {
        console.log('未获得数据记录');
      }
   };
}

read();
```

### 3.5遍历数据

遍历数据表格的所有记录，要使用指针对象 IDBCursor。

```js
function readAll() {
  var objectStore = db.transaction('person').objectStore('person');

   objectStore.openCursor().onsuccess = function (event) {
     var cursor = event.target.result;

     if (cursor) {
       console.log('Id: ' + cursor.key);
       console.log('Name: ' + cursor.value.name);
       console.log('Age: ' + cursor.value.age);
       console.log('Email: ' + cursor.value.email);
       cursor.continue();
    } else {
      console.log('没有更多数据了！');
    }
  };
}

readAll();
```

### 3.6更新数据

使用IDBObject.put()方法。

```js
function update() {
  var request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .put({ id: 1, name: '李四', age: 35, email: 'lisi@example.com' });

  request.onsuccess = function (event) {
    console.log('数据更新成功');
  };

  request.onerror = function (event) {
    console.log('数据更新失败');
  }
}

update();
```

### 3.7删除数据

IDBObjectStore.delete()方法用于删除记录。

```js
function remove() {
  var request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .delete(1);

  request.onsuccess = function (event) {
    console.log('数据删除成功');
  };
}

remove();
```

### 3.8使用索引

如果不建立索引，默认只能搜索主键

```js
// 假定新建表格的时候，对name字段建立了索引。
var transaction = db.transaction(['person'], 'readonly');
var store = transaction.objectStore('person');
var index = store.index('name');
var request = index.get('李四');

request.onsuccess = function (e) {
  var result = e.target.result;
  if (result) {
    // ...
  } else {
    // ...
  }
}
```