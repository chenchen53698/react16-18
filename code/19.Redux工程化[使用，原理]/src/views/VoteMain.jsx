import React from "react";
import ThemeContext from "../ThemeContext";
//在类组件中获取redux中的store并使用
class VoteMain extends React.Component {
    static contextType = ThemeContext;

    render() {
        const { store } = this.context;
        let { supNum, oppNum } = store.getState().vote;

        return <div className="main">
            <p>支持人数：{supNum}人</p>
            <p>反对人数：{oppNum}人</p>
        </div>;
    }

    componentDidMount() {
        const { store } = this.context;
        store.subscribe(() => {
            this.forceUpdate();//强制更新 
        });
    }
}

export default VoteMain;