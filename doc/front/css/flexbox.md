
# Flex box
## 1.Link
[Flex1](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
[Flex2](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)
[Flex Example](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
## 2.简介
- 布局的传统解决方案，基于盒状模型，依赖 display 属性 + position属性 + float属性， 对于那些特殊布局非常不方便
- Flex 布局，可以简便、完整、响应式地实现各种页面布局

## 3.用法
1. 指定Flex布局
   ```
   .box{
     // display: -webkit-flex /* webkit 内核浏览器必须包含 safari */
     display: flex; // inline-flex;行内元素
   }
   ```
   设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效。
2. 容器属性
   1. flex-direction
      - 决定主轴的方向，项目排列方向
      - 4个取值
        ```
        .box {
          flex-direction: row | row-reverse | column | column-reverse;
        }
        ```
   2. flex-wrap
      - 定义一条轴线排不下，如何换行。
      - flex-wrap: nowrap | wrap | wrap-reverse（换行，第一行在下方）;
   3. flex-flow
      - flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap
      - flex-flow: <flex-direction> || <flex-wrap>;
   4. justify-content
      - justify-content属性定义了项目在主轴上的对齐方式
      - justify-content: flex-start(default) | flex-end | center | space-between | space-around;
   5. align-items
      - align-items属性定义项目在交叉轴上如何对齐。
      - align-items: flex-start | flex-end | center | baseline | stretch（default）;
   6. align-content
      - align-content属性定义了多根轴线的对齐方式.
      - align-content: flex-start | flex-end | center | space-between | space-around | stretch;
3. 项目属性
   1. order
      - order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
        ```
        .item {
          order: <integer>;
        }
        ```
   2. flex-grow
      - flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
   3. flex-shrink
      - flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。负数无效
   4. flex-basis
      - flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间
      - auto为项目本来大小
      - 可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间
   5. flex
      - flex属性是flex-grow, flex-shrink 和 flex-basis的简写。
      - 默认值为0 1 auto。后两个属性可选
      - flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
   6. align-self
      - align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性
      - align-self: flex-start | flex-end | center | baseline | auto(等价stretch);

