
// eslint-disable-next-line no-unused-vars
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin') // Gzip  只用在 开发阶段
const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
const resolve = dir => {
  return path.join(__dirname, dir)
}

const plugins = []

const gzip = new CompressionPlugin({ // 文件开启Gzip，也可以通过服务端(如：nginx)(https://github.com/webpack-contrib/compression-webpack-plugin)
  filename: '[path].gz[query]',
  algorithm: 'gzip',
  test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
  threshold: 8192,
  minRatio: 0.8
})

if (isDev) {
  // plugins.push(new BundleAnalyzerPlugin())
}
if (!isDev) {
  plugins.push(gzip)
}

module.exports = {
  // baseUrl: BASE_URL,
  // 如果不需要使用eslint，把lintOnSave设为false即可
  // lintOnSave: true,

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('views', resolve('src/views')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('common', resolve('src/components'))
      .set('utils', resolve('src/utils'))
      .set('mixins', resolve('src/mixins'))
      .set('store', resolve('src/store'))
    config.module.rules.delete('svg')
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/components/SvgIcon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    if (!isDev) {
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
    }
    // if (process.env.NODE_ENV !== 'development') {
    //   config.plugin('html').tap(opts => {
    //     opts[0].minify.removeComments = false
    //     return opts
    //   })
    // }

    // console.log(config, 'chainWebpack')
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 移除 preload 插件
    config.plugins.delete('preload')
  },

  // 打包时不生成.map文件
  productionSourceMap: isDev,

  devServer: {
    open: false,
    port: 8083,
    proxy: {
      '/api': {
        // target: 'http://dcd.test',
        // target: 'http://dcd.hooook.com/api',
        target: 'http://192.168.0.152:60000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  configureWebpack: {
    // externals: {
    //   vue: 'Vue',
    //   'vue-router': 'VueRouter',
    //   vuex: 'Vuex',
    //   axios: 'axios',
    //   moment: 'moment',
    //   nprogress: 'NProgress'
    // },
    plugins
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        resolve('./src/assets/styles/common.less')
      ]
    }
  }
}
