### React的工程化/组件化开发

  我们可以基于webpack自己去搭建一套工程化打包的架子，但是这样非常的麻烦/复杂；React官方，为我们提供了一个脚手架。
  **脚手架**：基于它创建项目，默认就把webpack的打包规则已经处理好了，把一些项目需要的基本文件也都创建好了！！

#### 步骤：

1. 安装脚手架 
   - npm i create-react-app -g  「mac前面要设置sudo」
2. 检查安装情况 
   -  create-react-app --version
3.  <font color='red'>**基于脚手架创建React工程化的项目**</font>
   - create-react-app 项目名称
   - 项目名称要遵循npm包命名规范：使用“数字、小写字母、_”命名



#### 项目目录:

- node_modules  包含安装的模块
- public  页面模板和IconLogo
  - favicon.ico
  - index.html
-  src  我们编写的程序
  - index.jsx  程序入口「jsx后缀名可以让文件支持jsx语法」
- package.json
- ...



#### 一个React项目中，默认会安装：

1. <font color='red'>**react**</font>：React框架的核心
2. <font color='red'>**react-dom**</font>：React视图渲染的核心「基于React构建WebApp（HTML页面）」
   - <font color='red'>**react-native**</font>：构建和渲染App的
3. <font color='red'>**react-scripts**</font>：脚手架为了让项目目录看起来干净一些，把webpack打包的规则及相关的插件/LOADER等都隐藏到了node_modules目录下，react-scripts就是脚手架中自己对打包命令的一种封装，基于它打包，会调用node_modules中的webpack等进行处理！！



#### <font color='red'>package.json</font>

```
{
  ...
  "dependencies": {
    ...
    "react": "^18.2.0",  //核心
    "react-dom": "^18.2.0",  //视图编译
    "react-scripts": "5.0.1", //对打包命令的集成
    "web-vitals": "^2.1.4"  //性能检测工具
  },
  "scripts": {
    "start": "react-scripts start", //开发环境启动web服务进行预览
    "build": "react-scripts build", //生产环境打包部署
    "test": "react-scripts test",   //单元测试
    "eject": "react-scripts eject"  //暴露配置项
  },
  "eslintConfig": {  //ESLint词法检测
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {  //浏览器兼容列表
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```



默认情况下，会把webpack配置项隐藏到node_modules中，如果想修改，则需要暴露配置项：<font color='red'>npm run eject</font> **不可逆操作**

这里使用<font color='red'>npm run eject</font> 是之前没用过，并不推荐！需要有一定的webpack基础

除了<font color='red'>npm run eject</font> 外还有很多其他修改配置文件的方法如:

1. **`react-app-rewired`**
2. **Vite/Next.js**：直接修改对应的配置文件（`vite.config.js`/`next.config.js`）。

**新增的内容**

- 目录下:

  - scripts
    - start.js
    - build.js
    - test.js
  - config:
    - webpack.config.js
    - paths.js
    -  ...

-  package.json中的变化:

  - ```
    {
      "dependencies":{  //暴露后，webpack中需要的模块都会列在这
         ...
    },
    "scripts": {
        "start": "node scripts/start.js",  
        "build": "node scripts/build.js",
        "test": "node scripts/test.js"
        //不在基于react-scripts处理命令，而是直接基于node去执行对应的文件
        //已经没有eject命令了
    },
    "jest": {
        //单元测试配置
    },
    ...
    ```



#### <font color='red'>npm run eject实战修改</font>

1. **配置less**

   ```
   /* 
   默认安装和配置的是sass，如果需要使用less，则需要：
   1. 安装
     $ yarn add less less-loader@8
     $ yarn remove sass-loader
   2. 修改webpack.config.js
   */
   // 72~73
   const lessRegex = /\.less$/;
   const lessModuleRegex = /\.module\.less$/;
   
   //507~545
   {
     test: lessRegex,
     exclude: lessModuleRegex,
     use: getStyleLoaders(
       ...
       'less-loader'
     )
   },
   {
     test: lessModuleRegex,
     use: getStyleLoaders(
       ...
       'less-loader'
     ),
   }
   ```

2. **配置别名**

   ```
   修改webpack.config.js
   //313
   resolve: {
     ...
     alias: {
       '@': path.appSrc,
       ...
     }
   }
   ```

3. **配置域名和端口号**

   ```
   scripts/start.js
   //47,48
   const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 8080;
   const HOST = process.env.HOST || '127.0.0.1';
   // 也可以基于 cross-env 设置环境变量
   ```

4. **配置浏览器兼容**

   ```
   /*
   CSS兼容处理：设置前缀
   autoprefixer + postcss-loader + browserslist
   
   JS兼容处理：ES6语法转换为ES5语法
   babel-loader + babel-preset-react-app(@babel/preset-env) + browserslist
   
   JS兼容处理：内置API
   入口配置react-app-polyfill(index.js)
   */
   import 'react-app-polyfill/ie9';
   import 'react-app-polyfill/ie11';
   import 'react-app-polyfill/stable';
   ```

5. **配置跨域代理**

   ```
   使用内置的 http-proxy-middleware
   src/setupProxy.js中
   app.use(
           createProxyMiddleware("/jian", {
               target: "https://www.jianshu.com/asimov",
               changeOrigin: true,//修改请求头中的 Host 为目标地址
               ws: true,//启用 WebSocket 代理（如需转发 WebSocket 请求）
               pathRewrite: { "^/jian": "" }
           })
       );
   ```

   



​			



