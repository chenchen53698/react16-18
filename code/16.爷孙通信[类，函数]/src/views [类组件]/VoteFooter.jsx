import React from 'react';
import ThemeContext from '@/ThemeContext';
import { Button } from 'antd';
class VoteFooter extends React.Component {
    render() {
        //获取上下文信息的第二种方法
        return <ThemeContext.Consumer>
            {context => {
                let { change } = context;
                return <div className="footer">
                    <Button type="primary" onClick={change.bind(null, 'sup')}>
                        支持
                    </Button>
                    <Button type="primary" onClick={change.bind(null, 'opp')}>
                        反对
                    </Button>
                </div>;
            }}
        </ThemeContext.Consumer>;
    }
};
export default VoteFooter;