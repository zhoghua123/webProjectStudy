// 注意： require在导入一个模块的时候，同时会执行这个文件！！！
// 进入express框架
const express = require('express');
const path = require('path');
// 引入body-parser模块，用来处理post请求的参数
var bodyPaser = require('body-parser');
// 导入路由
const home = require('./route/home');
const admin = require('./route/admin');

const session = require('express-session');
const template = require('art-template');
// 导入dateformat第三方模块,用于处理时间格式
const dateFormate = require('dateformat');
const morgan = require('morgan');
// 导入config
const config = require('config');


// 创建网站服务器
const app = express();
// 数据库连接成功
require('./model/connect')
// 注意： require在导入一个模块的时候，同时会执行这个文件！！！
// 在数据库中初始化一个用户
// require('./model/user')

// 处理post请求参数
app.use(bodyPaser.urlencoded({extended:false}));

// 配置session
app.use(session({
    secret:'secret key',
    saveUninitialized:false, //默认不初始化cookie
    cookie:{
        maxAge: 24 * 60 * 60 * 1000 //设置cookie失效时间为1天
    }
}))

// 给express配置模板
// 告诉express框架,模板的目录
app.set('views',path.join(__dirname,'views'));
// 告诉express框架,模板的默认后缀
app.set('view engine','art');
// 当渲染后缀名为art的模板时，使用的模板引擎是哪个express-art-template
app.engine('art',require('express-art-template'));
// 给模板全局配置时间处理函数
template.defaults.imports.dateFormate = dateFormate;


// 开放静态资源文件:(image、css、js文件，html文件不是静态文件，因为需要填充动态数据)
app.use(express.static(path.join(__dirname,'public')));

// 获取当前操作系统的环境变量
// process对象是global全局对象下的一个属性对象
// console.log(process);
console.log(config.get('title'));
if (process.env.NODE_ENV == 'development') {
    // 开发环境
    // 在开发环境中，监听客户端发送到服务器的所有请求，并打印到终端
    app.use(morgan('dev'));

} else {
    // 生产环境
}


// 拦截所有非登录页面，用于判断当前用户是否登录，如果登录才放开拦截
app.use('/admin',require('./middleware/loginGuard'));

// 根据请求路径（一级路由）匹配相应的二级路由
app.use('/home',home);
app.use('/admin',admin);

// 错误处理中间件，统一处理错误信息
app.use((err,req,res,next)=>{
    console.log('--==========',err);
    // 字符串转为对象
    const result = JSON.parse(err);
    // `${}` ：es6字符串拼接
    let params = [];
    for(let attr in result){
        if(attr != 'path'){
            params.push(attr + '=' + result[attr]);
        }
    }
    console.log('');
    return res.redirect(`${result.path}?${params.join('&')}`);
});


// 监听服务端口
app.listen(80);
console.log('网站服务器启动成功,请使用localhost访问！');