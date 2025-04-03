//设置props默认值
//设置props规则
import PropTypes from 'prop-types';

const DemoOne = function DemoOne(props) {
    console.log('查看传递过来的参数', props)
    console.log('查看props是否被冻结', Object.isFrozen(props))
    let { title, x, y,z } = props;
    // let z = props.z;
    z = 1000;

    return <div className="demo-box">
        <h2 className="title">{title}</h2>
        使用传来的值/默认值<span>{x}</span>
        <br />
        故意传错的<span>{y}</span>
        <br />
        修改传来的值<span>{z}</span>
    </div>;
};
/* 通过把函数当做对象，设置静态的私有属性方法，来给其设置属性的校验规则 */
DemoOne.defaultProps = {
    x: 0
};
DemoOne.propTypes = {
    title: PropTypes.string.isRequired,
    x: PropTypes.number,
    y: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.bool,
    ])
};

export default DemoOne;