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
    * 将views模板中各个相似的模块抽取出来common文件夹中存储，然后在引用到原来的模板中
    * 抽取模板的骨架，即html骨架抽取，然后将原来的art模板中删除，并用继承代码替代
    
## 登录
1. 创建用户集合，初始化用户
    1. 连接数据库
    2. 创建用户集合
    3. 初始化用户
2. 为登录表单项设置请求地址、请求方式（post）以及表单项name属性
3. 当用户点击登录按钮时，客户端验证用户是否填写了登录表单 
4. 如果其中一项没有输入，阻止表单提交
5. 服务器端接收请求参数，验证用户是否填写了登录表单
6. 如果其中一项没有输入，为客户端做出响应，阻止程序向下执行
7. 根据邮箱地址查询用户信息
8. 如果用户不存在，为客户端做出响应，阻止程序向下执行 
9. 如果用户存在，将用户名和密码进行比对
10. 比对成功，用户登录成功
11. 比对失败，用户登录失败
12. 保存登录状态
13. 密码加密处理


## 密码加密 bcrypt
1. 哈希加密（单向加密，不可逆）是单程加密方式:1234 => abcd 
2. 在加密的密码中加入随机字符串可以增加密码被破解的难度。
3. 使用：

    ```
    // 导入bcrypt模块
    const bcrypt = require('bcrypt');
    // 生成随机字符串 gen => generate 生成 salt 盐
    let salt = await bcrypt.genSalt(10);
    // 使用随机字符串对密码进行加密
    let pass = await bcrypt.hash('明文密码', salt);
    // 密码比对
    let isEqual = await bcrypt.compare('明文密码', '加密密码');
    ```
4. bcrypt依赖的其他环境 
    1. python 2.x （mac系统默认已经安装,不需要安装。可以通过:python --version 命令查看）
    2. node-gyp（直接全局安装）
        1. `npm install -g node-gyp`
    3. windows-build-tools (windows下才需要安装)
        1. `npm install --global --production windows-build-tools`
    4. 安装bcrypt: npm install bcrypt

## cookie与session
