const { Article } = require('../../model/article')
// 导入分页模块
const pagination = require('mongoose-sex-page')
// 首页请求处理函数
module.exports = async (req,res)=>{
    // 分页查询
   let result = await pagination(Article).page(1).size(4).display(5).find().populate('author').exec();
    // res.send('欢迎来到博客首页');
    // 渲染静态页面,并传递数据
    // res.render('home/default.art',{result:result});
    res.render('home/default.art');
}