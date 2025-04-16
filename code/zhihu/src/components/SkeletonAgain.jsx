import React from "react";
import { Skeleton } from 'antd-mobile';
import './SkeletonAgain.less';
// 对ui组件库中骨架的二次封装
const SkeletonAgain = function SkeletonAgain() {
    return <div className="skeleton-again-box">
        <Skeleton.Title animated />
        <Skeleton.Paragraph lineCount={5} animated />
    </div>;
};
export default SkeletonAgain;