const MergeJsonWebpackPlugin = require("merge-jsons-webpack-plugin");

// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      new MergeJsonWebpackPlugin({
        "encoding": "ascii",
        "output": {
          "groupBy": [
            {
              "pattern": "public/data/events/*.json",
              "fileName": "data/events.json"
            }
          ]
        },
        "prefixFileName": true
      })
    ]
  }
};