/*
    在 React 中，插槽（Slots） 是一种组件化设计模式，用于在父组件中动态注入子组件的内容。
    虽然 React 没有直接使用“插槽”这一术语，但通过 props.children 或 props 传递 JSX 可以实现类似功能。
    以下是 React 中实现插槽的几种核心方法：
*/

// 默认插槽
const Slot1 = function Slot1(props) {
    let { children } = props;
    return <div>
        {children}
    </div>;
};
// 具名插槽
const Slot2 = function Slot2({ header, footer, children }) {
    return (
        <div>
            <div>{header}</div>
            <div>{children}</div>
            <div>{footer}</div>
        </div>
    );
};
//作用域插槽
const Slot3 = ({ data, renderItem }) => {
    return <ul>{data.map((item) => renderItem(item))}</ul>;
};
export { Slot1, Slot2, Slot3 };