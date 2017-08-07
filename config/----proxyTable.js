module.exports = {
    '^/**': {
      target: 'http://127.0.0.1:8080',
      changeOrigin:
        true,
      // pathRewrite: {
      //     '^/api': ''
      // },
      filter:function (pathName, req) {
          if (pathName === "/" || pathName === "/app.js" || pathName === "/static/img/logo.png" || pathName === "/__webpack_hmr" || pathName === "/favicon.ico" || pathName === "/static/img/logo_bg.png") {
            console.log ("无需代理的url" + req.url);
            return "";
          } else {
            console.log ("需要代理的url" + req.url);
            return req.url;
          }
      }
    }
  };

