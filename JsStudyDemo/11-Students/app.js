// 引入http模块，用于创建服务
const http =require('http');
// 引入router模块，用于设置路由
// const getRouter = require('router');
// 引入模板引擎art-template
const template = require('art-template');
// 引入path模块，用于拼接路径
const path = require('path');
// 引入系统模块，将字符串转对象，不需要下载
// const querystring = require('querystring');
// 引入静态资源访问模块，用于访问项目中静态资源
const serveStatic = require('serve-static');
// 引入第三方模块dateformat，用于处理时间
const dateformat = require('dateformat');


/******服务器创建，并监听客户端请求*********/
// a-1 创建网站服务器
const app = http.createServer();
// a-2 当客户端请求服务端的时候处理代码
app.on('request',(req,res)=>{
    // b-3 启动路由
    router(req,res,()=>{
        console.log('请求完毕了');
    });
    //c-2 启用静态资源访问服务功能
	serve(req, res, () => {})
});

// a-3 监听客户端访问端口
app.listen(80);
console.log('服务器启动成功！');

/******数据库连接部分*********/
// c-1 创建并连接数据库
require('./model/connect')
// c-2导入Student集合：创建集合Student
// const Student = require('./model/user');

/******模板部分*********/
// 配置模板的根目录
template.defaults.root = path.join(__dirname,'views');
// 将该对象导入到模板中使用
template.defaults.imports.dateformat = dateformat;

/******静态资源部分*********/
// c-1 实现静态资源访问服务
const serve = serveStatic(path.join(__dirname, 'public'));

// 导入路由对象
const router = require('./route/index');


// /******创建路由部分，用于监听客户端请求的路径*********/
// // b-1 获取路由对象
// const router = getRouter();

// // b-2 组建路由
// //根据客户端访问的路径不同设置不同的代码逻辑
// //创建路由并实现页面模板呈递
// // student添加信息页面get请求
// router.get('/add',(req,res)=>{
//     //渲染模板：将模板页面展示
//     let html = template('index.art',{})
//     res.end(html);
// });

// //student列表页面get请求
// router.get('/list',async (req,res)=>{
//     //1. 从数据库中将所有的学生信息查询出来
//     let sutdents = await Student.find();
//     //2. 通过模板引擎将学生信息和HTML模板进行拼接
//     // 渲染模板：学生列表页面展示
//     let html = template('list.art',{students:sutdents})
//     //3. 将拼接好的HTML模板响应给客户端
//     res.end(html);
//  });

// //student信息页面点击添加post请求
//  // 1. 添加实现学生信息功能路由
// router.post('/add', (req, res) => {
//     //2. 接收客户端传递过来的学生信息
// 	// 接收post请求参数
// 	let formData = '';
// 	req.on('data', param => {
// 		formData += param;
// 	});
// 	req.on('end', async () => {
//         // 3. 将学生信息添加到数据库中
//         await Student.create(querystring.parse(formData))
//         //4. 将页面重定向到学生信息列表页面
// 		res.writeHead(301, {
// 			Location: '/list'
// 		});
// 		res.end()
// 	})
// });
