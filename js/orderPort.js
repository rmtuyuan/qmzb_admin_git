// FIX ME ALL USERNUM
(function () {
    // 用户列表
    function pageAjax(num) {
        $.ajax({
            type: "POST",
            url: "http://gimi321.com/admin.php/ordermanage_allorder",
            data: { 'page': num },
            dataType: 'JSON',
            cache: false,
            success: function (response) {
                // 用户列表数据
                var orderList = response.data.info;
                var pageNum = response.data.sum;
                var orderHtml = '';
                var btnHtml = '';
                // 渲染数据
                for (var i = 0; i < orderList.length; i++) {
                    var orderInfo = orderList[i].order_info;
                    var orderStatus;
                    switch(orderInfo.status){
                            case 0:
                            orderStatus='<td class="text-purple">订单已取消</td>';
                            break;
                            case 1:
                            orderStatus='<td class="text-blue">订单兑换成功</td>';
                            break;
                            case 2:
                            orderStatus='<td class="text-yellow">待发货</td>'; 
                            break;
                            case 3:
                            orderStatus='<td class="text-green">已发货</td>';
                            break;
                            case 4:
                            orderStatus='<td class="text-red">已关闭</td>';
                            break;
                    }

                    orderHtml +=`<tr>
                                <td>
                                    <input id="order${orderInfo.order_id}-mycheckbox" name="order-contorl" data-color="yellow" type="checkbox" class="checkbix" data-text="">
                                    <label aria-label="" role="checkbox" for="order${orderInfo.order_id}-mycheckbox" class="checkbix"><span class=""></span></label>
                                </td>
                                <td class="text-blue">${orderInfo.order_id}</td>
                                <td>${orderInfo.add_time}</td>
                                <td>${orderInfo.user_id}</td>
                                <td>${orderInfo.address.province }</td>
                                <td>${orderInfo.category_name}</td>
                                <td>${orderInfo.express_id}</td>
                                <td>${orderInfo.remark}</td>
                                ${orderStatus}
                                <td><a href="" class="user-edit"><i class="fa fa-edit"></i></a></td>
                            </tr>`;
                   
                }
                $('#tableSort>tbody').html(orderHtml);
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
                //     console.log(orderList.length);
                //     userAll += pageNum[i].data.info.length;
                // }

                $('#page-all').html(10);
                $('#page-star').html((num - 1) * 9 + 1);
                $('#page-end').html((num - 1) * 9 + orderList.length);

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
                        var orderList = response.data;
                        // var pageNum = response.data.sum;
                        var orderHtml = '';
                        var btnHtml = '';
                        // 渲染数据
                        for (var i = 0; i < orderList.length; i++) {
                            var userNum = orderList[i];
                            var orderInfo = orderList[i].user_info;
                            // 日期格式化
                            var datatime = new Date(parseInt(orderInfo.birth) * 1000);
                            var y = datatime.getFullYear();
                            var m = datatime.getMonth() + 1;
                            m < 10 && (m = '0' + m);
                            var d = datatime.getDate();
                            d < 10 && (d = '0' + d);
                            var birth = y + "-" + m + "-" + d;

                            orderHtml += `<tr>
                                <td>
                                    <input id="user${orderInfo.id}-mycheckbox" name="user-contorl" data-color="yellow" type="checkbox" class="checkbix" data-text="">
                                    <label aria-label="" role="checkbox" for="user${orderInfo.id}-mycheckbox" class="checkbix"><span class=""></span></label>
                                </td>
                                <td>${ i + 1}</td>
                                <td><img src="${orderInfo.icon_link}" alt=""></td>
                                <td>${orderInfo.nickname}</td>
                                <td>${orderInfo.sex == 0 ? '女' : '男'}</td>
                                <td>${birth}</td>
                                <td class="table-text">${orderInfo.intro}</td>
                                <td>${orderInfo.location}</td>
                                <td>${userNum.score_num}</td>
                                <td>${userNum.hot_num}</td>
                                
                                <td>${orderInfo.phone}</td>
                                <td>${orderInfo.add_time}</td>
                                <td class="text-blue">${userNum.publish_num}</td>
                                <td class="text-blue">${userNum.comment_num}</td>
                                <td class="text-blue">${userNum.order_num}</td>
                                ${orderInfo.is_state == 1 ? '<td class="text-status text-green">正常</td>' : '<td class="text-status text-yellow">禁用</td>'}
                                <td><a href="user_detail.html?type=${orderInfo.id}&icon_link=${orderInfo.icon_link}&nickname=${orderInfo.nickname}&sex=${orderInfo.sex == 0 ? '女' : '男'}&birth=${birth}&intro=${orderInfo.intro}&location=${orderInfo.location}&score_num=${userNum.score_num}&hot_num=${userNum.hot_num}&phone=${orderInfo.phone}&add_time=${orderInfo.add_time}&publish_num=${userNum.publish_num}&comment_num=${userNum.comment_num}&order_num=${userNum.order_num}&is_state=${orderInfo.is_state}" class="user-edit"><i class="fa fa-edit"></i></a></td>
                            </tr>`;
                        }
                        // <td><a href="user_detail.html?type=${orderInfo.id}&userImg=${orderInfo.icon_link}&userName=${orderInfo.nickname}&userSex=${orderInfo.sex}&userBirth=${birth}&userIntro=${orderInfo.intro}&userLocation=${orderInfo.location}" class="user-edit"><i class="fa fa-edit"></i></a></td>
                        $('#tableSort>tbody').html(orderHtml);
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
                        //     console.log(orderList.length);
                        //     userAll += pageNum[i].data.info.length;
                        // }

                        $('#page-all').html(10);
                        // $('#page-star').html((num - 1) * 9 + 1);
                        // $('#page-end').html((num - 1) * 9 + orderList.length);

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