/*
  误区:
  import {Component} from "react";
  它并不是解构赋值了react,因为react源码对外暴露了Component方法,而是解构这个方法

  创建类组件
  创建一个构造函数(类),要求必须继承React.Component/PureComponent这个类
  我们习惯于使用ES6中的class创建类「因为方便」,ES5需要混合继承不如class语法糖
  必须给当前类设置一个render的方法「放在其原型上」：在render方法中，返回需要渲染的视图

  基于 extends 实现继承
  1.首先基于 call 继承：React.Component.call(this)（this 指向 Parent 类的实例 p）。
  Component 构造函数会给实例 p 设置四个私有属性：props、context、refs、updater。

  2.原型继承Parent.prototype.__proto__ === React.Component.prototype。
  实例 -> Parent.prototype -> React.Component.prototype -> Object.prototype。
  因此，实例不仅拥有 Parent.prototype 的方法，还继承了 React.Component.prototype 的方法（如 isReactComponent、setState、forceUpdate）。
  
  3.只要自定义了 constructor，必须首先调用 super()
  

*/

import React from "react";

class Parent extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  x = 100;
  getX() {
  }
}

let p = new Parent();
console.log(p);