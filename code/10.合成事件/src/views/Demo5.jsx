import React from "react";
/*
移动端的click存在300ms延迟
  原因:移动端的click是单击事件,PC端是点击事件
    单击事件:第一次点击后，浏览器会等待300ms,看是否有第二次点击事件发生
*/
//模拟移动端的touch事件 解决300ms延迟
class Demo extends React.Component {

  // 手指按下：记录手指的起始坐标
  touchstart = (ev) => {
    let finger = ev.changedTouches[0]; //记录了操作手指的相关信息
    this.touch = {
      startX: finger.pageX,
      startY: finger.pageY,
      isMove: false
    };
  };
  // 手指移动：记录手指偏移值，和误差值做对比，分析出是否发生移动
  touchmove = (ev) => {
    let finger = ev.changedTouches[0],
      { startX, startY } = this.touch;
    let changeX = finger.pageX - startX,
      changeY = finger.pageY - startY;
    if (Math.abs(changeX) > 10 || Math.abs(changeY) > 10) {
      this.touch.isMove = true;
    }
  };
  // 手指离开：根据isMove判断是否是点击
  touchend = () => {
    let { isMove } = this.touch;
    if (isMove) return;
    // 说明触发了点击操作
    console.log('点击了按钮');
  };

  render() {
    return <div>
      <button onTouchStart={this.touchstart}
        onTouchMove={this.touchmove}
        onTouchEnd={this.touchend}>
        提交
      </button>
    </div>;
  }
}

export default Demo;