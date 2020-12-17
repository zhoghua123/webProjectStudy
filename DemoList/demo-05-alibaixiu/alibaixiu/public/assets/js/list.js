// 获取地址栏中的categaryId参数
var categoryId = getUrlParams('categoryId')
console.log(categoryId);
// 根据categoryId向服务器端发送请求获取文章列表
$.ajax({
    type:'get',
    url: '/posts/category/' + categoryId,
    success: function(response) {
        // console.log('----',response);
       var html = template('listTpl',{data:response});
    //    console.log(html);
        $('#listBox').html(html);
    }
})

// 根据categoryId向服务器端发送请求获分类信息
$.ajax({
    type:'get',
    url: '/categories/' + categoryId,
    success: function(response) {
        console.log('----',response);
        $('#categoryTitle').html(response.title);
    }
})