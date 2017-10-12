
(function () {
    // 标签页
    function pageAjax(num) {
        $.ajax({
            type: "POST",
            url: "http://gimi321.com/admin.php/tag_alladmintag",
            data: { 'page': num },
            dataType: 'JSON',
            cache: false,
            success: function (response) {
                // 用户列表数据
                var tagList = response.data.info;
                var pageNum = response.data.sum;
                var tagHtml = '';
                var btnHtml = '';
                // 渲染数据
                for (var i = 0; i < tagList.length; i++) {
                    var tagInfo = tagList[i];
                    tagHtml +=`<tr>
                                <td>
                                    <input id="tag${tagInfo.id}-mycheckbox" name="tag-contorl" data-color="yellow" type="checkbox" class="checkbix" data-text="">
                                    <label aria-label="" role="checkbox" for="tag${tagInfo.id}-mycheckbox" class="checkbix"><span class=""></span></label>
                                </td>
                                <td>${(num - 1) * 9 + i + 1}</td>
                                <td>${tagInfo.tag}</td>
                                <td>${tagInfo.add_time}</td>
                            </tr>`
                }
                // <td><a href="user_detail.html?type=${userInfo.id}&userImg=${userInfo.icon_link}&userName=${userInfo.nickname}&userSex=${userInfo.sex}&userBirth=${birth}&userIntro=${userInfo.intro}&userLocation=${userInfo.location}" class="user-edit"><i class="fa fa-edit"></i></a></td>
                $('#tableSort>tbody').html(tagHtml);
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
                //     console.log(userList.length);
                //     userAll += pageNum[i].data.info.length;
                // }

                $('#page-all').html(10);
                $('#page-star').html((num - 1) * 9 + 1);
                $('#page-end').html((num - 1) * 9 + tagList.length);

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
            var checkedId = $(this).attr('id').split('-')[0].slice(3);
            if (checkedId != 'All') {
                checkeds.push(checkedId);
            }
        })
        return checkeds;
    }
    
    // 删除
    $('#tagDelete').on('click', function () {
        var checkeds = checkbox();
        if (checkeds == '') {
            alert("请选择要设置的选项！");
            return false;
        }
        if (confirm('确定删除该标签？')) {
            $.ajax({
                type: "POST",
                url: "http://gimi321.com/admin.php/tag_deleteadmintag",
                data: { 'id[]': checkeds },
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

     // 搜索
    $('#header-search').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($(this).val() != '') {
                e.preventDefault();
                console.log('提交');
                $.ajax({
                    type: "POST",
                    url: "http://gimi321.com/admin.php/tag_tagsearch",
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
                        var tagList = response.data.info;
                        var pageNum = response.data.sum;
                        var tagHtml = '';
                        var btnHtml = '';
                        // 渲染数据
                        for (var i = 0; i < tagList.length; i++) {
                            var tagInfo = tagList[i];
                            tagHtml +=`<tr>
                                        <td>
                                            <input id="tag${tagInfo.id}-mycheckbox" name="tag-contorl" data-color="yellow" type="checkbox" class="checkbix" data-text="">
                                            <label aria-label="" role="checkbox" for="tag${tagInfo.id}-mycheckbox" class="checkbix"><span class=""></span></label>
                                        </td>
                                        <td>${(num - 1) * 9 + i + 1}</td>
                                        <td>${tagInfo.tag}</td>
                                        <td>${tagInfo.add_time}</td>
                                    </tr>`
                        }
                        // <td><a href="user_detail.html?type=${userInfo.id}&userImg=${userInfo.icon_link}&userName=${userInfo.nickname}&userSex=${userInfo.sex}&userBirth=${birth}&userIntro=${userInfo.intro}&userLocation=${userInfo.location}" class="user-edit"><i class="fa fa-edit"></i></a></td>
                        $('#tableSort>tbody').html(tagHtml);
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
                        //     console.log(userList.length);
                        //     userAll += pageNum[i].data.info.length;
                        // }

                        $('#page-all').html(10);
                        $('#page-star').html((num - 1) * 9 + 1);
                        $('#page-end').html((num - 1) * 9 + tagList.length);

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