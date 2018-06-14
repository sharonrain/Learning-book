
# MarkDown
---
## 1.Link
Windows编辑器：[MarkdownPad](http://www.markdownpad.com/)  
网页版编辑器：[简书](https://www.jianshu.com/)  

## 2.基本语法
### 2.1 标题
使用#表示1-6级标题。

>\# 一级标题  
>\## 二级标题  
>\### 三级标题  
>\#### 四级标题  
>\##### 五级标题  
>\###### 六级标题


使用=和-标记一级和二级标题。
> 一级标题   
> `=========`   
> 二级标题    
> `---------`
### 2.2 引用
内容引用  
>\>引用内容  

嵌套引用
>\>也可以在引用中  
\>>使用嵌套的引用

### 2.3 列表
无序列表
> 使用`·`、`+`、或`-`标记无序列表  
> \- (+\*) 第一项  
> \- (+\*) 第二项  
> \- (+\*) 第三项

有序列表
> 有序列表以数字和 `.` 开始；

### 2.4 代码
> 代码区块的建立是在每行加上4个空格或者一个制表符 
 
	void main()    
	{    
    	printf("Hello, Markdown.");    
	} 
> 也可以通过 ``，插入行内代码 

`inline code `

> 也可以通过使用 \`\`\` \`\`\` 来包含多行代码  
> 代码高亮\`\`\`js \`\`\`

### 2.5 分隔线
> 可以在一行中使用三个或更多的 *、- 或 _ 来添加分隔线  
>\*\*\*  
>\------  
>\___  


### 2.6 超链接
> [icon.png](./images/icon.png)  
> `[icon.png](./images/icon.png)`

参考式  
> [Google][link]
> [link]: http://www.google.com/
> `[Google][link]`  
> `[link]: http://www.google.com/`

自动链接
> <http://www.google.com/>  
> `<http://www.google.com/>`

### 2.7 图片
插入图片的语法和插入超链接的语法基本一致，只是在最前面多一个 !
参考2.6

### 2.8 强调
使用 * * 或 _ _来表示斜体  
>_斜体_

使用 ** ** 或 __ __来表示加粗
>**加粗**

删除线 ~~删除线~~(扩展)
> ~~删除线~~


### 2.9 字符转义
反斜线（\）来转义
> \*

需要转义的字符包括
> \\   
> \`   
> \*   
> \_   
> \{}  
> \[]  
> \()  
> \#   
> \+   
> \-   
> \.   
> \!   

### 2.10 表格
> |    name    | age |  
> | ---------- | --- |  
> | LearnShare |  12 |  
> | Mike       |  32 |  

对齐方式  

- `:---` 代表左对齐  
- `:--:` 代表居中对齐  
- `---:` 代表右对齐  

### 2.11 换行
每一行的结尾至少空两格

## 3.格式转换 
### 3.1 HTML文档
#### MdCharm
#### Pandoc
参考 [Installing](http://pandoc.org/installing.html) 安装 Pandoc。

```
cd /path/to/file/  
pandoc -o hello.html hello.md     
pandoc -o hello.html -c style.css hello.md
```
### 3.1 HTML文档
#### MdCharm
#### Pandoc
`pandoc -o hello.pdf hello.md`
#### Chrome
在将 Markdown 转换为 HTML 文档 之后，可以通过 Chrome 浏览器 打开它。选择 '打印'为 '另存为 PDF'。