import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.less'
import Vote from '@/views/Vote';
import test from '@/views/test';


//获取页面中#root的容器，作为“根”容器
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
      <>
           <Vote title="React其实还是很好学的!" ></Vote>
      </>
);
// 父组件更新，触发的子组件更新
setTimeout(() => {
  root.render(
      <>
          <Vote title="我是五秒后传递的标题" />
      </>
  );
}, 5000);
console.log(React.createElement(Vote,{title:"React其实还是很好学的!"}))

