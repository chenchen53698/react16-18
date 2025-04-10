import React from "react";
import { Button } from 'antd';
import action from "../store/actions";
import { connect } from '../myReactRedux';
// import { connect } from 'react-redux';
const VoteFooter = function VoteFooter(props) {
    let { support, oppose } = props;
    return <div className="footer">
        <Button type="primary" onClick={support}>支持</Button>
        <Button type="primary" danger onClick={oppose}>反对</Button>
    </div >;
};
export default connect(
    null,
    action.vote
)(VoteFooter);

/* 
action.vote其实是个对象，但在connect中有把对象变成标准写法的操作
这是标准写法:
    export default connect(
    null,
    dispatch => {
        return {
            support() {
                dispatch(action.vote.support());
            },
            oppose() {
                dispatch(action.vote.oppose());
            }
        };
    }
)(VoteFooter); */

/*
 connect(mapStateToProps,mapDispatchToProps)(我们要渲染的组件)
   2. mapDispatchToProps：把需要派发的任务，当做属性传递给组件
    connect(
        null,
        dispatch=>{
            // dispatch:store.dispatch 派发任务的方法

            // 返回对象中的信息，会作为属性传递给组件
            return {
                ...
            };
        }
    )(Vote);
 */