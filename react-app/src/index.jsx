import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.less'
import { createElement, render } from './jsxHandle';

//获取页面中#root的容器，作为“根”容器
const root = ReactDOM.createRoot(document.getElementById('root'));

let styObj = {
      color: 'red',
      fontSize: '16px'
}
let x = 10;
let y = 20;

// root.render(
//       <div className='container'>
//             <h2 className='title' style={styObj}>React渲染机制</h2>
//             <div className='box'>
//                   <span>{x}</span>
//                   <span>{y}</span>
//             </div>
//       </div>
// );

render(
      createElement(
      "div",
      { className: "container"},
      createElement(
            "h2",
            { className: "title", style: styObj },
            "\u73E0\u5CF0\u57F9\u8BAD"
      ),
      createElement(
            "div",
            { className: "box" },
            createElement("span", null, x),
            createElement("span", null, y)
      )
), document.getElementById('root'))

console.log(
      React.createElement(
            React.Fragment,
            null,
            React.createElement(
                  "h2",
                  { className: "title", style: styObj },
                  "\u73E0\u5CF0\u57F9\u8BAD"
            ),
            React.createElement(
                  "div",
                  { className: "box" },
                  React.createElement("span", null, x),
                  React.createElement("span", null, y)
            )
      )
)

console.log(
      createElement(
            React.Fragment,
            null,
            createElement(
                  "h2",
                  { className: "title", style: styObj },
                  "\u73E0\u5CF0\u57F9\u8BAD"
            ),
            createElement(
                  "div",
                  { className: "box" },
                  createElement("span", null, x),
                  createElement("span", null, y)
            )
      )
)
