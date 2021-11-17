// 使用等比适配插件
module.exports = {
  productionSourceMap: false,
  lintOnSave: true,
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require("postcss-px2rem")({
            remUnit: 190 ///设计图宽度/10
          })
        ]
      }
    }
  },
  chainWebpack(config) {
    config.module

      .rule("swf")

      .test(/\.swf$/)

      .use("url-loader")

      .loader("url-loader")

      .options({
        limit: 1024,

        name: "file/[path][name].[hash:7].[ext]"
      })

      .end();
  },
  devServer: {
    host: "0.0.0.0",
    port: "8080",
    open: true,
    proxy: {
      [process.env.VUE_APP_URL_KEY]: {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true,
        pathRewrite: {
          [process.env.VUE_APP_URL_KEY]: ""
        }
      }
    },
    disableHostCheck: true
  }
};
