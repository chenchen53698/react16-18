import React, { useState } from "react";
import { Button } from 'antd';
import './Demo.less';
import { flushSync } from 'react-dom';
/* 
useState:
  和类组件中的setState一样，每次更新状态值，也不是立即更新，而是加入到更新队列中！
    React 18 全部采用批量更新
    React 16 部分批更新，放在其它的异步操作中(定时器...)，依然是同步操作（一次操作刷新一次渲染队列）！
    可以基于flushSync刷新渲染队列
*/
const Demo = function Demo() {
    console.log('RENDER渲染');
    let [x, setX] = useState(10),
        [y, setY] = useState(20),
        [z, setZ] = useState(30);

    const handle = () => {
        flushSync(() => {
            setX(x + 1);
            setY(y + 1);
        });
        setZ(z + 1);
    };
    return <div className="demo">
        <span className="num">x:{x}</span>
        <span className="num">y:{y}</span>
        <span className="num">z:{z}</span>
        <Button type="primary"
            size="small"
            onClick={handle}>
            新增
        </Button>
    </div>;
};

export default Demo;