const combineReducers = function combineReducers(reducers) {
    // reducers是一个对象，以键值对存储了：模块名 & 每个模块的reducer
    let reducerskeys = Reflect.ownKeys(reducers);
    // reducerskeys:['vote','personal']
    /* 
    返回一个合并的reducer 
      + 每一次dispatch派发，都是把这个reducer执行
      + state就是redux容器中的公共状态
      + action就是派发时候传递进来的行为对象
    */
    return function reducer(state = {}, action) {
        let nextState = {};
        // 把reducers中的每一个小的reducer（每个模块的reducer）执行；把对应模块的状态/action行为对象传递进来；返回的值替换当前模块下的状态！！
        reducerskeys.forEach(key => {
            // key:'vote'/'personal'模块名  reducer:每个模块的reducer这就是个函数！
            let reducer = reducers[key];
            //第一次的时候(页面初始化),你的state[key]就是undefined，详见myreduxs.js,它第一次执行会自己派发一个任务获取状态值
            //就是要让你执行子js文件(这是个函数)返回值是子文件的默认的值,放入nextState[key]中
            nextState[key] = reducer(state[key], action);
            console.log(reducer,state[key],action)
        });
        console.log(nextState)
        return nextState;
    };
};
export default combineReducers;

/* store.dispatch({
    type: TYPES.VOTE_SUP
}); */