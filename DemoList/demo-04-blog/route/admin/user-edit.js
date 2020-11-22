const {User} = require('../../model/user')

module.exports = async (req,res)=>{
    // 记录当前选中的状态：用户编辑页面
    req.app.locals.current = 'user-edit';

    // 获取到地址栏中的参数
    const {message,id} = req.query;
    // 修改操作
    if(id){
        // 1. 查询用户信息
        let user = await User.findOne({_id:id})
        res.render('admin/user-edit',{
            message: message,
            user: user,
            link: '/admin/user-modify?id='+id,
            button: '修改'
        });
        // res.send(user);
        // return;
    }else{
        // 添加操作
        res.render('admin/user-edit',{
            message: message,
            link: '/admin/user-edit',
            button: '添加'
        });
    }
}

