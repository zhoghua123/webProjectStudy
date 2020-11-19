
// 引入
const {User,validateUser} = require('../../model/user.js')
const bcrypt = require('bcrypt')

// 用户添加功能
module.exports = async (req,res,next)=>{
    // 处理用户添加功能
    // res.send(req.body);
    try {
        // 实施验证
        await validateUser(req.body);
    } catch (e) {
        // 验证没有通过
        // 1. 重定向为用户添加页面
        // 2. 携带错误信息
    //    return res.redirect('/admin/user-edit?message=' + e.message)
        // 注意，next只能接收一个参数，而且是字符串形式
        // 将对象转为json串传递:JSON.stringify()
        return next(JSON.stringify({path:'/admin/user-edit',message:e.message}));
    }
    // 根据邮箱地址查询是否有已有用户
    let user =  await User.findOne({email:req.body.email});
    // 用户已经存在，则提示
    if(user){
        // return res.redirect('/admin/user-edit?message=邮箱地址已经被占用')
        return next(JSON.stringify({path:'/admin/user-edit',message:'邮箱地址已经被占用'}));
    }
    // 用户不存在，则密码加密
    // 生成随机字符串
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password,salt);
    // 将body中的明文替换为密文
    req.body.password = password;
    // 将用户信息添加到数据库
    await User.create(req.body);
    // 重定向用户列表，并刷新
    res.redirect('/admin/user')
}