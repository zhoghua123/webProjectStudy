// 拦截所有非登录页面，用于判断当前用户是否登录，如果登录才放开拦截
const guard = (req,res,next)=>{
    //判断用户访问的是否是登录页面
    // 判断用户的登录状态
    if(req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login')
    }else{ //已登录
        next();
    }
}

module.exports = guard;