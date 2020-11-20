const {User} = require('../../model/user')
const bcrypt = require('bcrypt');
// 用户更新
module.exports = async (req,res,next)=>{
    // 1. 解析请求参数
    // post请求参数
    const {username,email,role,state,password} = req.body;
    // 连接地址中携带的请求参数
    const id = req.query.id;
    // 密码比对
    // 根据id查询用户，进行密码比对
    let user = await User.findOne({_id:id});
    const isValid = await bcrypt.compare(password,user.password);
    // 密码比对成功,更新数据库（注意不能更新密码）
    if(isValid){
        await User.updateOne({_id:id},{
            username: username,
            email: email,
            role: role,
            state: state,
        })
        // 重定向到用户列表页面
        res.redirect('/admin/user');
    }else{
        // 密码比对失败
        let obj = {path: '/admin/user-edit',message:'密码填写错误',id: id}
        next(JSON.stringify(obj));
    }
};