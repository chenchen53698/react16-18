import React from "react";
/*  
    循环事件绑定：
        下述代码在Js或者vue中是给每一个span绑定了一个点击事件
            这样是性能浪费的，不好的
        但是在react中，下述代码是给每一个span的属性上绑定了一个方法(并不是直接绑定事件)
            基于react的合成事件机制(就是事件委托，事件其实绑定在了root上)
*/
class Demo extends React.Component {
    state = {
        arr: [{
            id: 1,
            title: '新闻'
        }, {
            id: 2,
            title: '体育'
        }, {
            id: 3,
            title: '电影'
        }]
    };

    handle = (item) => {
        // item:点击这一项的数据
        console.log('我点击的是：' + item.title);
    };

    render() {
        let { arr } = this.state;
        return <div>
            {arr.map(item => {
                let { id, title } = item;
                return <span key={id}
                    style={{
                        padding: '5px 15px',
                        marginRight: 10,
                        border: '1px solid #DDD',
                        cursor: 'pointer'
                    }}
                    onClick={this.handle.bind(this, item)}>
                    {title}
                </span>;
            })}
        </div>;
    }
}

export default Demo;