// FIX ME ALL USERNUM
(function () {
    // 用户列表
    function pageAjax(num) {
        $.ajax({
            type: "POST",
            url: "http://gimi321.com/admin.php/noticemanage_allpushnotice",
            data: { 'page': num },
            dataType: 'JSON',
            cache: false,
            success: function (response) {
                // 用户列表数据
                var pushList = response.data.info;
                var pageNum = response.data.sum;
                var pushHtml = '';
                var btnHtml = '';
                // 渲染数据
                for (var i = 0; i < pushList.length; i++) {
                    var pushInfo = pushList[i];
                   
                    pushHtml +=`<tr>
                                <td>
                                    <input id="push${pushInfo.id}-mycheckbox" name="push-contorl" data-color="yellow" type="checkbox" class="checkbix" data-text="">
                                    <label aria-label="" role="checkbox" for="push${pushInfo.id}-mycheckbox" class="checkbix"><span class=""></span></label>
                                </td>
                                <td>${pushInfo.content}</td>
                                <td>${pushInfo.add_time}</td>
                                <td>未知</td>
                                ${pushInfo.is_delete == 1 ? '<td class="text-status text-green">已推送</td>' : '<td class="text-status text-yellow">待推送</td>'}
                                <td><a href="" class="user-edit"><i class="fa fa-edit"></i></a></td>
                            </tr>`;
                    
                }
                $('#tableSort>tbody').html(pushHtml);
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
                //     console.log(pushList.length);
                //     userAll += pageNum[i].data.info.length;
                // }

                $('#page-all').html(10);
                $('#page-star').html((num - 1) * 9 + 1);
                $('#page-end').html((num - 1) * 9 + pushList.length);

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // alert("页面加载失败，请检查网络后重试");
                console.log("页面加载失败，请检查网络后重试");
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
    $('#userDisable').on('click', function () {
        var checkeds = checkbox();
        if (checkeds == '') {
            alert("请选择要设置的选项！");
            return false;
        }
        $.ajax({
            type: "POST",
            url: "http://gimi321.com/admin.php/user_userforbidden",
            data: { 'id': checkeds },
            dataType: 'JSON',
            cache: false,
            success: function (response) {
                for (var i = 0; i < checkeds.length; i++) {
                    var check = 'user' + checkeds[i] + '-mycheckbox';
                    $("#" + check).parent('td').siblings('.text-status').removeClass('text-green').addClass('text-yellow').html('禁用');
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
    $('#userEnabled').on('click', function () {
        var checkeds = checkbox();
        if (checkeds == '') {
            alert("请选择要设置的选项！");
            return false;
        }
        $.ajax({
            type: "POST",
            url: "http://gimi321.com/admin.php/user_userstart",
            data: { 'id': checkeds },
            dataType: 'JSON',
            cache: false,
            success: function (response) {
                for (var i = 0; i < checkeds.length; i++) {
                    var check = 'user' + checkeds[i] + '-mycheckbox';
                    $("#" + check).parent('td').siblings('.text-status').removeClass('text-yellow').addClass('text-green').html('正常');
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
    $('#userDelete').on('click', function () {
        var checkeds = checkbox();
        if (checkeds == '') {
            alert("请选择要设置的选项！");
            return false;
        }
        if (confirm('确定删除该用户？')) {
            $.ajax({
                type: "POST",
                url: "http://gimi321.com/admin.php/user_userdelete",
                data: { 'id': checkeds },
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
                var check = 'user' + checkeds[i] + '-mycheckbox';
                $("#" + check).attr('checked', false);
            }
            return false;
        }
    });

    // 搜索
    $('#header-search').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($(this).val() != '') {
                e.preventDefault();
                console.log('提交');
                $.ajax({
                    type: "POST",
                    url: "http://gimi321.com/admin.php/user_useradminsearch",
                    data: { 'search': $(this).val() },
                    dataType: 'JSON',
                    cache: false,
                    success: function (response) {
                        // 搜索错误触发
                        if(response.msg=='user_data no change'){
                            $('#tableSort>tbody').html('<h3>搜索结果不存在！</h3>');
                            return false;
                        }
                        // 用户列表数据
                        var pushList = response.data;
                        // var pageNum = response.data.sum;
                        var pushHtml = '';
                        var btnHtml = '';
                        // 渲染数据
                        for (var i = 0; i < pushList.length; i++) {
                            var userNum = pushList[i];
                            var pushInfo = pushList[i].user_info;
                            // 日期格式化
                            var datatime = new Date(parseInt(pushInfo.birth) * 1000);
                            var y = datatime.getFullYear();
                            var m = datatime.getMonth() + 1;
                            m < 10 && (m = '0' + m);
                            var d = datatime.getDate();
                            d < 10 && (d = '0' + d);
                            var birth = y + "-" + m + "-" + d;

                            pushHtml += `<tr>
                                <td>
                                    <input id="user${pushInfo.id}-mycheckbox" name="user-contorl" data-color="yellow" type="checkbox" class="checkbix" data-text="">
                                    <label aria-label="" role="checkbox" for="user${pushInfo.id}-mycheckbox" class="checkbix"><span class=""></span></label>
                                </td>
                                <td>${ i + 1}</td>
                                <td><img src="${pushInfo.icon_link}" alt=""></td>
                                <td>${pushInfo.nickname}</td>
                                <td>${pushInfo.sex == 0 ? '女' : '男'}</td>
                                <td>${birth}</td>
                                <td class="table-text">${pushInfo.intro}</td>
                                <td>${pushInfo.location}</td>
                                <td>${userNum.score_num}</td>
                                <td>${userNum.hot_num}</td>
                                
                                <td>${pushInfo.phone}</td>
                                <td>${pushInfo.add_time}</td>
                                <td class="text-blue">${userNum.publish_num}</td>
                                <td class="text-blue">${userNum.comment_num}</td>
                                <td class="text-blue">${userNum.order_num}</td>
                                ${pushInfo.is_state == 1 ? '<td class="text-status text-green">正常</td>' : '<td class="text-status text-yellow">禁用</td>'}
                                <td><a href="user_detail.html?type=${pushInfo.id}&icon_link=${pushInfo.icon_link}&nickname=${pushInfo.nickname}&sex=${pushInfo.sex == 0 ? '女' : '男'}&birth=${birth}&intro=${pushInfo.intro}&location=${pushInfo.location}&score_num=${userNum.score_num}&hot_num=${userNum.hot_num}&phone=${pushInfo.phone}&add_time=${pushInfo.add_time}&publish_num=${userNum.publish_num}&comment_num=${userNum.comment_num}&order_num=${userNum.order_num}&is_state=${pushInfo.is_state}" class="user-edit"><i class="fa fa-edit"></i></a></td>
                            </tr>`;
                        }
                        // <td><a href="user_detail.html?type=${pushInfo.id}&userImg=${pushInfo.icon_link}&userName=${pushInfo.nickname}&userSex=${pushInfo.sex}&userBirth=${birth}&userIntro=${pushInfo.intro}&userLocation=${pushInfo.location}" class="user-edit"><i class="fa fa-edit"></i></a></td>
                        $('#tableSort>tbody').html(pushHtml);
                        TableSort();

                        // 渲染分页按钮
                        // if (pageNum > 1 && num > 1) {
                        //     btnHtml += `<button type="button" class="btn btn-yellow">上一页</button>`;
                        // }
                        // for (var i = 1; i <= pageNum; i++) {
                        //     if (i == num) {
                        //         btnHtml += `<button type="button" class="btn btn-yellow active">${i}</button>`;
                        //     } else {
                        //         btnHtml += `<button type="button" class="btn btn-yellow">${i}</button>`;
                        //     }
                        // }
                        // if (pageNum > 1 && num < pageNum) {
                        //     btnHtml += `<button type="button" class="btn btn-yellow">下一页</button>`;
                        // }
                        // $('.page-btn').html(btnHtml);

                        // 总数据
                        // for(var i = 1;i < pageNum; i++){
                        //     var userAll;
                        //     console.log(pushList.length);
                        //     userAll += pageNum[i].data.info.length;
                        // }

                        $('#page-all').html(10);
                        // $('#page-star').html((num - 1) * 9 + 1);
                        // $('#page-end').html((num - 1) * 9 + pushList.length);

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



})();