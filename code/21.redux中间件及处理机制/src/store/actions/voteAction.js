import * as TYPES from '../action-types';

// 延迟函数：返回promise实例，在指定的时间后，才会让实例为成功
const delay = (interval = 1000) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
};

const voteAction = {
    // redux-thunk中间件的语法
    //1.先执行一次返回一个函数,内置给函数设置个type属性,属性值不会和reducer中的逻辑匹配
    //2.把返回的函数立即执行，把派发的方法dispatch传递给函数
    support() {
        return async (dispatch) => {
            await delay();
            dispatch({
                type: TYPES.VOTE_SUP
            });
        };
    },
    // redux-promise中间件
    async oppose() {
        await delay(2000);
        return {
            type: TYPES.VOTE_OPP
        };
    }
};
export default voteAction;