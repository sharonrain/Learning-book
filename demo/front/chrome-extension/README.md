# chrome extension

1. all the extension depends on manifest.json
2. we can set default page in manifest.json(popup.html)
3. popup.html should not contain any javascript, it should link to separate js file(popup.js)
4. 通过在manifest.json中添加内容脚本content_scripts块，可以注入在外部网页上调用的函数。
5. 通过 background 指定一个background.js文件，这个js文件是扩展被安装后会一直运行在浏览器中的程序，比如我们要保存一些扩展运行时的状态，缓存一些数据，或者绑定一些浏览器的事件等代码都可以放到这个js文件中