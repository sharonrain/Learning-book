
# Web architecture
## 1. Link
[Web architecture](https://engineering.videoblocks.com/web-architecture-101-a3224e126947)   
## 2. web architecture
![Web architecture](https://raw.githubusercontent.com/sharonrain/Learning-book/master/doc/front/performance/pictures/Web-architecture-1.JPG)

1. DNS
    - key/value(domain name/ip)

2. Load Balancer
   - 水平扩展通常指扩展机器，横向扩展通常指扩展机器中的RAM，CPU等
   - 通常我们都希望能进行水平扩展，简单，稳定不易崩溃，横向扩展始终有限制
   - 负载均衡器使得水平扩展成为可能，它将请求路由传到其中一个应用服务器（这些服务器通常为彼此的镜像），然后将相应从应用程序服务器发送回到客户端，通过在服务器集中分发请求而使得请求不会过载。

3. Web Application Servers  
   - 执行处理用户请求的核心业务逻辑，并将HTML发送回用户的浏览器。
   - 通常与各种后端基础设施进行通信，例如数据库，缓存层，作业队列，搜索服务，其他微服务，数据/日志记录队列等。
   - 应用服务器实现需要选择特定语言（Node.js，Ruby，PHP，Scala，Java，C＃.NET等）和该语言的Web MVC框架（Express for Node.js，Ruby on Rails ，Play for Scala，Laravel for PHP等）

4. Database Servers  
   - 数据库提供了定义数据结构，插入新数据，查找现有数据，更新或删除现有数据，跨数据执行计算等的方法。
   - 分为SQL和NoSQL。SQL代表“结构化查询语言”，NoSQL代表“非SQL”，它是一种新的数据库技术集，它可以处理大规模Web应用程序可以生成的大量数据。
   - SQL的大多数变体都不能很好地水平扩展，只能垂直缩放到具体某一项


5. Caching Service  
   - 提供了一个简单的键/值数据存储，可以在接近O（1）的时间内保存和查找信息。

6. Job Queue & Servers  
   - 大多数Web应用程序需要在幕后异步执行一些与响应用户请求无直接关联的工作。
   - 例如Google需要抓取整个互联网结果才能返回搜索结果，但是其实这是一个异步的爬网服务，并不是在每次搜索时实现，而是在爬网的过程中逐步更新搜索索引。
   - 最简单的是先进先出（FIFO）队列， 作业服务器轮询作业队列以确定是否有工作要做，如果有，他们会从队列中弹出作业并执行它。

7. Full-text Search Service
   - 许多Web应用程序支持某种搜索功能，其中用户提供文本输入，并且应用程序返回最“相关”的结果。
   - 通常运行单独的“搜索服务”来计算和存储反向索引并提供查询接口。

8. Services
   - 一旦应用程序达到一定规模，可能会有某些“服务”被分割出来作为单独的应用程序运行。 
      - 帐户服务在我们所有网站上存储用户数据
      - 内容服务存储我们所有视频，音频和图像内容的元数据。 
      - 支付服务提供用于对客户信用卡进行计费的界面。
      - ...

9. Data
   - 几乎每个应用程序，一旦达到一定规模，就会利用数据管道来确保收集，存储和分析数据。
      - 用户发送来数据，包括交互数据等，通过数据流式存储，对数据进行转化或扩充
      - 数据存到云端
      - Load数据并进行分析，hadoop，spark


10. Cloud storage
   - 云存储是一种通过互联网存储，访问和共享数据的简单且可扩展的方式.亚马逊S3


11. CDN
   - 内容交付网络
   - 通过网络提供静态HTML，CSS，Javascript和图像等资产的方式，比从单一源服务器提供服务要快得多.
   - 工作原理是在世界各地的许多“边缘”服务器上分发内容，以便用户最终从“边缘”服务器而不是源服务器下载资产。
   - 通常，Web应用程序应始终使用CDN来提供CSS，Javascript，图像，视频和任何其他资产。