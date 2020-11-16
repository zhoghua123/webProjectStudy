function serializeToJson(form){
    var result = {};
    // 获取表单用户填写的数据
    var f = form.serializeArray();
    f.forEach(function(item){
        result[item.name] = item.value;
    });
    return result;
}