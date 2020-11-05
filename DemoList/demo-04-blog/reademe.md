## 案例初始化
    1. 建立项目所需文件夹
        * public 静态资源
        * model 数据库操作
        * route 路由
        * views 模板
    2. 初始化项目描述文件
        * npm init -y
    3. 下载项目所需第三方模块
        * `npm install express mongoose art-template express-art-template`
    4. 创建网站服务器
        * 创建app.js用于编写服务端代码，项目的入口文件
    5. 构建模块化路由
        * 在route中根据不同的页面创建相应的二级路由
    6. 构建博客管理页面模板
        * 将静态资源文件添加到public文件夹中
        * 将动态资源文件html放到views模板文件中，并修改后缀名为art文件
        * 注意：art里面引用的静态资源(css/js/img)路径，必须是绝对路径！！！
            * 绝对路径`href="/admin/lib/bootstrap/css/bootstrap.min.css"`
            * 相对路径`href="lib/bootstrap/css/bootstrap.min.css"`
    

