module.exports = {
  //基本路径
  publicPath: './',
  configureWebpack: {
    resolve: {
      //配置省略后缀名
      extensions: [],
      //配置别名
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'network': '@/network',
        'utils': '@/utils',
        'views': '@/views'
      }
    }
  },
}
