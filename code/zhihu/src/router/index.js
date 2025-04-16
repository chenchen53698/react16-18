import React, { Suspense, useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import routes from "./routes";
import { Mask, DotLoading, Toast } from 'antd-mobile';
import store from '../store';
import action from "../store/action";

/* 统一路由配置 */
const isCheckLogin = (path) => {
    //store.getState() 是 Redux 或其他状态管理库（如 React-Redux、Zustand 等）中用于获取当前应用状态快照的方法。
    let { base: { info } } = store.getState(),
        checkList = ['/personal', '/store', '/update'];
        // console.log(store.getState())
    return !info && checkList.includes(path);
};
const Element = function Element(props) {
    let { component: Component, meta, path } = props;
    let isShow = !isCheckLogin(path);
    let [_, setRandom] = useState(0);

    // 登录态校验
    useEffect(() => {
        if (isShow) return;
        (async () => {
            let infoAction = await action.base.queryUserInfoAsync();
            let info = infoAction.info;
            if (!info) {
                // 如果获取后还是不存在(token失效):没有登录
                Toast.show({
                    icon: 'fail',
                    content: '请先登录'
                });
                // 跳转到登录页
                // replace: true   首页->personal需要先浏览器跳再调用router->Element（浏览器中已经记录了只是代码没有渲染而已）
                navigate({
                    pathname: '/login',
                    search: `?to=${path}`
                }, { replace: true });
                return;
            }
            // 如果获取到了信息,说明是登录的,我们派发任务把信息存储到容器中
            store.dispatch(infoAction);
            setRandom(+new Date());
        })();
    });

    // 修改页面的TITLE
    let { title = "知乎日报-WebApp" } = meta || {};
    document.title = title;

    // 获取路由信息,基于属性传递给组件
    const navigate = useNavigate(),
        location = useLocation(),
        params = useParams(),
        [usp] = useSearchParams();

    return <>
    {/* 使用isShow对登录状态做处理,不满足条件的就不渲染组件了（优化项） */}
        {isShow ?
            <Component navigate={navigate}
                location={location}
                params={params}
                usp={usp} /> :
            <Mask visible={true}>
                <DotLoading color="white" />
            </Mask>
        }
    </>;
};
export default function RouterView() {
    // Suspense 异步配合路由懒加载 允许组件"等待"某些操作完成，在等待期间显示备用内容（fallback）。
    return <Suspense fallback={
        <Mask visible={true}>
            <DotLoading color="white" />
        </Mask>
    }>
        <Routes>
            {routes.map(item => {
                let { name, path } = item;
                // <Route path="/a/a1" element={<A1 />} /> 固定语法
                return <Route key={name}
                    path={path}
                    element={
                        <Element {...item} />
                    } />;
            })}
        </Routes>
    </Suspense>;
};