# LR原理
## LR的预测函数
> h(x) = 1 / ( 1 + exp(-w * x)) = sigmoid(-w*x)

## 为啥用sigmoid
> 现在就出现一个重要的问题，“为什么 LR 会使用 Sigmoid，而不是其他的函数？”。
> 其实这个问题本身就是不对的，前面解释了正是因为 Sigmoid 才有了 LR， 而不是 LR 选择了 Sigmoid。
> 所以这里的本质问题是：为什么使用线性模型进行回归学习要使用 基于 Sigmoid 的 LR，而不是其他的 Regression。
> 主要是sigmoid的熵比较大，在给定数据的情况下，熵最大。
