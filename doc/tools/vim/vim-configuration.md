
# Software Design

## 1.基础知识

- 全局配置： /etc/vim/vimrc(or /etc/vimrc)
- 用户配置： ~/.vamrc
- 单次编辑启用某个配置项: :set number(关闭一般在前面加no, set nonumber)
- 查看某个配置项是打开还是关闭，:set number?
- 查看帮助： :help number

## 2.基本配置

- set nocompatible 不与vi兼容（采用vim自己操作命令）
- syntax on 打开语法高亮
- set showmode 底部显示当前命令
- set mouse=a 支持鼠标
- set encoding=urf-8 使用utf-8编码
- set t_Co=256 启用256色
- filetype indent on 开启文件检查，载入与文件类型对应的缩进规则
  - 比如.py文件载入~/.vim/indent/python.vim

2.1 **缩进**

- set autoindent 下一行的缩进自动和上一行一致
- set tabstop=2 按下Tab键时Vim显示空格数
- set shiftwidth=4 在文本上按下>>（增加一级缩进）、<<（取消一级缩进）或者==（取消全部缩进）时，每一级的字符数。
- **set expandtab** 自动将Tab转化为空格
- set softtabstop=2 Tab转化多少个空格

2.2 **外观**

- set number 显示行号
- set relativenumber 显示光标所在行号，其他行为相对于改行的行号
- set cursorline 光标所在的行高亮
- set wrap 自动折行，太长的行分几行显示
- set linebreak 只有遇到指定符号（空格，连词号，其他标点），才折行
- set wrapmargin=2 这行处与编辑窗口的右边沿空出的字符数
- set scrolloff=5 （set sidescrolloff）垂直(水平)滚动时，光标距离顶部、底部位置
- set laststatus=2 是否显示状态栏。0 表示不显示，1 表示只在多窗口时显示，2 表示显示。
- set ruler 在状态栏显示光标的当前位置

2.3 **搜索**

- set showmatch 光标遇到圆括号、方括号、大括号时，自动高亮对应的另一个圆括号、方括号和大括号。
- set hlsearch 搜索时，高亮显示匹配结果
- set incsearch 输入搜索模式时，每输入一个字符，就自动跳到第一个匹配的结果
- set ignorecase 搜索时忽略大小写。
- set smartcase 如果同时打开了ignorecase，那么对于只有一个大写字母的搜索词，将大小写敏感；搜索Test时，将不匹配test；搜索test时，将匹配Test。

2.4 **编辑**

- set spell spelllang=en_us 打开英语单词的拼写检查。
- set nobackup 不创建备份文件。默认情况下，文件保存时，会额外创建一个备份文件
- set noswapfile 不创建交换文件。交换文件主要用于系统崩溃时恢复文件，文件名的开头是.、结尾是.swp
- set undofile 保留撤销历史。
- set autochdir 自动切换工作目录。
- set noerrorbells 出错时，不要发出响声。
- set visualbell 出错时，发出视觉提示，通常是屏幕闪烁。
- set history=1000 需要记住多少次历史操作
- set autoread 打开文件监视。如果在编辑过程中文件发生外部改变（比如被别的编辑器编辑了），就会发出提示。
- set listchars=tab:»■,trail:■ ; set list显示特殊字符
- set wildmenu;set wildmode=longest:list,full 命令模式下，底部操作指令按下 Tab 键自动补全。