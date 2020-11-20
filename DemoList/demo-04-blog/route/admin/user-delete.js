const {User} = require('../../model/user')
module.exports = async (req,res)=>{
    // 1. 获取要删除的用户id
    // 2. 删除用户
    await User.findOneAndDelete({_id:req.query.id});
    // 重定向
    res.redirect('/admin/user');
}