const { createProxyMiddleware } = require('http-proxy-middleware');
const API_HOST = process.env.API_HOST || 'https://api.alfa.directual.com'
// !Important, set APP_ID in , env file or set you APP ID below
const APP_ID = process.env.APP_ID
module.exports = function(app) {
  app.use(
    '/good/api',
    createProxyMiddleware({
      target: API_HOST,
      changeOrigin: true,
      pathRewrite(pathReq, req) {
        const pathname = pathReq.split('?')[0];
        let url = `${pathname}?appID=${APP_ID}`;
        url = Object
          .entries(req.query)
          .reduce(
            (newUrl, [key, value]) => `${newUrl}&${key}=${encodeURI(value)}`,
            url,
          );
        return url;
      }
    })
  );
};