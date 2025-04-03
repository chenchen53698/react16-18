import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.less'
import DemoOne from '@/views/DemoOne';
import DemoZero from '@/views/DemoZero';

//获取页面中#root的容器，作为“根”容器
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
      <>
            {/* 组件使用 + props基本使用 */}
            {/* 单闭合 */}
            <DemoZero title="我是标题" x={10} data={[100, 200]} className="box" style={{ fontSize: '20px' }} />
            {/* 双闭合 */}
            <DemoZero title="REACT好好玩哦" x={10}>
                  <span>哈哈哈</span>
                  <span>呵呵呵</span>
            </DemoZero>

            {/* 设置props默认值+设置props规则 */}
            <DemoOne title="哈哈哈哈哈" x={10} y={10}/>
            <DemoOne title="哈哈哈哈哈" y='1'/>

      </>
);

//函数组件的底层渲染机制
console.log(
      React.createElement(DemoZero, {
            title: "\u6211\u662F\u6807\u9898",
            x: 10,
            data: [100, 200],
            className: "box",
            style: {
                  fontSize: '20px'
            }
      })
)