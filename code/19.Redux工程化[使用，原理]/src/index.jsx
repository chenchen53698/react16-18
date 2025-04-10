import React from 'react';
import ReactDOM from 'react-dom/client';
import Vote from './views/Vote';
/* 使用ANTD组件库 */
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import './index.less';
/* 原生 Redux */
import store from './store';
import ThemeContext from './ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
        <ThemeContext.Provider
            value={{
                store
            }}>
            <Vote />
        </ThemeContext.Provider>
    </ConfigProvider>
);

/*
原生Redux的使用:
    1.创建全局公共容器store用来存储公共信息
        使用createStore(reducer)方法创建store,reducer是一个函数,接受2个参数:
            1.state:存储STORE容器中的公共状态「最开始没有的时候，赋值初始状态值initial」
            2.action:每一次基于dispatch派发的时候，传递进来的行为对象「要求必须具备type属性，存储派发的行为标识」
    2.创建一个上下文ThemeContext用来传递store
    3.在需要使用store的组件中,使用useContext(ThemeContext)获取store，并使用store.getState()获取信息
    4.在需要更新组件的地方，使用store.subscribe(() => {函数)来更新组件
        往store事件池中添加个订阅函数(这个函数必须可以让组件更新！！！),
        当store中的数据发生改变，会自动调用这个函数，让组件重新渲染
    5.在需要修改store的组件中,使用store.dispatch({type: 'VOTE_SUP'})来派发任务，通知reducer修改store中的信息
*/