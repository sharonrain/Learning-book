
# Javascript this
## 1.Link
[JavaScript 的 this 原理](http://www.ruanyifeng.com/blog/2018/06/javascript-this.html)
## 2.关于this
1. this指的是函数运行时所在的环境。


## 3.内存的数据结构
1. 当一个对象赋值给变量obj， JavaScript 引擎会先在内存里面，生成这个对象。然后把这个对象的内存地址赋值给变量obj。
2. 当属性是一个函数时，引擎会将函数单独保存在内存中，然后再将函数的地址赋值给属性。JavaScript 允许在函数体内部，引用当前环境的其他变量。所以函数执行时，根据.前面的对象找到当前环境（.前面没有对象，为global）