import React, { useState } from 'react';
import './Vote.less';
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';
import ThemeContext from '@/ThemeContext';
const Vote = function Vote() {
    let [supNum, setSupNum] = useState(10),
        [oppNum, setOppNum] = useState(5);
    const change = type => {
        if (type === 'sup') {
            setSupNum(supNum + 1);
            return;
        }
        setOppNum(oppNum + 1);
    };
    //使用ThemeContext提供的Provider方法向上下文中存储信息
    // 通过value传递数据
    // 当祖先组件更新,render重新执行，会把最新的值再次存储到上下文对象中
    return <ThemeContext.Provider
        value={{
            supNum,
            oppNum,
            change
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
};
export default Vote;