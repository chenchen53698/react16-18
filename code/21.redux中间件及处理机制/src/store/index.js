import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import reduxLogger from 'redux-logger';//打印日志
//redux-thunk 从 2.4.0 版本开始不再提供默认导出（default export），而是只提供命名导出（named exports）。
import { thunk as reduxThunk } from 'redux-thunk';//提供异步操作
import reduxPromise from 'redux-promise';
//applyMiddleware 用于引入中间间
const store = createStore(
    reducer,
    applyMiddleware(reduxLogger, reduxThunk, reduxPromise)
);
export default store;