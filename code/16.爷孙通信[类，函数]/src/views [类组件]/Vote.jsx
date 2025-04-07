import React from 'react';
import './Vote.less';
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';
import ThemeContext from '@/ThemeContext';
class Vote extends React.Component {
    // 设置初始状态
    state = {
        supNum: 10,
        oppNum: 5
    };
    // 修改状态的方法
    change = type => {
        let { supNum, oppNum } = this.state;
        if (type === 'sup') {
            this.setState({ supNum: supNum + 1 });
            return;
        }
        this.setState({ oppNum: oppNum + 1 });
    };
    render() {
        let { supNum, oppNum } = this.state;
        //使用ThemeContext提供的Provider方法向上下文中存储信息
        // 通过value传递数据
        // 当祖先组件更新,render重新执行，会把最新的值再次存储到上下文对象中
        return <ThemeContext.Provider
            value={{
                supNum,
                oppNum,
                change: this.change
            }}>
            <div className="vote-box">
                <header className="header">
                    <h2 className="title">React真的很不错!!</h2>
                    <span className="num">{supNum + oppNum}人</span>
                </header>
                <VoteMain />
                <VoteFooter />
            </div>
        </ThemeContext.Provider>;
    }
};
export default Vote;