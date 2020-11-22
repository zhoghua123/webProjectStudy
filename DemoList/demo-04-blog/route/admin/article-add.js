
// 引入第三方formidable
const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');
module.exports = (req,res)=>{
    // 创建表单解析对象
    const form = new formidable.IncomingForm(); 
    // 设置文件上传路径(文件要上传到服务器的那个目录下)
    form.uploadDir = path.join(__dirname,'../','../','public','uploads'); 
    // 保留客户端传递过来的扩展名
    form.keepExtensions = true; 
    // 对表单进行解析
    form.parse(req, async (err, fields, files) => { 
        // err解析失败的错误信息
        // fields 存储普通请求参数
        // files 存储上传的文件信息
        // 获取上传到服务器后的文件路径
        // console.log(files.cover.path.split('public')[1]);
        // 将新增的文章插入到数据库
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishData: fields.publishData,
            cover: files.cover.path.split('public')[1],
            content: fields.content
        })
        // 重定向文章列表页面，刷新文章列表
        res.redirect('/admin/article')
    });

    // res.send('OK')
}