// vue.config.js
module.exports = {
  configureWebpack: {
    mode: "development",
    devServer: {
      proxy: {
        "/.netlify": {
          target: "http://localhost:9000",
          pathRewrite: { "^/.netlify/functions": "" }
        }
      }
    }
  }
}