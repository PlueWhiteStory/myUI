// see http://vuejs-templates.github.io/webpack for documentation.
var path = require ('path');
// var url = require ("url");
//引入服务代理
try {
  var proxy = require ("./proxyTable");
}
catch (err) {

}

module.exports = {
  build: {
    env: require ('./prod.env'),
    index: path.resolve (__dirname, '../dist/index.html'),//index.html (注入资源url)将被生成的地方
    assetsRoot: path.resolve (__dirname, '../dist'),//指向包含应用程序的所有静态资源的根目录
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require ('./dev.env'),
    port: 8088,//指定监听的服务端口
    autoOpenBrowser: false,//是否自动打开浏览器
    assetsSubDirectory: 'static',
    clientLogLevel: "info",
    assetsPublicPath: '/',
    noInfo: false,//每次保存之后，那些显示的webpack包（bundle信息）是否显示
    progress: true,//将进度输出在控制台
    proxyTable: proxy || {}
  },
  // CSS Sourcemaps off by default because relative paths are "buggy"
  // with this option, according to the CSS-Loader README
  // (https://github.com/webpack/css-loader#sourcemaps)
  // In our experience, they generally work as expected,
  // just be aware of this issue when enabling this option.
  cssSourceMap: false
}
