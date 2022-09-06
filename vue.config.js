const { defineConfig } = require('@vue/cli-service')
const { resolve } = require('path')
const cpns = resolve(__dirname, 'src/components')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    devServer: {
      open: true,
      port: 1213,
      host: 'localhost'
    },
    // 路径别名
    resolve: {
      alias: {
        cpns
      }
    }
  }
})
