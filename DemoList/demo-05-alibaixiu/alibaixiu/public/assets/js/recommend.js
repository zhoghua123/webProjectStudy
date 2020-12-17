// 创建公共的模板，给各个页面使用

// 向服务器端发送请求获取热门推荐数据
$.ajax({
    type:'get',
    url: '/posts/recommend',
    success: function(response) {
        // console.log(response);
        // 搞一些假数据
        response = [
            {
            _id:'1234',
            thumbnail: '/uploads/hots_2.jpg',
            title: '假数据1'
            },
            {
                _id:'1234',
                thumbnail: '/uploads/hots_3.jpg',
                title: '假数据2'
            },
            {
                _id:'1234',
                thumbnail: '/uploads/hots_4.jpg',
                title: '假数据3'
            },
            {
                _id:'1234',
                thumbnail: '/uploads/hots_5.jpg',
                title: '假数据4'
            }
        ]
        // console.log(response);
        // 创建模板变量
        var recommandTpl = `
            {{each data}}
            <li>
                <a href="detail.html?id={{$value._id}}">
                <img src="{{$value.thumbnail}}" alt="">
                <span>{{$value.title}}</span>
                </a>
            </li>
            {{/each}}
        `;
        // 渲染成html
       var html = template.render(recommandTpl,{data:response});
    //    console.log(html);
        $('#recommendBox').html(html);
    }
})