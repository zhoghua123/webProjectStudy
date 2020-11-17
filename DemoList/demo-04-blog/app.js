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
app.use(session({secret:'secret key'}))

// 给express配置模板
// 告诉express框架,模板的目录
app.set('views',path.join(__dirname,'views'));
// 告诉express框架,模板的默认后缀
app.set('view engine','art');
// 当渲染后缀名为art的模板时，使用的模板引擎是哪个express-art-template
app.engine('art',require('express-art-template'));


// 开放静态资源文件:(image、css、js文件，html文件不是静态文件，因为需要填充动态数据)
app.use(express.static(path.join(__dirname,'public')));

// 根据请求路径（一级路由）匹配相应的二级路由
app.use('/home',home);
app.use('/admin',admin);

// 监听服务端口
app.listen(80);
console.log('网站服务器启动成功,请使用localhost访问！');