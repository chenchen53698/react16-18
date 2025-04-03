import React from "react";

/* 
    对象形式（浅合并）
        this.setState({ key: newValue });

    函数形式（依赖前一个状态或 props）
        this.setState((prevState, prevProps) => ({
          key: prevState.key + prevProps.step
        }));

    可选回调（状态更新后执行）
        this.setState({ key: newValue }, () => {
          console.log('状态已更新:', this.state.key);
        });
 */
/*
    需求:
    只渲染一次,数值变为20
    
    this.setState((prevState)=>{
        // prevState:存储之前的状态值
        // return的对象，就是我们想要修改的新状态值「支持修改部分状态」
        return {
            xxx:xxx
        };
    })
*/
class Demo extends React.Component {
    state = {
        x: 0
    };

    handle = () => {
        for (let i = 0; i < 20; i++) {
            /* this.setState({
                x: this.state.x + 1
            }); */

            this.setState(prevState => {
                return {
                    x: prevState.x + 1
                };
            });
        }
    };

    render() {
        console.log('视图渲染：RENDER');
        let { x } = this.state;
        return <div>
            x:{x}
            <br />
            <button onClick={this.handle}>按钮</button>
        </div>;
    }
}

export default Demo;