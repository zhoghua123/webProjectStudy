// 获取搜索关键字
var key = getUrlParams('key');
console.log(key);
// 调用搜索接口
$.ajax({
    type:'get',
    url: '/posts/search/' + key,
    success: function(response) {
        console.log('----',response);
        var html = template('searchTpl',{data:response});
    //    console.log(html);
        $('#searchBox').html(html);
    }
})