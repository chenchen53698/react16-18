import React, { useContext, useState, useEffect } from "react";
import './Vote.less';
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';
import ThemeContext from "../ThemeContext";

const Vote = function Vote() {
    const { store } = useContext(ThemeContext);
    // 获取容器中的公共状态
    let { supNum, oppNum } = store.getState();

    /* 
    // 组件第一次渲染完毕后，把让组件更新的方法，放在STORE的事件池中
    let [num, setNum] = useState(0);
    const update = () => {
        console.log(num)
        setNum(num + 1);
    };

    useEffect(() => {
        // let unsubscribe = store.subscribe(让组件更新的方法)
        //   + 把让组件更新的方法放在STORE的事件池中
        //   + 返回的unsubscribe方法执行，可以把刚才放入事件池中的方法移除掉

        //如果不传入num,每次调用的update都是组件创立之初的update也就是值一直是0+1(由于函数组件的更新机制--每次更新都是一个新的函数组件新的闭包...,一直拿的是创建初的num值)，第二次就不更新了
        //传入num后,函数组件更新,就会向store中传入一个新的update方法,此时的num的值是上次更新后的值，就会更新
        //如果不使用return 那么每次更新都会加入一个新update放入更新池(多了就卡了)
        let unsubscribe = store.subscribe(update);
        return () => {
            unsubscribe();
        };
    }, [num]);
     */

    // 函数组件创建之初执行一次，使用useState让组件更新,传入一个随机数规避useState性能优化的机制(浅比较)，促使函数组件重新渲染
    let [_, setNum] = useState(0);
    useEffect(() => {
        store.subscribe(() => {
            setNum(+new Date());
        });
    }, []);

    return <div className="vote-box">
        <div className="header">
            <h2 className="title">React是很棒的前端框架</h2>
            <span className="num">{supNum + oppNum}</span>
        </div>
        <VoteMain />
        <VoteFooter />
    </div>;
};

export default Vote;