// 博客管理页面路由
// 进入express框架
const express = require('express');
// 创建路由
const admin = express.Router();
admin.get('/login',(req,res)=>{
    // res.send('欢迎来到管理页面');
    // 渲染模板，并返回模板页面； 当前的路径为views文件夹内部
    res.render('admin/login');
});

// 将路由对象作为模块成员进行导出
module.exports = admin;