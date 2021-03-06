const path = require('path')
const config = require('./src/config')

const resolve = dir => {
  return path.join(__dirname, dir)
}

let BASE_URL = ''
switch (process.env.NODE_ENV) {
  case 'development':
    BASE_URL = config.publicPath.dev  //这里是本地的请求url
    break
  case 'production':
    BASE_URL = config.publicPath.pro   //生产环境url
    break
}

module.exports = {
  publicPath: BASE_URL,
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src/')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
      .set('vendor', resolve('src/vendor'))
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#906b41',
          'border-radius-base': '2px',
        },
        javascriptEnabled: true
      }
    }
  },
  // 打包时不生成.map文件
  productionSourceMap: false
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  // devServer: {
  //   proxy: 'localhost:3000'
  // }
}
