// document.write("hello world2");

// window.onload = function(){
//     var oDiv = document.querySelector("div");
//     var text = oDiv.innerText;
//     alert(text);
// }

// 定义一个常量：ES6语法
const num = 666;
// 不能再赋值
// num = 444;
console.log(num);

// ES6之前会覆盖，不报错
var xxx = 444;
var xxx = 666;
console.log(xxx);

// ES6之后不允许覆盖，会报错
let xxg = 222;
// let xxg = 333;
console.log(xxg);
