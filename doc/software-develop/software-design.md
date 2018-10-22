
# Software Design
## 1.Link
[A Philosophy of Software Design](https://www.amazon.com/Philosophy-Software-Design-John-Ousterhout/dp/1732102201)
[Youtube](https://www.youtube.com/watch?v=bmSAYlu0NcY)
[Note](https://lethain.com/notes-philosophy-software-design/)
## 2.什么是复杂性
1. 软件设计的最大目标，就是降低复杂性。
2. 复杂性，就是任何使得软件难于理解和修改的因素。
3. 复杂性的来源主要有两个：代码的含义模糊（代码里面的重要信息，看不出来）和互相依赖（某个模块的代码，不结合其他模块，就会无法理解）。


## 3.复杂性隔离
1. 把复杂性隔离在一个模块，不与其他模块互动，就达到了消除复杂性的目的。
   - 复杂性尽量封装在模块里面，不要暴露出来
   - 多个模块耦合，那就把这些模块合并成一个。
2. 改变软件设计的时候，修改的代码越少，软件的复杂性越低。

## 4.接口和实现
1. 接口要简单，实现可以复杂。
2. Unix 的文件读写接口，只暴露了5个方法，就囊括了所有的读写行为。
   - open, close, read, write, lseak

## 5.减少抛错
1. 除了那些必须告诉用户的错误，其他错误尽量在软件内部处理掉，不要抛出。
