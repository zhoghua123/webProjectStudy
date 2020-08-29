// ES6的模块语法，不支持，直接导入html会报错
import $ from 'jquery';

// 由于webpack不识别css文件，因此需要将css文件导入到js文件中共
import './css/1.css';

// 导入less文件
import './css/1.less';
// 导入scss文件
// import './css/1.scss';

// 各行变色
$(function(){
    $('li:odd').css('backgroundColor','red');
    $('li:even').css('backgroundColor','lightblue');
})

// 高级语法
class Person {
    static info = 'aaa'
}

console.log(Person.info);