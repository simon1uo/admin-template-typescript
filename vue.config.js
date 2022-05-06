const path = require('path')

module.exports = {
    // 配置方式一：CLI提供的
    outputDir: './build', // build输出文件夹
    publicPath: './', // 本地build避免出错
    devServer: {
        proxy: {
            '/api': {
                target: 'http://152.136.185.210:5000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
    /*configureWebpack: {
        chainWebpack: (config) => {
            config.resolve.alias
                .set('@', path.resolve(__dirname, 'src'))
                .set('components', '@/components')
        }
    }*/
}
