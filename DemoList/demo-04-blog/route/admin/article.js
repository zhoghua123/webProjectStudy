module.exports = (req,res)=>{
    // 记录当前选中的状态：文章列表页面
    req.app.locals.current = 'article';
    console.log('--------');
    res.render('admin/article')
}