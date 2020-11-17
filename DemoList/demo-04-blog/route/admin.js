// 博客管理页面路由
// 进入express框架
const express = require('express');
// 导入用户集合构造函数
const {User} = require('../model/user');
// 进入加密模块
const bcrypt = require('bcrypt');
// 创建路由
const admin = express.Router();
admin.get('/login',(req,res)=>{
    // res.send('欢迎来到管理页面');
    // 渲染模板，并返回模板页面； 当前的路径为views文件夹内部
    res.render('admin/login');
});

// 创建用户列表路由
admin.get('/user',(req,res)=>{
    res.render('admin/user',{
        // msg:req.session.username
    });
});
admin.post('/login',async (req,res)=>{
    // 接收请求参数
    // 解析form的post请求参数，需要使用第三方工具body-parser
    // console.log(req.body);
    const {email,password} = req.body;
    // 1. 先拦截用户输入的数据
    if(email.trim().length==0 || password.trim().length ==0 ){
        // return res.status(400).send('<h4>邮件地址或者密码错误</h4>');
        return res.status(400).render('admin/error',{msg:'邮件地址或者密码错误'});
    }
    // 2. 查询用户信息
    let user= await User.findOne({email})
    if(user){
        // 将客户端传递过来的密码和用户信息中的密码进行比对
        let isvalid = await bcrypt.compare(password,user.password);
        if(isvalid){
            // 登录成功，将用户名存储在请求对象中
            // 向session对象中存储数据，session会自动生成一个sessionid，然后自动将sessionid存储到客户端的cookie中
            req.session.username = user.username;

            // 将数据全局存储
            // req.app 就是app.js中创建的app对象
            req.app.locals.userinfo = user;

            // res.send('登录成功!');
            // express框架的 重定向，跳转到用户列表页面
            res.redirect('/admin/user');

            // 原生node的重定向
            // res.writeHead(301, {
            //     Location: '/admin/user'
            // });
            // res.end();
            
        }else{
            res.status(400).render('admin/error',{msg:'邮件地址或者密码错误'});
        }
    }else{
        res.status(400).render('admin/error',{msg:'邮件地址或者密码错误'});
    }
    res.send(req.body);
});

// 将路由对象作为模块成员进行导出
module.exports = admin;