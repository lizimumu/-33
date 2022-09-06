// 所有的postcss插件都是一个函数
const pxToRem = require('postcss-pxtorem')
module.exports = {
  plugins: [
    // 插件
    pxToRem({
      // 根节点字体大小
      rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 75),
      //   console.log(module);
      //   return 37.5
      // },
      propList: ['*'] /* 所有属性转化为rem */
    })
  ]
}
