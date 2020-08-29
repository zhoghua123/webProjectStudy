var path = require('path')
// 导入生成预览页面的插件，得到一个构造函数 
const HtmlWebpackPlugin = require('html-webpack-plugin') 
const htmlPlugin = new HtmlWebpackPlugin({ // 创建插件的实例对象
    template: './src/index.html', // 指定要用到的模板文件
    filename: 'index.html' // 指定生成的文件的名称，该文件存在于内存中，在目录中不显示，跟bundle.js一样
})

module.exports = {
    //编译模式：development/production
    mode: 'development',
    // 要打包的入口文件
    entry: path.join(__dirname,'./src/index.js'),
    // 打包后输出到的文件夹
    output: {
        // 输出文件的路径
        path: path.join(__dirname,'./dist'),
        // 输出文件的名称
        filename: 'bundle.js'
    },
    plugins:[htmlPlugin],// plugins 数组是 webpack 打包期间会用到的一些插件列表 
    module: {
        rules:[
            // 处理css文件
            {test: /\.css$/, use: ['style-loader','css-loader','postcss-loader']},
            // 处理less文件
            {test: /\.less$/, use: ['style-loader','css-loader','less-loader']},
            // 处理scss文件
            // {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']}
            {test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/, use:'url-loader?limit=169'},
            // exclude 为排除项，表示 babel-loader 不需要处理 node_modules 中的 js 文件
            {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/}
        ]
    }
}