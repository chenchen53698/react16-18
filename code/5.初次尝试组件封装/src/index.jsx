import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.less'
import Dialog from '@/components/Dialog';


//获取页面中#root的容器，作为“根”容器
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
      <>
            <Dialog title="友情提示" content="大家出门做好个人防护！" />

            <Dialog content="我们一定要好好学React!">
                  <button>确定</button>
                  <button>很确定</button>
            </Dialog>
      </>
);
