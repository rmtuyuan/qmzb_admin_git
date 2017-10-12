// FIX ME ALL USERNUM
(function () {
    // 用户列表
    function pageAjax(num) {
        $.ajax({
            type: "POST",
            url: "http://gimi321.com/admin.php/articlecommentmanage_alladmincomment",
            data: { 'page': num },
            dataType: 'JSON',
            cache: false,
            success: function (response) {
                // 用户列表数据
                var commentList = response.data.info;
                var pageNum = response.data.sum;
                var allComment = response.data.articlecomment_num;
                var commentHtml = '';
                var btnHtml = '';
                // 渲染数据
                for (var i = 0; i < commentList.length; i++) {
                    var commentInfo = commentList[i];
                    var commentStatus;
                    switch(commentInfo.is_state){
                            case 0:
                            commentStatus='<td class="text-status text-yellow">禁用</td>';
                            break;
                            case 1:
                            commentStatus='<td class="text-status text-purple">待审核</td>';
                            break;
                            case 2:
                            commentStatus='<td class="text-status text-green">可见</td>'; 
                            break;
                        
                    }
                    commentHtml +=`<tr>
                                <td>
                                    <input id="comment${commentInfo.id}-mycheckbox" name="comment-contorl" data-color="yellow" type="checkbox" class="checkbix" data-text="">
                                    <label aria-label="" role="checkbox" for="comment${commentInfo.id}-mycheckbox" class="checkbix"><span class=""></span></label>
                                </td>
                                <td class="table-text text-blue">${commentInfo.title}</td>
                                <td class="text-blue">${commentInfo.nickname}</td>
                                <td>${commentInfo.add_time}</td>
                                <td class="table-text">${commentInfo.content}</td>
                                ${commentStatus}
                                </tr>`;
            
                }
                $('#tableSort>tbody').html(commentHtml);
                TableSort();

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

                // 总数据
                // for(var i = 1;i < pageNum; i++){
                //     var userAll;
                //     console.log(commentList.length);
                //     userAll += pageNum[i].data.info.length;
                // }

                $('#page-all').html(allComment);
                $('.num-icon').html(allComment);
                $('#page-star').html((num - 1) * 9 + 1);
                $('#page-end').html((num - 1) * 9 + commentList.length);

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
            var checkedId = $(this).attr('id').split('-')[0].slice(7);
            if (checkedId != 'All') {
                checkeds.push(checkedId);
            }
        })
        return checkeds;
    }
    // 禁用
    $('#commentDisable').on('click', function () {
        var checkeds = checkbox();
        if (checkeds == '') {
            alert("请选择要设置的选项！");
            return false;
        }
        $.ajax({
            type: "POST",
            url: "http://gimi321.com/admin.php/user_userforbidden",
            data: { 'id': checkeds,'type': 3 },
            dataType: 'JSON',
            cache: false,
            success: function (response) {
                for (var i = 0; i < checkeds.length; i++) {
                    var check = 'comment' + checkeds[i] + '-mycheckbox';
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
    // 过审
    $('#commentPass').on('click', function () {
        var checkeds = checkbox();
        if (checkeds == '') {
            alert("请选择要设置的选项！");
            return false;
        }
        $.ajax({
            type: "POST",
            url: "http://gimi321.com/admin.php/articlemanage_audit",
            data: { 'id': checkeds,'type': 2 },
            dataType: 'JSON',
            cache: false,
            success: function (response) {
                for (var i = 0; i < checkeds.length; i++) {
                    var check = 'comment' + checkeds[i] + '-mycheckbox';
                    $("#" + check).parent('td').siblings('.text-status').removeClass('text-yellow').removeClass('text-purple').addClass('text-green').html('可见');
                    $("#" + check).attr('checked', false);
                }
                alert('设置成功！');
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("设置失败，请检查网络后重试。");
            }
        });
    });
    // 删除
    $('#commentDelete').on('click', function () {
        var checkeds = checkbox();
        if (checkeds == '') {
            alert("请选择要设置的选项！");
            return false;
        }
        if (confirm('确定删除该用户？')) {
            $.ajax({
                type: "POST",
                url: "http://gimi321.com/admin.php/articlecommentmanage_admindelete",
                data: { 'id': checkeds ,'type': 1 },
                dataType: 'JSON',
                cache: false,
                success: function (response) {
                    //  console.log('已修改为禁用');
                    alert('删除成功');
                    location.reload();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('删除失败！请检查网络后重试。');
                }
            });
        } else {
            for (var i = 0; i < checkeds.length; i++) {
                var check = 'comment' + checkeds[i] + '-mycheckbox';
                $("#" + check).attr('checked', false);
            }
            return false;
        }
    });
     // 启用
    $('#commentEnabled').on('click', function () {
        var checkeds = checkbox();
        if (checkeds == '') {
            alert("请选择要设置的选项！");
            return false;
        }
        $.ajax({
            type: "POST",
            url: "http://gimi321.com/admin.php/user_userstart",
            data: { 'id': checkeds , 'type' : 3 },
            dataType: 'JSON',
            cache: false,
            success: function (response) {
                for (var i = 0; i < checkeds.length; i++) {
                    var check = 'comment' + checkeds[i] + '-mycheckbox';
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


})();