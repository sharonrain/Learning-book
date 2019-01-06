
# 设计Twitter时间轴和搜索

## 用例和约束

### Step1:用例

- 发布推文
- 查看自己的用户时间
- 查看Home时间线
- 搜索关键字
- 服务具有高可用性
- 不包括？根据可见性设置删除推文？

### Step2:约束

- 一般
  - 流量分布不均匀
  - 发布推文很快
  - 用户量很大
  - 内容很多
  - 读取和搜索请求很大
- 时间线
  - 查看时间表很快
  - 推文比阅读更重要
  - 提取推文很重要
- 搜索
  - 搜索快，搜索是重读的

### Step3:计算

- 每条推文大小
  - tweet_id - 32字节
  - user_id - 8字节
  - text - 140字节
  - media - 10kb平均
  - 总共：~10 KB
- 每月150 TB新推文内容（10kb*5亿*30天）
- 每秒10万次请求读取
- 每秒6000条推文
- 每秒扇出1500亿条推文
