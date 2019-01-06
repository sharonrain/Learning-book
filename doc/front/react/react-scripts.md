# React Scripts

## 1. what react scripts do

1. npx create-react-app my-react-app

    ```bash
    yarn start
    yarn build
    yarn test
    yarn eject
    ```

2. react app package.json

    ```json
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject" // 暴露配置
    },
    ```

3. react-scripts package.json

    ```json
    "bin": {
        "react-scripts": "./bin/react-scripts.js"
    },
    ```

4. build

    ```js
    fs.emptyDirSync(paths.appBuild);
    // Merge with the public folder
    copyPublicFolder(); // except index.html
    // Start the webpack build
    return build(previousFileSizes);

    // call webpack
    let compiler = webpack(config);// config generate by webpack.config.js with param "production"
    ```

5. start

    ```js
    const compiler = createCompiler(webpack, config, appName, urls, useYarn);
    const serverConfig = createDevServerConfig(
        proxyConfig,
        urls.lanUrlForConfig
        );
    const devServer = new WebpackDevServer(compiler, serverConfig);
    // config generate by webpack.config.js with param "development"
    ```

6. test

    call jest with args

7. eject

    eject（ 弹射） 命令做的事情， 就是把潜藏在 react- scripts 中的一系列技术栈配置都“ 弹射” 到应用的顶层

## other tips

1. 类库解耦

    spawn引用的是react-dev-utils/crossSpawn。而在react-dev-utils/corssSpawn里面也只是简简单单的几句，引入cross-spawn再把cross-spawn暴露出去。这么写就可以起到类库解耦的作用，比如以后这个库被爆出有重大的bug或者停止维护了，直接修改这个文件引入其他的类库，其他引用该文件的代码就不需要改动。

2. 调试方法

    把vscode调试文件修改为 start.js 文件"program": "${workspaceFolder}/node_modules/react-scripts/scripts/start.js"

3. npx

    提升开发者使用包内提供的命令行工具的体验。npx create-react-app my-app

4. yarn javascript 包管理工具，yarn === yarn run

5. The webpack-dev-server provides you with a simple web server and the ability to use live reloading.

## what roadhog

提供 server 和 build 两个命令，分别用于本地调试和构建，和create-react-app一致，配置略有不同，之前create-react-app不支持配置，但是现在有eject了，应是可配置的。
roadhog是可配置版本的create-react-app,通过json来配置。