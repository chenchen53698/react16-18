import React from "react";
import { Button } from 'antd';
import './Demo.less';

/* 
// 纯函数组件：静态组件
const Demo = function Demo() {
    let n = 0;
    return <div className="demo">
        <span className="num">{n}</span>
        <Button type="primary" size="small" onClick={() => {
            n += 10;
            console.log(n);
        }}>新增</Button>
    </div>;
}; 
*/

// 类组件:动态组件
class Demo extends React.Component {
    state = {
        n: 0
    };

    handle = () => {
        let { n } = this.state;
        this.setState({
            n: n + 10
        });
    };

    render() {
        let { n } = this.state;
        return <div className="demo">
            <span className="num">{n}</span>
            <Button type="primary" size="small" onClick={this.handle}>新增</Button>
        </div>;
    }
}


export default Demo;