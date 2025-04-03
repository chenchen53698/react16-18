import PropTypes from 'prop-types';
import React from 'react';

const DemoOne = function DemoOne(props) {
    let { title, x, children } = props;
    // 要对children的类型做处理
    // 可以基于 React.Children 对象中提供的方法，对props.children做处理：count\forEach\map\toArray...
    // 好处：在这些方法的内部，已经对children的各种形式做了处理
    /* if (!children) {
        children = [];
    } else if (!Array.isArray(children)) {
        children = [children];
    } */
    children = React.Children.toArray(children);
    console.log('children', children)
    let headerSlot = [],
        footerSlot = [],
        defaultSlot = [];

    children.forEach(child => {
        // 传递进来的插槽信息，都是编译为virtualDOM后传递进来的「而不是传递的标签」
        let { slot } = child.props;
        if (slot === 'header') {
            headerSlot.push(child);
        } else if (slot === 'footer') {
            footerSlot.push(child);
        } else {
            defaultSlot.push(child);
        }
    });

    return <div className="demo-box">
        <h2 className="title">{title}</h2>
        {headerSlot}
        <span>{x}</span>
        {defaultSlot}
        <span>{x}</span>
        {footerSlot}
    </div>;
};

//设置props默认值
/* 通过把函数当做对象，设置静态的私有属性方法，来给其设置属性的校验规则 */
DemoOne.defaultProps = {
    x: 0
};
//设置props规则
DemoOne.propTypes = {
    title: PropTypes.string.isRequired,
    x: PropTypes.number,
};

export default DemoOne;