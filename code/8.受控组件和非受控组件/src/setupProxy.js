const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        createProxyMiddleware("/jian", {
            target: "https://www.jianshu.com/asimov",
            changeOrigin: true,//修改请求头中的 Host 为目标地址
            ws: true,//启用 WebSocket 代理（如需转发 WebSocket 请求）
            pathRewrite: { "^/jian": "" }
        })
    );

    app.use(
        createProxyMiddleware("/zhi", {
            target: "https://news-at.zhihu.com/api/4",
            changeOrigin: true,
            ws: true,
            pathRewrite: { "^/zhi": "" }
        })
    );
};