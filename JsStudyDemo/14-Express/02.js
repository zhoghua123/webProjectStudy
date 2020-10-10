// 引入Express框架
const express = require('express');
// 使用框架创建web服务器,不需要在引入http模块了
const app = express();


//网站维护公告
// app.use((req,res,next)=>{
//    res.end('当前网站正在维护'); 
// })

// 路由保护
app.use('/admin',(req,res,next)=>{
    let isLogin = false;
    if(isLogin){
        next();
    }else{
        res.send('您还没有登录请登录')
    }
})

//当客户端以get方式访问/路由时
app.get('/admin',(req,res)=>{
    // 对客户端做出响应
    res.send('您已经登录！');
})

// 自定义404页面

app.use((req,res,next)=>{
    res.status(404).send('当前访问的页面不存在');
})

// 程序监听3000端口
app.listen(3000);
console.log('服务器启动成功！');

