// 进入express框架
const express = require('express');
const app = express();
app.use((req, res, next) => { 
    // 解决同源政策
    res.header('Access-Control-Allow-Origin', '*'); 
    // res.header('Access-Control-Allow-Methods', 'GET, POST'); 
    next(); 
})
app.post('/ajatest',(req,res)=>{
    // console.log(req.body);
     // 设置响应报文 参数：状态码，响应数据内容格式
    res.send('{"name":"张三","age":10}');
});
app.listen(3000);
console.log('服务启动成功！');