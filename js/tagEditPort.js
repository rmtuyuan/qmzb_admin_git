
(function () {

    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象 
        var r = window.location.search.substr(1).match(reg);    //匹配目标参数
        if (r != null) return decodeURI(r[2]); return null;      //返回参数值
    };
    //得到url参数
    var urltype = $.getUrlParam('type');
    console.log(urltype);
    if (urltype == 'add') {
        validator();
        $('#tagEdit button[type=submit]').click(function (e) {
            // 阻止表单提交
            e.preventDefault();
            $('#tagEdit').bootstrapValidator('validate');
            // $('#userEdit').data("bootstrapValidator").isValid();
            $.ajax({
                type: "POST",
                url: "http://gimi321.com/admin.php/tag_addadmintag",
                data: { 'tag': $('#tagEdit input[name=tag]').val() },
                dataType: 'JSON',
                cache: false,
                success: function (response) {
                    alert('添加成功！');
                    window.history.back(-1); 
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("设置失败，请检查网络后重试。");
                }
            });

        });
    }else{
        
    }

})();