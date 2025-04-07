import React, { useState, useEffect, useRef } from "react";
import { Button } from 'antd';
import './Demo.less';

/*
    在函数组件中获取DOM元素有3种方法:
    1.基于“ref={函数}”的方式，可以把创建的DOM元素(或者子组件的实例)赋值给box变量「不推荐」---搜索方法一
    2.基于 React.createRef 创建ref对象来获取想要的内容   ---搜索方法二
    3.基于 useRef Hook函数 创建一个ref对象来获取想要的内容   ---搜索方法三

    为什么在函数组件中使用useRef？而不是React.createRef这种类和函数都通用的方法？
        useRef在每一次组件更新的时候（函数重新执行），再次执行useRef方法的时候，不会创建新的REF对象了，获取到的还是第一次创建的那个REF对象！！
        React.createRef在每一次组件更新的时候，都会创建一个全新的REF对象出来，比较浪费性能！！
*/
let prev1,
    prev2;
const Demo = function Demo() {
    let [num, setNum] = useState(0);

    let box1 = useRef(null),
        box2 = React.createRef();
    if (!prev1) {
        // 第一次DEMO执行，把第一次创建的REF对象赋值给变量
        prev1 = box1;
        prev2 = box2;
    } else {
        // 第二次DEMO执行，我们验证一下，新创建的REF对象，和之前第一次创建的REF对象，是否一致？
        console.log(prev1 === box1); //true  
        console.log(prev2 === box2); //false 
        // 总结：在类组件中，创建REF对象，我们基于 React.createRef 处理；但是在函数组件中，为了保证性能，我们应该使用专属的 useRef 处理！！
    }

    useEffect(() => {
        console.log(box1.current);
        console.log(box2.current);
    });

    return <div className="demo">
        <span className="num" ref={box1}>{num}</span>
        <span className="num" ref={box2}>哈哈哈</span>
        <Button type="primary" size="small"
            onClick={() => {
                setNum(num + 1);
            }}>
            新增
        </Button>
    </div>;
};

/* 
方法三
const Demo = function Demo() {
    let [num, setNum] = useState(0);
    let box = useRef(null);
    useEffect(() => {
        console.log(box.current);
    }, []);

    return <div className="demo">
        <span className="num" ref={box}>{num}</span>
        <Button type="primary" size="small"
            onClick={() => {
                setNum(num + 1);
            }}>
            新增
        </Button>
    </div>;
}; */



/* 
方法二
const Demo = function Demo() {
    let [num, setNum] = useState(0);
    let box;
    useEffect(() => {
        console.log(box);
    }, []);

    return <div className="demo">
        <span className="num" ref={x => box = x}>{num}</span>
        <Button type="primary" size="small"
            onClick={() => {
                setNum(num + 1);
            }}>
            新增
        </Button>
    </div>;
}; */

/* 
方法一
const Demo = function Demo() {
    let [num, setNum] = useState(0);

    /!*  *!/
    let box = React.createRef();
    useEffect(() => {
        console.log(box.current);
    }, []);

    return <div className="demo">
        <span className="num" ref={box}>{num}</span>
        <Button type="primary" size="small"
            onClick={() => {
                setNum(num + 1);
            }}>
            新增
        </Button>
    </div>;
}; */

export default Demo;