
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
        // 启用表单验证
        validator();
        // 缩略图上传
        var file,imgPath,imgUrl;
        $('#title-img>.change-title>input').change(function (e) {

            file = this.files[0];
            imgPath = $(this).val();

            if (imgPath == "") {
                return false;
            } else {
                imgUrl = window.URL.createObjectURL(this.files[0]);
            }

            if (!/image\/\w+/.test(file.type)) {
                alert("请确保文件为图像类型");
                return false;
            }
            if (file.size > 2000000) {
                alert('图片过大,不得超过2M！');
                return false;
            }
            // console.log(file);
            $('#title-img>img').attr({ 'src': imgUrl, 'width': '109px;', 'height': '109px;' });
            $('#userEdit button[type=submit]').attr('disabled', false);
            $('#title-img').siblings('span').hide();
        });


        $('#userEdit button[type=submit]').click(function (e) {
            // 阻止表单提交
            e.preventDefault();
            $('#userEdit').bootstrapValidator('validate');
            // $('#userEdit').data("bootstrapValidator").isValid();
            // 判断是否传图
            var noImg = 'images/img1.png';
            if ($('#title-img img').attr('src') == noImg) {
                $('#userEdit button[type=submit]').attr('disabled', true);
                $('#title-img').siblings('span').show();
                return false;
            }
            
            var form = new FormData();
            $('#userEdit [name]').each(function(){
                if($(this).attr('type')!='radio'){
                    form.append($(this).attr('name'), $(this).val()); 
                }else if($(this).is(":checked")){
                    form.append($(this).attr('name'), $(this).val());
                }
            });
            form.append("icon_link", file); // 文件对象

            $.ajax({
                url: "http://gimi321.com/admin.php/user_adduser",
                type: "POST",
                data: form,
                processData: false,
                contentType: false,
                success: function (res) {
                    alert('添加成功！');
                    // window.history.back(-1); 
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("设置失败，请检查网络后重试。");
                }
                
            });

        });
    }else{
        var user = {
            'id': urltype,
            'icon_link':$.getUrlParam('icon_link'),
            'nickname':$.getUrlParam('nickname'),
            'sex':$.getUrlParam('sex'),
            'birth':$.getUrlParam('birth'),
            'intro':$.getUrlParam('intro'),
            'location':$.getUrlParam('location'),
            'score_num':$.getUrlParam('score_num'),
            'hot_num':$.getUrlParam('hot_num'),
            'phone':$.getUrlParam('phone'),
            'register_time':$.getUrlParam('add_time'),
            'publish_num':$.getUrlParam('publish_num'),
            'comment_num':$.getUrlParam('comment_num'),
            'order_num':$.getUrlParam('order_num'),
            'state':$.getUrlParam('is_state')
        }

        for(var key in user){
            var select = '#userEdit [name='+key+']';
            if(key == 'icon_link'){
                $('#title-img img').attr('src',user[key]);
            }else if($(select).attr('type')!='radio'){
                $(select).val(user[key]);
            }else{
               if(key == 'sex'){
                    if(user[key]=='男'){
                        $('#sex1').attr('checked','checked');
                    }else if(user[key]=='女'){
                        $('#sex0').attr('checked','checked');
                    }
                }
                if(key == 'state'){
                    $('#state'+user[key]).attr('checked','checked');
                }
                
                
            }

            
        }
        validator();
        var file=false,imgPath,imgUrl;
        $('#title-img>.change-title>input').change(function (e) {

            file = this.files[0];
            imgPath = $(this).val();

            if (imgPath == "") {
                return false;
            } else {
                imgUrl = window.URL.createObjectURL(this.files[0]);
            }

            if (!/image\/\w+/.test(file.type)) {
                alert("请确保文件为图像类型");
                return false;
            }
            if (file.size > 2000000) {
                alert('图片过大,不得超过2M！');
                return false;
            }
            // console.log(file);
            $('#title-img>img').attr({ 'src': imgUrl, 'width': '109px;', 'height': '109px;' });
            $('#userEdit button[type=submit]').attr('disabled', false);
            $('#title-img').siblings('span').hide();
        });
        $('#userEdit button[type=submit]').click(function (e) {
            // 阻止表单提交
            e.preventDefault();
            $('#userEdit').bootstrapValidator('validate');
            // $('#userEdit').data("bootstrapValidator").isValid();
            // 判断是否传图
            
            var form = new FormData();
            $('#userEdit [name]').each(function(){
                if($(this).attr('type')!='radio'){
                    form.append($(this).attr('name'), $(this).val()); 
                }else if($(this).is(":checked")){
                    form.append($(this).attr('name'), $(this).val());
                }
            });
            if(file!=false){
                form.append("icon_link", file); // 文件对象
            }
            form.append("id", urltype);
            
        
            $.ajax({
                url: "http://gimi321.com/admin.php/user_edituser",
                type: "POST",
                data: form,
                processData: false,
                contentType: false,
                success: function (res) {
                    // document.getElementById("response").innerHTML = res; 
                    alert('修改成功！');
                    window.history.back(-1); 
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("设置失败，请检查网络后重试。");
                }
                
            });

        });
    }

})();