### 关于JSX底层处理机制JSX构建视图的基础知识

![](D:\studied\react16&18\react16-18\code\3.JSX\pic\JSX渲染机制流程图.jpg)

1. #### <font color='red'>**把我们编写的JSX语法，编译为虚拟DOM对象「virtualDOM」**</font>

   1. 基于 **babel-preset-react-app** 把JSX编译为 React.createElement(...) 这种格式！！

      <img src="D:\studied\react16&18\react16-18\code\3.JSX\pic\df15f781837ead8869403cc2515fe72.png" style="zoom:60%;" />		

      只要是元素节点，必然会基于**createElement**进行处理！

      ##### <font color='orange'>**React.createElement(ele,props,...children)**</font>

      1. **ele**：元素标签名「或组件」
      2. **props**：元素的属性集合(对象)「如果没有设置过任何的属性，则此值是null」
      3. **children**：第三个及以后的参数，**都是当前元素的子节点**

      

      2.再把 createElement 方法执行，创建出**virtualDOM虚拟DOM对象**「也有称之为：JSX元素、JSX对象、ReactChild对象...」！！

      <font color='orange'>**virtualDOM**</font> = {
              $$typeof: Symbol(react.element),
              ref: null,
              key: null,
              <font color='orange'>**type**</font>: 标签名「或组件」,
              // 存储了元素的相关属性 && 子节点信息
             <font color='orange'> **props**</font>: {
                  元素的相关属性,
                  <font color='orange'>**children**</font>:子节点信息「没有子节点则没有这个属性、属性值可能是一个值、也可能是一个数组」
              }
      }

      ```
      //打印下属代码看示例
      console.log(
        React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "h2",
            { className: "title", style: styObj },
            "\u73E0\u5CF0\u57F9\u8BAD" 
          ),
          React.createElement(
            "div",
            { className: "box" },
            React.createElement("span", null, x),
            React.createElement("span", null, y)
          )
        )
      )
      ```

   

2. #### <font color='red'>**把构建的virtualDOM渲染为真实DOM**</font>

   1. ```
       v16
            ReactDOM.render(
              <>...</>,
              document.getElementById('root')
            );
      ```

      

   2. ```
        v18
            const root = ReactDOM.createRoot(document.getElementById('root'));
            root.render(
              <>...</>
            );
      ```

      

   

3. #### **补充说明**:

   - 第一次渲染页面是直接从virtualDOM->真实DOM；
   - 但是后期视图更新的时候，需要经过一个DOM-DIFF的对比，计算出补丁包PATCH（两次视图差异的部分），把PATCH补丁包进行渲染！！









