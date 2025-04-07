import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.less'
/* 使用ANTD组件库,自带按需导入 */
import { ConfigProvider } from 'antd';//ConfigProvider 是一个全局配置组件，用于统一管理子组件的国际化、主题、尺寸等全局设置。
import zhCN from 'antd/locale/zh_CN';//中文语言包

/* 
  Demo0 类组件和函数组件
  Demo1 使用useState在函数组件实现类组件功能
  Demo2 函数组件的渲染机制
  Vote  多个状态，useState执行的俩种方法
  Demo3 useState批量更新和flushSync刷新渲染队列
  Demo4 useState性能优化机制
  Demo5 使useState对初始值的操作，进行惰性化处理
  Demo6 useEffect基本使用
  Demo7 useEffect使用细节，规则（实际使用的）
  Demo8 useEffect和useLayoutEffect的区别 .md文件解释的更清楚！
  Demo9 useRef 为什么在函数组件中使用useRef？
  Demo10 useImperativeHandle获取子组件实例
*/
import Demo from './views/Demo10';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN}>
    <Demo />
    {/* <Demo x={10} y={20}/> */}
  </ConfigProvider>
);
