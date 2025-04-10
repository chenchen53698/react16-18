/* 把各个版块的action合并为一个action即可 */
// 在Rudex中比较鸡肋。。 在react-redux中才很有用
import voteAction from "./voteAction";
import personalAction from "./personalAction";

const action = {
    vote: voteAction,
    personal: personalAction
};
export default action;