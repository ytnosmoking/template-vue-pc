
// eslint-disable-next-line no-unused-vars
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin') // Gzip  只用在 开发阶段
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
const resolve = dir => {
  return path.join(__dirname, dir)
}

const projectName = '项目名称'
const plugins = []

const gzip = new CompressionPlugin({ // 文件开启Gzip，也可以通过服务端(如：nginx)(https://github.com/webpack-contrib/compression-webpack-plugin)
  filename: '[path].gz[query]',
  algorithm: 'gzip',
  test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
  threshold: 8192,
  minRatio: 0.8
})

if (isDev) {
  plugins.push(new HardSourceWebpackPlugin())
} else {
  plugins.push(new BundleAnalyzerPlugin())
  plugins.push(gzip)
}

const cdn = {
  css: [],
  // 像第三方依赖vue 的 要将vue 优先放置
  js: [
    // 自己去找cdn  https://www.bootcdn.cn/
  ], // 
}

const externals = {
  // 一般情况
  // vue: 'Vue',
  // vuex: 'Vuex',
  // 'vue-router': 'VueRouter',
  // axios: 'axios',
  // 'element-ui': 'ELEMENT',
  // moment: 'moment',
  // nprogress: 'NProgress'
}



module.exports = {
  // baseUrl: BASE_URL,
  // 如果不需要使用eslint，把lintOnSave设为false即可
  // lintOnSave: true,

  // !!构建打包的输出目录
  // outputDir: 'dist/release',
  // !! 资源文件的输出地址
  // assetsDir: 'static',
  // !! 公共资源文件的基础路由地址
  // publicPath: `/mis/${process.env.MIS_MDU}/`,
  // !! 生产环境下是否开启sourceMap 打包时不生成.map文件

  productionSourceMap: isDev,

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('views', resolve('src/views')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('common', resolve('src/components'))
      .set('utils', resolve('src/utils'))
      .set('mixins', resolve('src/mixins'))
      .set('store', resolve('src/store'))

    config.module.rules.delete('svg')
    // 自己去iconfont 可以找相关的svg 图标 https://www.iconfont.cn/
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

    // htmlWebpackPlugin 插件
    config.plugin('html')
      .tap((args) => {
        args[0].title = projectName
        if (!isDev) {
          args[0].cdn = cdn;
        }
        return args;
      });

    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 移除 preload 插件
    config.plugins.delete('preload')
  },

  configureWebpack: config => {
    config.plugins.push(...plugins);
    if (!isDev) {
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log'];

      config.externals = externals;
    }
  },


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

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        resolve('./src/assets/styles/common.less')
      ]
    }
  }
}
