// 1. 引入第三方模块bcrypt
const bcrypt = require('bcrypt');

 async function run (){
    // 2. 生成随机字符串
    // 该方法接收一个参数：数值
    // 数值越大，生成的复杂度越高，默认为10
    const salt = await bcrypt.genSalt(10);
    // 3. 加密
    // 参数：要加密的明文，随机字符串
    // 返回值：加密后的密文
    const result = await bcrypt.hash('123456',salt);
    // 4. 密码比对
    let isEqual = await bcrypt.compare('123456', result);
    console.log(salt);
    console.log(result);
    // 返回位true
    console.log(isEqual);
 }
 run();