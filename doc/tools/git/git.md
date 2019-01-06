# Git

## git bisect

通过"两分法"，将代码历史一分为二，确定问题出在前半部分，还是后半部分，不断执行这个过程，直到范围缩小到某一次代码提交。  

```bash
$ git log --pretty=online #检查代码提交历史
$ git bisect start [end commit] [start commit] #启动命令
#刷新当前页面，确认是否正确
$ git bisect good #正确
$ git bisect bad #错误
#直到成功找到出问题的那一次提交为止
$ git bisect reset
```