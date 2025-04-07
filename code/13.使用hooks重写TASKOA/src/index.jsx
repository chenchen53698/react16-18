import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.less'
/* 使用ANTD组件库,自带按需导入 */
import { ConfigProvider } from 'antd';//ConfigProvider 是一个全局配置组件，用于统一管理子组件的国际化、主题、尺寸等全局设置。
import zhCN from 'antd/locale/zh_CN';//中文语言包

import Task from './views/Task';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN}>
    <Task />
  </ConfigProvider>
);
