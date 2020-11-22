module.exports = (req,res)=>{
    // 记录当前选中的状态：文章编辑页面
    console.log(';;;;;;');
    req.app.locals.current = 'article-edit';
    res.render('admin/article-edit')
}