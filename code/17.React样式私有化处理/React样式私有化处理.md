## React样式私有化处理

在vue开发中，我们可以基于`scoped`为组件设置样式私有化！

但是**react项目**中并没有类似于这样的机制！如果我们想保证“团队协作开发”中，各组件间的样式不冲突，我们则需要基于特定的方案进行处理！

#### 1. 内联样式

```
// 调用组件的时候 <Demo color="red" />
import React from 'react';
const Demo = function Demo(props) {
    const titleSty = {
        color: props.color,
        fontSize: '16px'
    };
    const boxSty = {
        width: '300px',
        height: '200px'
    };
    return <div style={boxSty}>
        <h1 style={titleSty}>珠峰培训</h1>
        <h2 style={{ ...titleSty, fontSize: '14px' }}>珠峰培训</h2>
    </div>;
};
export default Demo;
```

内联样式的优点：

- **使用简单：** 简单的以组件为中心来实现样式的添加
- **扩展方便：** 通过使用对象进行样式设置，可以方便的扩展对象来扩展样式
- **避免冲突：** 最终都编译为元素的行内样式，不存在样式冲突的问题

在大型项目中，内联样式可能并不是一个很好的选择，因为内联样式还是有局限性的：

- **不能使用伪类：** 这意味着 :hover、:focus、:actived、:visited 等都将无法使用
- **不能使用媒体查询：** 媒体查询相关的属性不能使用
- **减低代码可读性：** 如果使用很多的样式，代码的可读性将大大降低
- **没有代码提示：** 当使用对象来定义样式时，是没有代码提示的



#### 适用场景（例外情况）

1. **动态计算样式**

   ```
   function ProgressBar({ percent }) {
     return (
       <div style={{
         width: `${percent}%`,  // 动态计算宽度
         backgroundColor: percent > 80 ? 'red' : 'green'
       }}>
         {percent}%
       </div>
     );
   }
   ```

2. **强制覆盖样式**

   ```
   <div 
     className="custom-card"
     style={{ 
       zIndex: 9999  // 临时解决层级问题
     }}
   >
     ...
   </div>
   ```



### 2. 使用CSS样式表

CSS样式表应该是我们最常用的定义样式的方式！

但多人协作开发中，很容易导致组件间的样式类名冲突，从而导致样式冲突；所以此时需要我们 `人为有意识的` 避免冲突！

- 保证组件最外层样式类名的唯一性，例如：`路径名称 + 组件名称` 作为样式类名
- 基于 less、sass、stylus 等css预编译语言的`嵌套功能`，保证组件后代元素的样式，都嵌入在外层样式类中！！

CSS样式表的优点：

- **结构样式分离：** 实现了样式和JavaScript的分离
- **使用CSS所有功能：** 此方法允许我们使用CSS的任何语法，包括伪类、媒体查询等
- **使用缓存：** 可对样式文件进行强缓存或协商缓存
- **易编写**：CSS样式表在书写时会有代码提示

当然，CSS样式表也是有缺点的：

- **产生冲突：** CSS选择器都具有相同的全局作用域，很容易造成样式冲突
- **性能低：** 预编译语言的嵌套，可能带来的就是超长的`选择器前缀`，性能低！
- **没有真正的动态样式：** 在CSS表中难以实现动态设置样式



### 3.CSS Modules

CSS的规则都是全局的，任何一个组件的样式规则，都对整个页面有效；产生局部作用域的唯一方法，就是使用一个独一无二的class名字；这就是 CSS Modules 的做法！

```
第一步：创建 xxx.module.css
.personal {
    width: 300px;
    height: 200px;
}
.personal span {
    color: green;
}
.title {
    color: red;
    font-size: 16px;
}
.subTitle {
    color: red;
    font-size: 14px;
}
第二步：导入样式文件 & 调用
import React from 'react';
import sty from './demo.module.css';
const Demo = function Demo() {
    return <div className={sty.personal}>
        <h1 className={sty.title}>珠峰培训</h1>
        <h2 className={sty.subTitle}>珠峰培训</h2>
        <span>珠峰培训</span>
    </div>;
};
export default Demo;
编译后的效果
// 结构
<div class="demo_personal__dlx2V">
    <h1 class="demo_title__tN+WF">珠峰培训</h1>
    <h2 class="demo_subTitle__rR4WF">珠峰培训</h2>
    <span>珠峰培训</span>
</div>

// 样式
.demo_personal__dlx2V {
    height: 200px;
    width: 300px
}
.demo_personal__dlx2V span {
    color: green
}
.demo_title__tN\+WF {
    color: red;
    font-size: 16px
}
.demo_subTitle__rR4WF {
    color: red;
    font-size: 14px
}
```

react 脚手架中对 CSS Modules 的配置

```javascript
// react-dev-utils/getCSSModuleLocalIdent.js
const loaderUtils = require('loader-utils');
const path = require('path');
module.exports = function getLocalIdent(
  context,
  localIdentName,
  localName,
  options
) {
  // Use the filename or folder name, based on some uses the index.js / index.module.(css|scss|sass) project style
  const fileNameOrFolder = context.resourcePath.match(
    /index\.module\.(css|scss|sass)$/
  )
    ? '[folder]'
    : '[name]';
  // Create a hash based on a the file location and class name. Will be unique across a project, and close to globally unique.
  const hash = loaderUtils.getHashDigest(
    path.posix.relative(context.rootContext, context.resourcePath) + localName,
    'md5',
    'base64',
    5
  );
  // Use loaderUtils to find the file or folder name
  const className = loaderUtils.interpolateName(
    context,
    fileNameOrFolder + '_' + localName + '__' + hash,
    options
  );
  // Remove the .module that appears in every classname when based on the file and replace all "." with "_".
  return className.replace('.module_', '_').replace(/\./g, '_');
};
```

###### `全局作用域`

CSS Modules 允许使用 :global(.className) 的语法，声明一个全局规则。凡是这样声明的class，都不会被编译成哈希字符串。

```javascript
// xxx.module.css
:global(.personal) {
    width: 300px;
    height: 200px;
}

// xxx.jsx
const Demo = function Demo() {
    return <div className='personal'>
        ...
    </div>;
};
```

###### `class继承/组合`

在 CSS Modules 中，一个选择器可以继承另一个选择器的规则，这称为”组合”

```
// xxx.module.css
.title {
    color: red;
    font-size: 16px;
}
.subTitle {
    composes: title;
    font-size: 14px;
}

// 组件还是正常的调用，但是编译后的结果
<h1 class="demo_title__tN+WF">珠峰培训</h1>
<h2 class="demo_subTitle__rR4WF demo_title__tN+WF">珠峰培训</h2>
```





- <font color='orange'>**创建**</font>：在SRC目录中，创建一个 xxx.jsx 的文件，就是要创建一个组件；我们在此文件中，创建一个函数，让函数返回JSX视图「或者JSX元素、virtualDOM虚拟DOM对象」；这就是创建了一个**“函数组件**”！！

- <font color='orange'>**调用**</font>：基于ES6Module规范，导入创建的组件「可以忽略.jsx后缀名」，然后像写标签一样调用这个组件即可！！





