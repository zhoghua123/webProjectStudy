// 连接数据库
// 引入mongoose
const mongoose = require('mongoose');
// 连接数据库，27017是默认端口号，可以不写 //格式 用户名:密码@域名/数据库名称
// mongoose.connect('mongodb://itcast:1234@localhost:27017/blog', {useNewUrlParser: true })
//连接数据库
mongoose.connect('mongodb://localhost/blog',{ useNewUrlParser: true ,useUnifiedTopology: true})
        .then(()=>console.log('数据库连接成功'))
        .catch(()=>console.log('数据库连接失败'))
