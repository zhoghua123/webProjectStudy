
// 创建文章集合
// 1. 引入mongoose
const mongoose = require('mongoose');

// 2. 创建规则
const articleSchema = new mongoose.Schema({
    title : {
        type : String,
        maxlength: 20,
        minlength: 4,
        required: [true,'标题格式不对（4-20）']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,//数据库独有的数据类型
		ref: 'User', //作者的类型为User集合类型
		required: [true, '请传递作者']
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover : { //封面
        type : String,
        default : null
    },
    content : { //内容
        type : String
    },
});

// 3. 根据规则创建集合
const Article = mongoose.model('Article', articleSchema);

// 4. 导出集合对象
module.exports = {
	Article
}