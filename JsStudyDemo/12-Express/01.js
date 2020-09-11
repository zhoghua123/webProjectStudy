// 引入Express框架
const express = require('express');
// 使用框架创建web服务器,不需要在引入http模块了
const app = express();

//当客户端以get方式访问/路由时
app.get('/',(req,res)=>{
    // 对客户端做出响应
    res.send('Hello Express');
})

app.get('/list',(req,res)=>{
    res.send({name:'张三',age: 20});
})

// 程序监听3000端口
app.listen(3000);
console.log('服务器启动成功！');

