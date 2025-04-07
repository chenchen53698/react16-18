import React, { useContext, useMemo } from 'react';
import ThemeContext from '@/ThemeContext';
const VoteMain = function VoteMain() {
    // 获取上下文中的信息
    // useContext是 React Hooks 中用于跨组件层级传递数据的核心 API
    let { supNum, oppNum } = useContext(ThemeContext);
    let ratio = useMemo(() => {
        let total = supNum + oppNum;
        return total > 0 ? (supNum / total * 100).toFixed(2) + '%' : '--';
    }, [supNum, oppNum]);
    return <div className="main">
        <p>支持人数：{supNum}人</p>
        <p>反对人数：{oppNum}人</p>
        <p>支持比率：{ratio}</p>
    </div>;
};

//第一种写法
// const VoteMain = function VoteMain() {
//     return <ThemeContext.Consumer>
//         {context => {
//             let { supNum, oppNum } = context;
//             let total = supNum + oppNum;
//             let ratio = total > 0 ? (supNum / total * 100).toFixed(2) + '%' : '--';
//             return <div className="main">
//                 <p>支持人数：{supNum}人</p>
//                 <p>反对人数：{oppNum}人</p>
//                 <p>支持比率：{ratio}</p>
//             </div>;
//         }}
//     </ThemeContext.Consumer>;
// };
export default VoteMain;