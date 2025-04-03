import React from "react";
/* 
 PureComponent和Component的区别：
   PureComponent会给类组件默认加一个shouldComponentUpdate周期函数
     + 在此周期函数中，它对新老的属性/状态 会做一个浅比较
     + 如果经过浅比较，发现属性和状态并没有改变，则返回false「也就是不继续更新组建」；有变化才会去更新！！
*/

//继承PureComponent
class DemoPC extends React.PureComponent {
    state = {
        arr: [10, 20, 30]
    };
    render() {
        let { arr } = this.state;
        return <div>
            {arr.map((item, index) => {
                return <span key={index} style={{
                    display: 'inline-block',
                    width: 100,
                    height: 100,
                    background: 'pink',
                    marginRight: 10
                }}>
                    {item}
                </span>;
            })}
            <br />
            <button onClick={() => {
                arr.push(40);
                console.log(this.state.arr); //[10,20,30,40]
                /* 
                    this.setState({ arr:arr }); //最新修改的转态地址，还是0x001「状态地址没有改」 
                    在继承PureComponent中是无法更新的:
                    相当于让this.state.arr 和 arr 做比较在shouldComponentUpdate周期函数中
                    ===   他们俩个是引用类型，引用同一个地址,相同就不更新了
                */
                this.setState({
                    arr: [...arr] //我们是让arr状态值改为一个新的数组「堆地址」
                })
            }}>新增SPAN</button>
        </div >;
    }
}

// 检测是否为对象
const isObject = function isObject(obj) {
    return obj !== null && /^(object|function)$/.test(typeof obj);
};
// 对象浅比较的方法
const shallowEqual = function shallowEqual(objA, objB) {
    if (!isObject(objA) || !isObject(objB)) return false;
    // 如果两个对象是同一个引用地址，直接返回true
    if (objA === objB) return true;
    // 先比较成员的数量,比较的是对象的成员数量，不是数组的长度！
    let keysA = Reflect.ownKeys(objA),
        keysB = Reflect.ownKeys(objB);
    if (keysA.length !== keysB.length) return false;
    // 数量一致，再逐一比较内部的成员「只比较第一级：浅比较」
    for (let i = 0; i < keysA.length; i++) {
        let key = keysA[i];
        console.log('key',keysA,keysA[i],objA[key])
        // 如果一个对象中有这个成员，一个对象中没有；或者，都有这个成员，但是成员值不一样；都应该被判定为不相同！！
        //  Object.is是 JavaScript 中用于严格比较两个值是否相等的方法,就是判断是否同一个引用地址
        if (!objB.hasOwnProperty(key) || !Object.is(objA[key], objB[key])) {
            return false;
        }
    }
    // 以上都处理完，发现没有不相同的成员，则认为两个对象是相等的
    return true;
};
//继承Component 模拟继承PureComponent
class DemoCo extends React.Component {
    state = {
        arr: [10, 20, 30]
    };

    render() {
        let { arr } = this.state;
        return <div>
            {arr.map((item, index) => {
                return <span key={index} style={{
                    display: 'inline-block',
                    width: 100,
                    height: 100,
                    background: 'pink',
                    marginRight: 10
                }}>
                    {item}
                </span>;
            })}
            <br />
            <button onClick={() => {
                arr.push(40);
                // this.forceUpdate(); //跳过默认加的shouldComponentUpdate，直接更新
                this.setState({
                    arr: [...arr] //我们是让arr状态值改为一个新的数组「堆地址」
                })
            }}>新增SPAN</button>
        </div >;
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { props, state } = this;
        console.log(state, nextState)
        // props/state：修改之前的属性状态
        // nextProps/nextState：将要修改的属性状态
        return !shallowEqual(props, nextProps) || !shallowEqual(state, nextState);
    }
}
export {DemoPC,DemoCo};


