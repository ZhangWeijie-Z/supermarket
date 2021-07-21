module.exports = {
  Plugin: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      //适口宽度，对应设计稿宽度
      viewportWidth: 375,
      //视口高度，对应设计稿高度 也可也不配置
      viewportHeight: 667,
      //指定‘px’转换为视口单位的小数位数
      unitPrecision: 5,
      //指定需要转换成视口的单位
      viewportUnit: 'vw',
      //指定不需要转换的类
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'],
      //小于等于‘1px’不转换为视口宽度
      minPixelValue: 1,
      //允许在媒体中查找替换‘px’
      mediaQuery: false,
      exclude: [/TabBar/]
    }
  }
}
