
var that;
class Tab {
    constructor (id){
        //保留this
        that = this;
        // 获取元素
        // 获取大盒子
        this.main = document.querySelector(id);
        // 加号
        this.add = this.main.querySelector('.tabadd');
        // li的父元素
        this.ul = this.main.querySelector('.fisrstnav ul:first-child');
        // section 的父元素
        this.fsection = this.main.querySelector('.tabscon');
        // 初始化
        this.init();
    }
    // 初始化绑定操作
    init(){
        // 获取所有li、ul
        this.updateNode();
        // 1. 每个li添加一个点击事件
        for(var i = 0;i<this.lis.length;i++){
            this.lis[i].index = i;
            // this.lis[i].onclick = function(){
            //     // 注意：这里的this此时不是对象了，而是li了
            //     console.log(this.index);
            // }
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            // 添加双击事件
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
        // 2. 给加号添加点击事件
        this.add.onclick = this.addTab;
    }
    // 获取所有li、section
    updateNode(){
        // 导航内容
        this.lis = this.main.querySelectorAll('li');
        // 内容
        this.sections = this.main.querySelectorAll('section');
        // 获取x号
        this.remove = this.main.querySelectorAll('.icon-guanbi');

        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
    }
    // 1. 切换功能
    toggleTab(){

        // 1. 先清除其他类，注意是that不是this
        that.clearClass();

        // 2. 点击导航切换
        // 注意：这里的this此时不是对象了，而是成员函数的调用者li了
        // console.log(this.index);
        this.className = 'liactive';

        // 3. 内容自动切换
        // 这句话是错误的，因为此时的this是li，而不是Tab对象
        // this.sections[this.index].className = 'conactive';
        that.sections[this.index].className = 'conactive';
    }
    clearClass(){
        for(var i = 0;i<this.lis.length;i++){
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    // 2. 添加功能
    addTab(){
        
        /**
         * 利用方法可以直接把字符串格式元素添加到父元素中
         * insertAdjacentHTML
         * 参数1：
         * beforebegin：放到元素自身前面
         * afterend：放到元素自身后面
         * afterbegin：插入元素内部的第一个子节点之前
         * beforeend：插入元素内部的最后一个子节点之后
         * 参数2：标签字符串
         */
        // 利用方法可以直接把字符串格式元素添加到父元素中

        var random = Math.random();
        // 0. 清除
        that.clearClass();
        // 1. 添加一个导航li
        var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        that.ul.insertAdjacentHTML('beforeend',li);
        // 2. 添加内容section
        var section = '<section class="conactive">测试'+ random +'</section>';
        that.fsection.insertAdjacentHTML('beforeend',section);

        // 3. 重新初始化
        that.init();
    }
    // 3. 删除功能
    removeTab(e){
        // 1. 阻止事件传递！！！！点击x，不影响父控件
        e.stopPropagation();
        // 2. 拿到父元素的索引
        var index = this.parentNode.index;
        console.log(index);
        // 3. 删除li/section元素,remove方法可以直接删除指定的元素
        that.lis[index].remove();
        that.sections[index].remove();
        // 4. 更新
        that.init();

        // 如果当前的li不是选中状态，则直接删除
        if(document.querySelector('.liactive')) return;
        // 5. 如果当前的li是选中状态，则删除后，上一个元素默认选中
        index--;
        // 手动调用触发点击事件
        that.lis[index] && that.lis[index].click();
    }
    // 4. 修改功能
    editTab(){
        // 获取内容
        var str = this.innerHTML;
        // 双击禁止选中文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        // 双击新增一个文本框
        this.innerHTML = '<input type="text" />'
        var input = this.children[0];
        input.value = str;
        // 文本框中文字默认选中
        input.select();
        // 当离开文本框，将文本框内容给span
        input.onblur = function(){
            // 这个this是文本框input
            this.parentNode.innerHTML = this.value;
        }
        // 按下回车也可以做到同样效果
        input.onkeyup = function(e){
            if(e.keyCode === 13){
                // 手动触发表单失去焦点事件
                this.blur();
            }
        }
    }
}

var tab = new Tab('#tab');

