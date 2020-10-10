const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
//分析资源类型
const mime = require('mime');

const app = http.createServer();

app.on('request', (req, res) => {
	// 获取用户的请求路径
	let pathname = url.parse(req.url).pathname;
    
    //用户不输入路径，直接域名，也显示default.html
	pathname = pathname == '/' ? '/default.html' : pathname;

	// 将用户的请求路径转换为实际的服务器硬盘路径
	let realPath = path.join(__dirname, 'public' + pathname);
    
    //检查这个路径下资源类型
	let type = mime.getType(realPath)

	// 读取文件
	fs.readFile(realPath, (error, result) => {
		// 如果文件读取失败
		if (error != null) {
			res.writeHead(404, {
				'content-type': 'text/html;charset=utf8'
			})
			res.end('文件读取失败');
			return;
		}
        //设置相应内容格式类型
		res.writeHead(200, {
			'content-type': type
		})
        //将文件资源读取结果返回给客户端
		res.end(result);
	});
});

app.listen(3000);
console.log('服务器启动成功')
