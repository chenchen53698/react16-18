import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.less'
import DemoOne from '@/views/DemoOne';
import { Slot1, Slot2,Slot3 } from '@/views/Slot';

//获取页面中#root的容器，作为“根”容器
const root = ReactDOM.createRoot(document.getElementById('root'));

const items = ['React', 'Vue', 'Solid'];

root.render(
      <>
            {/* 这是个传入了属性和标签的组件 */}
            <DemoOne title="哈哈哈哈哈" x={10} >
                  {/* 具名插槽通过 props 传递 children 实现，通过标签，在子组件决定插入位置 */}
                  <div slot="header">
                        我是头部插槽
                  </div>
                  <div slot="footer">
                        我是尾部插槽
                  </div>
                  {/* 默认插槽，在子组件决定插入位置 */}
                  <div >
                        我是插槽信息3
                  </div>
                  <div >
                        我是插槽信息4
                  </div>
            </DemoOne>
            {/* 默认插槽,通过 props.children 接收父组件传递的子元素（类似 Vue 的默认插槽） */}
            <Slot1>
                  <p>默认插槽</p>
            </Slot1>
            {/* 具名插槽的第二种写法,通过 props 传递 JSX 实现 */}
            <Slot2
                  header={<p>这是头部</p>}
                  footer={<p>这是尾部</p>}
            >
                  <p>默认插槽信息1</p>
                  <p>默认插槽信息2</p>
            </Slot2>
            {/* 通过 函数作为 props 实现子组件向父组件传递数据（类似 Vue 的作用域插槽）。 */}
            <Slot3
                  data={items}
                  renderItem={(item) => <li key={item}>{item.toUpperCase()}</li>}
            />
      </>
);
