const mongoose = require('mongoose');

// 1. 创建一个数据库playground
mongoose.connect('mongodb://localhost/playground',{useNewUrlParser: true,useUnifiedTopology: true})
.then(() => console.log('数据库连接成功'))
.catch(err => console.log('数据库连接失败', err));

// 2. 在数据库playground下创建一个集合counrses
// 2.1 设定集合规则
const courseSchema =new mongoose.Schema({
    name: String,
    author: String,
    isPublished:Boolean
});

// 2.2 创建集合并应用规则,返回构造函数
const Course = mongoose.model('Course',courseSchema);

// 3. 创建集合实例，并保存文档数据
// 3.1 创建集合
const course = new Course({
    name: 'Node.js course', 
    author: 'coderzhong', 
    tags: ['node', 'backend'], 
    isPublished: true
});

// 3.2 将数据保存到数据库中 
course.save();

/**
 * 以上3步之后，就可以通过数据库可视化工具MongoDB Compass，查看当前系统中所有的数据库
 * 会发现有一个playground数据库，改数据库下面有一个courses集合
 * courses集合下面有一条文档数据
 */