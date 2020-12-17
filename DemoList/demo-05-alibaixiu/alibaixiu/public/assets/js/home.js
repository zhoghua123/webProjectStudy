// 向服务器端发送请求获取轮播图数据
$.ajax({
    type:'get',
    url: '/slides',
    success: function(response) {
        // console.log(response);
        // 渲染模板
        var html = template('slisesTpl',{data:response});
        // console.log(html);
        // 显示模板
        $('#slidesBox').html(html);

        //轮播图实现代码
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function (index) {
                // index++;
                $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
        });
        // 上/下一张
        $('.swipe .arrow').on('click', function () {
            var _this = $(this);
            if(_this.is('.prev')) {
                swiper.prev();
            } else if(_this.is('.next')) {
                swiper.next();
            }
        })
    }
})

// 向服务器端发送请求获取最近发布数据
$.ajax({
    type:'get',
    url: '/posts/lasted',
    success: function(response) {
        // console.log(response);
        // 渲染模板
        var html = template('lastedTpl',{data:response});
        // console.log(html);
        // 显示模板
        $('#lastedBox').html(html);
    }
})