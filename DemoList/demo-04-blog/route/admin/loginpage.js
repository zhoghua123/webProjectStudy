module.exports = (req,res)=>{
    // res.send('欢迎来到管理页面');
    // 渲染模板，并返回模板页面； 当前的路径为views文件夹内部
    res.render('admin/login');
}
