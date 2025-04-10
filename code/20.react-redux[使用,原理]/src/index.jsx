import React from 'react';
import ReactDOM from 'react-dom/client';
import Vote from './views/Vote';
/* 使用ANTD组件库 */
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import './index.less';
/* React-redux */
import store from './store';
import { Provider } from './myReactRedux';
// import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <Vote />
        </Provider>
    </ConfigProvider>
);

/*
    react-redux使用:
        1.Provider：把store注册到上下文中
        在index.jsx中:
            引入Provider从'react-redux'中，引入store从store中
            使用Provider包裹<Vote />(使用的组件)并传入store(公共仓库)
        2-1.connect：把公共状态和派发任务当做属性传递给属性
        connect(mapStateToProps,mapDispatchToProps)(我们要渲染的组件)
            mapStateToProps：可以获取到redux中的公共状态，把需要的信息作为属性，传递组件即可
            eg:Vote.jsx react-redux和工程化的结合使用
            mapDispatchToProps：把需要派发的任务，当做属性传递给组件
            eg:VoteFooter.jsx react-redux和工程化的结合使用
        2-2.useSelector, useDispatch 使用现代的Hooks API（推荐）
*/