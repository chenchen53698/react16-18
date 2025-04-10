import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { bindActionCreators } from 'redux';
const ThemeContext = createContext();

/* Provider:把传递进来的store(文件夹store中的东西，我们写的值，方法还有redux什么的...)放在根组件的上下文中 */
export function Provider(props) {
    let { store, children } = props;
    //这就是redux使用上下文ThemeContext 和 插槽
    return <ThemeContext.Provider
        value={{
            store
        }}>
        {children}
    </ThemeContext.Provider>;
};

/* connect:获取上下文中的store，然后把公共状态、要派发的方法等，都基于属性传递给需要渲染的组件；把让组件更新的方法放在redux事件池中！ */
/*
使用高阶组件和柯里化  eg:connect(mapStateToProps,mapDispatchToProps)(我们要渲染的组件) 
一层一层处理 ！！！
    1.执行connect(mapStateToProps,mapDispatchToProps)函数，先处理mapStateToProps, mapDispatchToProps默认值问题，
    2. 返回一个函数currying(Component) 我们传入的组件 拿到它！ 再进一步处理！
    3. 返回function HOC(props)  props 这个是父子组件的传参
        使用react中的createContext，获取先前传入的store，从中拿到redux中的getState（获取值）, dispatch(派发), subscribe（更新值绑定的方法）
        重复rudex的一些操作
        把mapStateToProps/mapDispatchToProps，把执行的返回值，作为属性传递给组件！！
    4.最后返回一个组件--我们传入的 给它身上加上属性
*/
export function connect(mapStateToProps, mapDispatchToProps) {
    // 处理默认值
    if (!mapStateToProps) {
        mapStateToProps = () => {
            // 不写则:什么都不给组件传递
            return {};
        };
    }
    if (!mapDispatchToProps) {
        mapDispatchToProps = (dispatch) => {
            // 不写则:把dispatch方法传递给组件
            return {
                dispatch
            };
        };
    }
    
    return function currying(Component) {
        // Component:最终要渲染的组件「Vote」
        // HOC:我们最后基于export default导出的组件
        return function HOC(props) {
            // 我们需要获取上下文中的store
            let { store } = useContext(ThemeContext),
                { getState, dispatch, subscribe } = store;

            // 向事件池中加入让组件更新的办法
            let [, forceUpdate] = useState(0);
            useEffect(() => {
                let unsubscribe = subscribe(() => {
                    forceUpdate(+new Date());
                });
                return () => {
                    // 组件释放的时候执行：把放在事件池中的函数移除掉
                    unsubscribe();
                };
            }, []);

            // 把mapStateToProps/mapDispatchToProps，把执行的返回值，作为属性传递给组件！！
            let state = getState(),
                nextState = useMemo(() => {
                    return mapStateToProps(state);
                }, [state]);

            let dispatchProps = {};
            if (typeof mapDispatchToProps === "function") {
                // 是函数直接执行即可
                dispatchProps = mapDispatchToProps(dispatch);
            } else {
                // 是actionCreator对象,需要经过bindActionCreators处理
                dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
            }
            console.log(props,nextState,dispatchProps)
            return <Component
                {...props}
                {...nextState}
                {...dispatchProps}
            />;
        };
    };
};