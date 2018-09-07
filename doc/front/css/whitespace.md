
# Whitespace
## 1.Link
[CSS 的空格处理](http://www.ruanyifeng.com/blog/2018/07/white-space.html)   
## 2.空格规则
- 文字的前部和后部的空格都会忽略
- 内部的连续空格只会算作一个
- 制表符（\t）和换行符（\r和\n）会自动转成普通的空格键
```
<p>◡◡hello◡◡world
test◡◡</p>
=> hello world test
```
## 3.解决方案
- 使用\<pre\>标签
- 改用 HTML 实体\&nbsp;表示空格
- 用\<br\>标签显式表示换行

## 4.CSS 的 white-space 属性
- white-space: normal表示浏览器以正常方式处理空格
- white-space: nowrap不会因为超出容器宽度而发生换行
- white-space: pre按照\<pre\>标签的方式处理。
- white-space: pre-wrap基本还是按照\<pre\>标签的方式处理，唯一区别是超出容器宽度时，会发生换行.
- white-space: pre-line保留换行符。除了换行符会原样输出，其他都与white-space:normal规则一致。