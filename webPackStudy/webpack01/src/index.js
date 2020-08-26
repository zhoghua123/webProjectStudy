// ES6的模块语法，不支持，直接导入html会报错
import $ from 'jquery'

// 各行变色
$(function(){
    $('li:odd').css('backgroundColor','pink');
    $('li:even').css('backgroundColor','lightblue');
})