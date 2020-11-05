// 展示博客的路由

// 进入express框架
const express = require('express');
// 创建路由
const home = express.Router();
home.get('/',(req,res)=>{
    res.send('欢迎来到博客首页');
});

// 将路由对象作为模块成员进行导出
module.exports = home;
