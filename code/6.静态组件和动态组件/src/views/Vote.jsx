
import React from "react";
import PropTypes from 'prop-types';

class Vote extends React.Component {
  /* 属性规则校验 */
  static defaultProps = {
    num: 0
  };
  static propTypes = {
    title: PropTypes.string.isRequired,
    num: PropTypes.number
  };

  /* 初始化状态 */
  state = {
    supNum: 20,
    oppNum: 10
  };

  render() {
    console.log('render：渲染');
    let { title } = this.props,
      { supNum, oppNum } = this.state;

    return <div className="vote-box">
      <div className="header">
        <h2 className="title">{title}</h2>
        <span>{supNum + oppNum}人</span>
      </div>
      <div className="main">
        <p>支持人数：{supNum}人</p>
        <p>反对人数：{oppNum}人</p>
      </div>
      <div className="footer">
        <button onClick={() => {
          this.setState({
            supNum: supNum + 1
          });
        }}>支持</button>

        <button onClick={() => {
          this.state.oppNum++;
          this.forceUpdate();
        }}>反对</button>
      </div>
    </div>;
  }
  // 组件第一次渲染之前
  UNSAFE_componentWillMount() {
    console.log('componentWillMount：第一次渲染之前');
  }
  //第一次渲染完毕
  componentDidMount() {
    console.log('componentDidMount：第一次渲染完毕');
  }

  // 是否允许更新
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate:', this.props, nextProps);
    return true;
  }
  // 组件即将更新
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate:', this.props, nextProps);
  }
  // 组件更新完毕
  componentDidUpdate() {
    console.log('componentDidUpdate:组件更新完毕');
  }
  // 组件接收新的props
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps:', this.props, nextProps);
  }
  // 组件销毁之前
  componentWillUnmount() {
    console.log('componentWillUnmount:组件销毁之前');
  }
}
export default Vote;
