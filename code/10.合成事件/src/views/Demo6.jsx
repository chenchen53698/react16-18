import React from "react";
//使用FastClick解决移动端使用click事件的300ms延迟问题
class Demo extends React.Component {

    handle = () => {
        console.log('点击了按钮');
    };

    render() {
        return <div>
            <button onClick={this.handle}>
                提交
            </button>
        </div>;
    }
}

export default Demo;