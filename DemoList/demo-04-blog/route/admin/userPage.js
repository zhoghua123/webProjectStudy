const { User } = require('../../model/user')
module.exports = async (req,res)=>{
    // 记录当前选中的状态：用户列表页面
    req.app.locals.current = 'user';
    // 分页展示数据

    // 接收客户端传递过来的当前页参数,默认显示第1页
    let page = req.query.page || 1;
    // 设置每页显示的数据条数
    let pagesize =10;
    // 数据总数
    let count = await User.countDocuments({});
    // 总页数   ceil: 向上取值
    let total =  Math.ceil(count/pagesize);

    // 1. 从数据库中查询用户信息
    // 2. 将数据传递到模板进行渲染
    // limit(2) // limit 限制查询数量 传入每页显示的数据数量
    // skip(1) // skip 跳过多少条数据 传入显示数据的开始位置
    // 页码对应的开始位置
    let start = (page-1)*pagesize;
    let users = await User.find({}).limit(pagesize).skip(start);
    // res.send(users);
    res.render('admin/user',{
        // msg:req.session.username
        users: users,
        page: page,
        total : total
    });
}