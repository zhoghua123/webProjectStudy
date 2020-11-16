// 创建用户集合
// 引入mongoose
const mongoose = require('mongoose');
// 1. 进入加密模块
const bcrypt = require('bcrypt');

// 创建用户集合规则，相当于一个类
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true, //确保邮箱地址不重复
        required: true
    },
    password: {
        type: String,
        required: true

    },
    // admin:超级管理员
    // normal: 普通用户
    role : {
        type : String,
        required : true
    },
    // 0 启用，1：禁用
    state : {
        type : Number,
        default: 0
    },
});
// 创建集合，根据集合规则
const User = mongoose.model('User',userSchema);

async function createUser (){
    // 2. 生成随机字符串
    // 该方法接收一个参数：数值
    // 数值越大，生成的复杂度越高，默认为10
    const salt = await bcrypt.genSalt(10);
    // 3. 加密
    // 参数：要加密的明文，随机字符串
    // 返回值：加密后的密文
    const result = await bcrypt.hash('123456',salt);
    // 4. 密码比对
    // let isEqual = await bcrypt.compare('123456', result);
    // console.log(salt);
    // console.log(result);
    // 返回位true
    // console.log(isEqual);
    // 根据User集合，在数据库中，创建一个默认用户，初始化一个用户
    const user = await User.create({
        username: 'itemheima',
        email: 'itheima@itcast.cn',
        password: result,
        role: 'admin',
        state: 0
    })

 }

// createUser();

// 将用户集合作为模块成员导出
module.exports = {
    User: User
}