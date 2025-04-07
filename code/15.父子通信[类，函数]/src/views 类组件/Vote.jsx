import React from "react";
import './Vote.less';
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';
/*
    父子组件通信:
    1.父传子信息 --->基于属性(props)
    2.儿子想修改父亲的数据 -->父亲把修改自己值的方法传递给儿子
    3.父传子一些HTML结构 --->基于属性中的children（插槽）
    4.父调用子的时候，可以给儿子设置ref，以此获取儿子的实例等
*/
//父组件
class Vote extends React.Component {
    state = {
        supNum: 10,
        oppNum: 0
    };

    // 设置为箭头函数：不论方法在哪执行的，方法中的this永远都是Vote父组件的实例
    change = (type) => {
        let { supNum, oppNum } = this.state;
        if (type === 'sup') {
            this.setState({ supNum: supNum + 1 });
            return;
        }
        this.setState({ oppNum: oppNum + 1 });
    };

    render() {
        let { supNum, oppNum } = this.state;
        return <div className="vote-box">
            <div className="header">
                <h2 className="title">React是很棒的前端框架</h2>
                <span className="num">{supNum + oppNum}</span>
            </div>
            <VoteMain supNum={supNum} oppNum={oppNum} />
            <VoteFooter change={this.change} />
        </div>;
    }
}

export default Vote;