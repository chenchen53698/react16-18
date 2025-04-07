import React, { useState, useEffect, useRef, useImperativeHandle } from "react";
import { Button } from 'antd';
import './Demo.less';


// 基于ref获取子组件的实例，这样基于实例，可以调用子组件(类组件)内部，挂载到实例上的东西
class Child1 extends React.Component {
    state = { x: 1000 };
    render() {
        return <div className="child-box">
            {this.state.x}
        </div>;
    }
}

// 基于forwardRef实现ref转发，目的：获取子组件(函数组件)内部的某个元素
const Child2 = React.forwardRef(function Child(props, ref) {
    // console.log(ref); //在DEMO中，调用Child的时候，传递的ref对象「x」
    return <div className="child-box">
        <span ref={ref}>哈哈哈</span>
    </div>;
});

// 函数子组件内部，可以有自己的状态和方法了；如何实现：基于forwardRef实现ref转发的同时，获取函数子组件内部的状态或者方法呢？ => useImperativeHandle
const Child3 = React.forwardRef(function Child(props, ref) {
    let [text, setText] = useState('你好世界');
    const submit = () => { };

    useImperativeHandle(ref, () => {
        // 在这里返回的内容，都可以被父组件的REF对象获取到
        return {
            text,
            submit
        };
    });

    return <div className="child-box">
        <span>哈哈哈</span>
    </div>;
});

const Demo = function Demo() {
    let x = useRef(null);
    let y = useRef(null);
    let z = useRef(null);
    useEffect(() => {
        console.log(x.current);
        console.log(y.current);
        console.log(x.current);
    }, []);

    return <div className="demo">
        <Child1 ref={x} />
        <Child2 ref={y} />
        <Child3 ref={z} />
    </div>;
};

export default Demo;