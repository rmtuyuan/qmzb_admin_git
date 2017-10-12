// FIX ME ALL postNum
(function () {
    // 用户列表
    function pageAjax(num) {
        $.ajax({
            type: "POST",
            url: "http://gimi321.com/admin.php/articlemanage_allaricle",
            data: { 'page': num },
            dataType: 'JSON',
            cache: false,
            success: function (response) {
                // 用户列表数据
                var postList = response.data.info;
                var pageNum = response.data.sum;
                var postUser = response.data.article_num;
                var postHtml = '';
                var btnHtml = '';
                // 渲染数据
                for (var i = 0; i < postList.length; i++) {
                    var postNum = postList[i];
                    var postInfo = postList[i].publish_info;
                    var postStatus;
                    switch(postInfo.is_visible){
                            case 0:
                            postStatus='<td class="text-status text-yellow">禁用</td>';
                            break;
                            case 1:
                            postStatus='<td class="text-status text-purple">待审核</td>';
                            break;
                            case 2:
                            postStatus='<td class="text-status text-green">可见</td>'; 
                            break;
                        
                    }

                    postHtml +=`<tr>
                                <td>
                                    <input id="post${postInfo.id}-mycheckbox" name="post-contorl" data-color="yellow" type="checkbox" class="checkbix" data-text="">
                                    <label aria-label="" role="checkbox" for="post${postInfo.id}-mycheckbox" class="checkbix"><span class=""></span></label>
                                </td>
                                <td>${postInfo.id}</td>
                                <td class="table-text">${postInfo.title}</td>
                                <td class="text-blue">${postInfo.nickname}</td>
                                <td>${postInfo.tag}</td>
                                <td>${postInfo.add_time}</td>
                                <td>${postNum.collection_num}</td>
                                <td class="text-blue">${postNum.comment_num}</td>
                                <td>${postNum.point_num}</td>
                                <td class="text-blue">${postNum.remark_num}</td>
                                <td>${postNum.select_num}</td>
                                ${postStatus}
                                <td><a href="" class="user-edit"><i class="fa fa-edit"></i></a></td>
                                
                            </tr>`;
                    
                }
                $('#tableSort>tbody').html(postHtml);
                // TableSort();

                // 渲染分页按钮
                if (pageNum > 1 && num > 1) {
                    btnHtml += `<button type="button" class="btn btn-yellow">上一页</button>`;
                }
                for (var i = 1; i <= pageNum; i++) {
                    if (i == num) {
                        btnHtml += `<button type="button" class="btn btn-yellow active">${i}</button>`;
                    } else {
                        btnHtml += `<button type="button" class="btn btn-yellow">${i}</button>`;
                    }
                }
                if (pageNum > 1 && num < pageNum) {
                    btnHtml += `<button type="button" class="btn btn-yellow">下一页</button>`;
                }
                $('.page-btn').html(btnHtml);



                $('#page-all').html(postUser);
                $('.num-icon').html(postUser);
                $('#page-star').html((num - 1) * 9 + 1);
                $('#page-end').html((num - 1) * 9 + postList.length);

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("页面加载失败，请检查网络后重试");
                // console.log("页面加载失败，请检查网络后重试");
            }
        });
    }
    pageAjax(1);

    // 分页按钮点击
    $('.page-btn').on('click', '.btn', function () {
        var toNum = $(this).html();
        var dNum = parseInt($('.page-btn .active').html());
        if (toNum == '上一页') {
            pageAjax(dNum - 1);
        } else if (toNum == '下一页') {
            pageAjax(dNum + 1);
        } else {
            pageAjax(toNum);
        }
    });

    function checkbox() {
        var checkeds = [];
        $("input[type=checkbox].checkbix[data-color=yellow]:checked").each(function () {
            var checkedId = $(this).attr('id').split('-')[0].slice(4);
            if (checkedId != 'All') {
                checkeds.push(checkedId);
            }
        })
        return checkeds;
    }
    // 禁用
    $('#postDisable').on('click', function () {
        var checkeds = checkbox();
        if (checkeds == '') {
            alert("请选择要设置的选项！");
            return false;
        }
        $.ajax({
            type: "POST",
            url: "http://gimi321.com/admin.php/user_userforbidden",
            data: { 'id': checkeds , 'type' : 2 },
            dataType: 'JSON',
            cache: false,
            success: function (response) {
                for (var i = 0; i < checkeds.length; i++) {
                    var check = 'post' + checkeds[i] + '-mycheckbox';
                    $("#" + check).parent('td').siblings('.text-status').removeClass('text-green').removeClass('text-purple').addClass('text-yellow').html('禁用');
                    $("#" + check).attr('checked', false);
                }
                alert('设置成功！');
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("设置失败，请检查网络后重试。");
            }
        });
    });
    // 启用
    $('#postEnabled').on('click', function () {
        var checkeds = checkbox();
        if (checkeds == '') {
            alert("请选择要设置的选项！");
            return false;
        }
        $.ajax({
            type: "POST",
            url: "http://gimi321.com/admin.php/user_userstart",
            data: { 'id': checkeds , 'type' : 2 },
            dataType: 'JSON',
            cache: false,
            success: function (response) {
                for (var i = 0; i < checkeds.length; i++) {
                    var check = 'post' + checkeds[i] + '-mycheckbox';
                    $("#" + check).parent('td').siblings('.text-status').removeClass('text-yellow').addClass('text-purple').html('待审核');
                    $("#" + check).attr('checked', false);
                }
                alert('设置成功！');
                //  location.reload();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("设置失败，请检查网络后重试。");
            }
        });
    });
    // 删除
    $('#postDelete').on('click', function () {
        var checkeds = checkbox();
        if (checkeds == '') {
            alert("请选择要设置的选项！");
            return false;
        }
        if (confirm('确定删除该用户？')) {
            $.ajax({
                type: "POST",
                url: "http://gimi321.com/admin.php/user_userdelete",
                data: { 'id': checkeds , 'type' : 8 },
                dataType: 'JSON',
                cache: false,
                success: function (response) {
                    alert('删除成功');
                    location.reload();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('删除失败！请检查网络后重试。');
                }
            });
        } else {
            for (var i = 0; i < checkeds.length; i++) {
                var check = 'user' + checkeds[i] + '-mycheckbox';
                $("#" + check).attr('checked', false);
            }
            return false;
        }
    });
    // 过审
    $('#postPass').on('click', function () {
        var checkeds = checkbox();
        if (checkeds == '') {
            alert("请选择要设置的选项！");
            return false;
        }
        $.ajax({
            type: "POST",
            url: "http://gimi321.com/admin.php/articlemanage_audit",
            data: { 'id': checkeds , 'type' : 1 },
            dataType: 'JSON',
            cache: false,
            success: function (response) {
                for (var i = 0; i < checkeds.length; i++) {
                    var check = 'post' + checkeds[i] + '-mycheckbox';
                    $("#" + check).parent('td').siblings('.text-status').removeClass('text-yellow').removeClass('text-purple').addClass('text-green').html('可见');
                    $("#" + check).attr('checked', false);
                }
                alert('设置成功！');
                //  location.reload();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("设置失败，请检查网络后重试。");
            }
        });
    });

    // 搜索
    $('#header-search').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($(this).val() != '') {
                e.preventDefault();
                console.log('搜索');
                var num = 1;
                $.ajax({
                    type: "POST",
                    url: "http://gimi321.com/admin.php/articlemanage_articleadminsearch",
                    data: { 'search': $(this).val() , 'page' : num },
                    dataType: 'JSON',
                    cache: false,
                    success: function (response) {
                        // 搜索错误触发
                        if(response.msg=='user_data no change'){
                            $('#tableSort>tbody').html('<h3>搜索结果不存在！</h3>');
                            return false;
                        }
                       // 用户列表数据
                        var postList = response.data.info;
                        var pageNum = response.data.sum;
                        var postUser = response.data.article_num;
                        var postHtml = '';
                        var btnHtml = '';
                        // 渲染数据
                        for (var i = 0; i < postList.length; i++) {
                            var postNum = postList[i];
                            var postInfo = postList[i].publish_info;
                            var postStatus;
                            switch(postInfo.is_visible){
                                    case 0:
                                    postStatus='<td class="text-status text-yellow">禁用</td>';
                                    break;
                                    case 1:
                                    postStatus='<td class="text-status text-purple">待审核</td>';
                                    break;
                                    case 2:
                                    postStatus='<td class="text-status text-green">可见</td>'; 
                                    break;
                                
                            }

                            postHtml +=`<tr>
                                        <td>
                                            <input id="post${postInfo.id}-mycheckbox" name="post-contorl" data-color="yellow" type="checkbox" class="checkbix" data-text="">
                                            <label aria-label="" role="checkbox" for="post${postInfo.id}-mycheckbox" class="checkbix"><span class=""></span></label>
                                        </td>
                                        <td>${postInfo.id}</td>
                                        <td class="table-text">${postInfo.title}</td>
                                        <td class="text-blue">${postInfo.nickname}</td>
                                        <td>${postInfo.tag}</td>
                                        <td>${postInfo.add_time}</td>
                                        <td>${postNum.collection_num}</td>
                                        <td class="text-blue">${postNum.comment_num}</td>
                                        <td>${postNum.point_num}</td>
                                        <td class="text-blue">${postNum.remark_num}</td>
                                        <td>${postNum.select_num}</td>
                                        ${postStatus}
                                        <td><a href="" class="user-edit"><i class="fa fa-edit"></i></a></td>
                                        
                                    </tr>`;
                            
                        }
                        $('#tableSort>tbody').html(postHtml);
                        // TableSort();

                        // 渲染分页按钮
                        if (pageNum > 1 && num > 1) {
                            btnHtml += `<button type="button" class="btn btn-yellow">上一页</button>`;
                        }
                        for (var i = 1; i <= pageNum; i++) {
                            if (i == num) {
                                btnHtml += `<button type="button" class="btn btn-yellow active">${i}</button>`;
                            } else {
                                btnHtml += `<button type="button" class="btn btn-yellow">${i}</button>`;
                            }
                        }
                        if (pageNum > 1 && num < pageNum) {
                            btnHtml += `<button type="button" class="btn btn-yellow">下一页</button>`;
                        }
                        $('.page-btn').html(btnHtml);

                        $('#page-star').html((num - 1) * 9 + 1);
                        $('#page-end').html((num - 1) * 9 + postList.length);

                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        // alert("页面加载失败，请检查网络后重试");
                        console.log("页面加载失败，请检查网络后重试");
                    }
                });
            } else {
                return false;
            }
        }

    });
    $('#header-search').bind('input propertychange', function() {
        if($(this).val() == ''){
            pageAjax(1);
        }
    });


})();