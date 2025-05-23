import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.less'
//获取页面中#root的容器，作为“根”容器
const root = ReactDOM.createRoot(document.getElementById('root'));

/*
let text = 'xaaxa'
//基于render方法渲染我们编写的视图，把渲染后的内容，全部插入到#root中进行渲染
root.render(
      <> 
            <div>{text}</div>
            <p>1111111111</p>
      </>
);
*/
/* 需求一：基于数据的值，来判断元素的显示隐藏 */
let flag = false, isRun = false;
/* 需求二：从服务器获取了一组列表数据，循环动态绑定相关的内容 */
let data = [{
      id: 1,
      title: '欢迎大家来学习React'
}, {
      id: 2,
      title: '期望大家可以把React学好'
}, {
      id: 3,
      title: '大家有问题可以随时找我'
}];
root.render(
      <>
            {/* 控制元素的display样式：不论显示还是隐藏，元素本身都渲染出来了 */}
            <button style={{
                  display: flag ? 'block' : 'none'
            }}>按钮1</button>

            <br />

            {/* 控制元素渲染或者不渲染 */}
            {flag ? <button>按钮2</button> : null}

            <br />

            <button>{isRun ? '正在处理中...' : '立即提交注册'}</button>

            <br />

            <h2>今日新闻</h2>
            <ul>
                  {/* map 就是执行有结果的js表达式 */}
                  {data.map((item, index) => {
                        /* 循环创建的元素一定设置key属性，属性值是本次循环中的“唯一值”「优化DOM-DIFF」 */
                        return <li key={item.id}>
                              <em>{index + 1}</em>
                              &nbsp;&nbsp;
                              <span>{item.title}</span>
                        </li>;
                  })}
            </ul>

            <br />

            {/* 扩展需求:没有数组，就是想单独循环五次 */}
            {/*
                  new Array(5) 只传一个数字, -->[empty x 5]
                        ---这是稀数组，不能使用数组的迭代方法(forEach,map)
                        ---可以使用.fill()，它是数组的一个内置方法，用于用静态值填充数组的全部或部分元素。
                  new Array(5,19)-->[5,19]
                  new Array('5')-->['5']
             */}
            {new Array(5).fill(null).map((_, index) => {
                  return <button key={index}>
                        按钮{index + 1}
                  </button>;
            })}


      </>
);


