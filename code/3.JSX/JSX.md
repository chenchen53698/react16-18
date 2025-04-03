### JSX

#### JSX构建视图的基础知识

<font color='red'>**JSX：**</font>javascript and xml(html) 把JS和HTML标签混合在了一起

- vscode如何支持JSX语法「格式化、快捷提示...」

  - 创建的js文件，我们把后缀名设置为jsx即可，这样js文件中就可以支持JSX语法了

  -  webpack打包的规则中，也是会对.jsx这种文件，按照JS的方式进行处理的

    

- 在HTML中嵌入“JS表达式”，需要基于“**{}**”

  - <font color='red'>**JS表达式**</font>：执行有结果的

    - 变量/值

    - 运算表达式

    - 特殊表达式

    - ...详细可以问ai**有结果的表达式**

      

-  在ReactDOM.createRoot()的时候，不能直接把HTML/BODY做为根容器，需要指定一个额外的盒子「例如：#root」

  

- 每一个构建的视图，只能有一个“根节点”

  -  出现多个根节点则报错 Adjacent JSX elements must be wrapped in an enclosing tag.

  - React给我们提供了一个特殊的节点(标签)：React.Fragment 空文档标记标签

    - **<></>**

    -  既保证了可以只有一个根节点，又不新增一个HTML层级结构！！

      

-  {}中嵌入不同的值，所呈现出来的特点

  - number/string：值是啥，就渲染出来啥

  - boolean/null/undefined/Symbol/BigInt：渲染的内容是空

  - 除数组对象外，其余对象一般都不支持在{}中进行渲染，但是也有特殊情况:

    - JSX虚拟DOM对象
       - 给元素设置style行内样式，要求必须写成一个对象格式

  - 数组对象：把数组的每一项都分别拿出来渲染「并不是变为字符串渲染，中间没有逗号」

  - 函数对象：不支持在{}中渲染，但是可以作为函数组件，用<Component/>方式渲染!!

    

- 给元素设置样式

  - 行内样式：需要基于对象的格式处理，直接写样式字符串会报错

    ```
    <h2 style={{
            color: 'red',
            fontSize: '18px' //样式属性要基于驼峰命名法处理
    }}>
    ===
    let aaa = {
     	color: 'red',
    	fontSize: '18px'
    }
    <h2 style={aaa}>
    ```

  - 设置样式类名：需要把class替换为className
  
    ```
    <h2 className="box"></h2>
    ```
  









