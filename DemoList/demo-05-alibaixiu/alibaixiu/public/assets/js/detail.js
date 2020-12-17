// 获取地址栏中的id参数
var postid = getUrlParams('id')
// 评论是否经过人工审核
var review ;
console.log(postid);
// 根据postid向服务器端发送请求获取文章详情
$.ajax({
    type:'get',
    url: '/posts/' + postid,
    success: function(response) {
        // console.log('----',response);
       var html = template('postTpl',response);
    //    console.log(html);
        $('#postBox').html(html);
    }
})

// 因为点赞a标签是动态添加的，因此使用代理模式
// 点赞按钮监听
$('#postBox').on('click','#like',function(){
    $.ajax({
        type:'post',
        url: '/posts/fabulous/' + postid,
        success: function(response) {
            location.reload();
            alert('点赞成功')
            console.log('----',response);
        }
    })
})

/********评论功能的实现*********** */
// 1. 判断管理员是否开启了评论功能
// 获取网站的配置信息
$.ajax({
    type:'get',
    url: '/settings',
    success: function(response) {
        // console.log('----',response);
        review = response.review;
        // 判断管理员是否开启了评论功能
        if(response.comment){
            // 开启了评论功能
           var html =  template('commentTpl')
           $('#comment').html(html);
        }
    }
})

// 2. 评论功能的提交
$('#comment').on('submit','form',function(){
    // 获取到评论的内容
    var content = $(this).find('textarea').val();
    var state ;
    if(review){//要经过人工审核
        state = 0;
    }else{//不需要经过人工审核
        state = 1;
    }
    // console.log('----',content);
    $.ajax({
        type:'post',
        url: '/comments',
        data:{
            content: content,
            post: postid,
            state: state
        },
        success: function(response) {
            alert('评论成功！')
            // console.log('----',response);
        },
        error: function(response) {
            console.log('评论失败');
        },
    })
    // 阻止表单的默认提交
    return false;
})