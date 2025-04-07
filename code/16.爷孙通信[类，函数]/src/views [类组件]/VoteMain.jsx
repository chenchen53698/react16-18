import React from 'react';
import ThemeContext from '@/ThemeContext';
class VoteMain extends React.Component {
    // 获取上下文信息
    static contextType = ThemeContext;
    render() {
        // 通过this.context获取上下文对象
        let { supNum, oppNum } = this.context;
        let total = supNum + oppNum,
            ratio = '--';
        if (total > 0) ratio = (supNum / total * 100).toFixed(2) + '%';
        return <div className="main">
            <p>支持人数：{supNum}人</p>
            <p>反对人数：{oppNum}人</p>
            <p>支持比率：{ratio}</p>
        </div>;
    }
};
export default VoteMain;