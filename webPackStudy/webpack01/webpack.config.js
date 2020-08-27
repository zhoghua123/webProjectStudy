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
    plugins:[htmlPlugin]// plugins 数组是 webpack 打包期间会用到的一些插件列表 
    

}