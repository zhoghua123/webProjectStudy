// 展示博客的路由

// 进入express框架
const express = require('express');
// 创建路由
const home = express.Router();

/********封装思路：将各个请求路径的处理函数封装到单独的文件夹中***********/
// 博客首页页面
home.get('/',require('./home/index'));

// 博客详情页面
home.get('/article',require('./home/article'));

// 将路由对象作为模块成员进行导出
module.exports = home;
