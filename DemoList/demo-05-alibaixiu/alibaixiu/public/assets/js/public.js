// 创建公共的模板，给各个页面使用

// 处理日期时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  }
  

// 向服务器端发送请求获取随机推荐数据
$.ajax({
    type:'get',
    url: '/posts/random',
    success: function(response) {
        // console.log('----',response);
        // 创建模板变量
        var randomTpl = `
            {{each data}}
            <li>
                <a href="detail.html?id={{$value_id}}">
                    <p class="title">{{$value.title}}</p>
                    <p class="reading">阅读({{$value.meta.views}})</p>
                    <div class="pic">
                        <img src="{{$value.thumbnail}}" alt="">
                    </div>
                </a>
            </li>
            {{/each}}
        `;
        // 渲染成html
       var html = template.render(randomTpl,{data:response});
    //    console.log(html);
        $('#rendomBox').html(html);
    }
})

// 向服务器端发送请求获取最新评论数据
$.ajax({
    type:'get',
    url: '/comments/lasted',
    success: function(response) {
        // console.log('----',response);
        // 设置假数据
        response = [
            {
                state:0,
                _id: '1111',
                author:{
                    role:'admin',
                    nickName:'coder',
                    avator:'/uploads/avatar_1.jpg'
                },
                content:'很好！！！！！',
                createAt:'2020-12-16T00:00:00.000Z'
            }
        ]
        // 创建模板变量
        var commentTpl = `
            {{each data}}
            <li>
            <a href="detail.html?id={{$value._id}}">
              <div class="avatar">
                <img src="{{$value.author.avator}}" alt="">
              </div>
              <div class="txt">
                <p>
                  <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
                </p>
                <p>{{$value.content}}</p>
              </div>
            </a>
            </li>
            {{/each}}
        `;
        // 渲染成html
       var html = template.render(commentTpl,{data:response});
    //    console.log(html);
        $('#commentBox').html(html);
    }
})

// 向服务器端发送请求获取网站导航数据
$.ajax({
    type:'get',
    url: '/categories',
    success: function(response) {
        // console.log('----',response);
        // 创建模板变量
        var navTpl = `
            {{each data}}
            <li><a href="list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
            {{/each}}
        `;
        // 渲染成html
       var html = template.render(navTpl,{data:response});
        $('#navBox').html(html);
        $('#topNavBox').html(html);
    }
})

// 从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
	var paramsAry = location.search.substr(1).split('&');
	// 循环数据
	for (var i = 0; i < paramsAry.length; i++) {
		var tmp = paramsAry[i].split('=');
		if (tmp[0] == name) {
			return tmp[1];
		}
	}
	return -1;
}

// 向服务器端发送请求获取搜索功能
$('.search form').on('submit',function(){
    // 获取关键字
    var keystr =  $(this).find('.keys').val();
    // 跳转到搜索结果页面，并传递关键字
    location.href = '/search.html?key='+keystr;
    // 阻止表单默认行为
    return false;
})
// $.ajax({
//     type:'get',
//     url: '/categories',
//     success: function(response) {
//         // console.log('----',response);
//         // 创建模板变量
//         var navTpl = `
//             {{each data}}
//             <li><a href="list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
//             {{/each}}
//         `;
//         // 渲染成html
//        var html = template.render(navTpl,{data:response});
//         $('#navBox').html(html);
//         $('#topNavBox').html(html);
//     }
// })