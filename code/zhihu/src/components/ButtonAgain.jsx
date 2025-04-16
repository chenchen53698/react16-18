import React, { useState } from "react";
import { Button } from 'antd-mobile';

const ButtonAgain = function ButtonAgain(props) {
    /* props中包含了调用<Button>组件时候的属性 */
    let options = { ...props };
    let { children, onClick: handle } = options;//onClick 重命名为 handle
    delete options.children;

    /* 状态 */
    let [loading, setLoading] = useState(false);
    const clickHandle = async () => {
        setLoading(true);
        try {
            await handle();
        } catch (_) { }
        setLoading(false);
    };
    // 没有点击事件就不加防抖,有就加
    if (handle) {
        options.onClick = clickHandle;
    }

    return <Button {...options} loading={loading}>
        {children}
    </Button>;
};
export default ButtonAgain;