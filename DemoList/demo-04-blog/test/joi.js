// 引入
const Joi = require('joi')
// 定义规则

const schema = {
    username: Joi.string().min(2).max(5).required().error(new Error('username没有通过验证'))
}

async function run() {
    try{
        await Joi.validate({username:'ag'},schema);
    }catch(ex) {
        console.log(ex);
        return;
    }
     console.log('验证通过');
}

run();