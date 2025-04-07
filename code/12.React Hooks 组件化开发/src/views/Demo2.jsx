import React, { useState } from "react";
import { Button } from 'antd';
import './Demo.less';

/*
 函数组件的每次渲染都是完整的函数重新执行（整个函数体重新执行，包括所有局部变量和函数），产生一个全新的“私有上下文”!
    - 新的作用域链
    - 新的局部变量
    - 新的函数闭包
    + 每一次执行DEMO函数，也会把useState重新执行，但是：
     + 执行useState，只有第一次，设置的初始值会生效，其余以后再执行，获取的状态都是最新的状态值「而不是初始值」
     + 返回的修改状态的方法，每一次都是返回一个新的



 */
const Demo = function Demo() {
    let [num, setNum] = useState(0);

    const handle = () => {
        setNum(100);
        setTimeout(() => {
            console.log(num); // 0 因为函数组件的每次渲染都是完整的函数重新执行！！
        }, 2000);
    };
    return <div className="demo">
        <span className="num">{num}</span>
        <Button type="primary"
            size="small"
            onClick={handle}>
            新增
        </Button>
    </div>;
};

export default Demo;
/*
useState函数的实现原理(简述)  一定有一个存储上个函数状态值的地方！！
var _state;
function useState(initialValue) {
    if (typeof _state === "undefined") {
        if(typeof initialValue==="function"){
            _state = initialValue();
        }else{
            _state = initialValue
        }
    };
    var setState = function setState(value) {
        if(Object.is(_state,value)) return;
        if(typeof value==="function"){
            _state = value(_state);
        }else{
            _state = value;
        }
        // 通知视图更新
    };
    return [_state, setState];
}
eg:使用上述函数
let [num1, setNum] = useState(0); //num1=0  setNum=setState 0x001(虽然都是setState，但是是不同的函数)
setNum(100); //=>_state=100 通知视图更新
// ---
let [num2, setNum] = useState(0); //num2=100  setNum=setState 0x002
*/