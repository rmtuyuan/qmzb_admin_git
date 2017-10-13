(function ($) {
    //获取url参数的封装函数
    //decodeURI() 和 decodeURIComponent()
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&|#)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    }
    $.mygetUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

        var r = window.location.hash.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    }
})(jQuery);

(function () {
    $(".left-side").load('left_side.html', function () {
        var item_active = $.getUrlParam("item");
        if ( $("." + item_active).parent("ul").hasClass("sub-menu-list")) {
            $("." + item_active).parent("ul").parent("li.menu-list").addClass("nav-active").siblings("li").removeClass('active');
            $("." + item_active).addClass("active").siblings("li").removeClass('active');
        }else{
           $("." + item_active).addClass("active").siblings("li").removeClass('active');
        }
        var leng = $("li.active").attr("class").split(" ")[0].split("-")[2];

        if (leng > 12) {
            $('.left-side').scrollTop($('.left-side')[0].scrollHeight);
        }

        $('.menu-list > a').click(function () {

            var parent = $(this).parent();
            var sub = parent.find('> ul');
            if (sub.is(':visible')) {
                sub.slideUp(200, function () {
                    parent.removeClass('nav-active');
                    //    $('.main-content').css({height: ''});
                    //    mainContentHeightAdjust();
                });
            } else {
                visibleSubMenuClose();
                parent.addClass('nav-active');
                sub.slideDown(200, function () {
                    // mainContentHeightAdjust();
                });
            }
            return false;
        });


    });
    $(".main-header").load('main_header.html', function () {

        format(new Date());

        if ($("#Clock_2").length > 0) {
            format2(new Date());
        }
        $(".quit-login").click(function () {
            //退出登录
            //清除缓存
            window.location.href = "login.html";

        })
        //加载时间 和头像

    });
    // 左侧开关按钮
    $('.menu-list > a').click(function () {

        var parent = $(this).parent();
        var sub = parent.find('> ul');
        if (sub.is(':visible')) {
            sub.slideUp(200, function () {
                parent.removeClass('nav-active');
                //    $('.main-content').css({height: ''});
                //    mainContentHeightAdjust();
            });
        } else {
            visibleSubMenuClose();
            parent.addClass('nav-active');
            sub.slideDown(200, function () {
                // mainContentHeightAdjust();
            });
        }
        return false;
    });

    function visibleSubMenuClose() {
        $('.menu-list').each(function () {
            var t = $(this);
            if (t.hasClass('nav-active')) {
                t.find('> ul').slideUp(200, function () {
                    t.removeClass('nav-active');
                });
            }
        });
    }

    // 全选
    function selectAll(name, type) {
        if (name != null && name != "") {
            var userids = $("input[name='" + name + "']");
            if (userids != undefined && userids.length > 0) {
                if (type == "all") {
                    for (var i = 0; i < userids.length; i++) {
                        if (userids[i].checked == false) {
                            userids[i].checked = true;
                        }
                    }
                } else if (type == "notAll") {
                    for (var i = 0; i < userids.length; i++) {
                        if (userids[i].checked == true) {
                            userids[i].checked = false;
                        }
                    }
                } else if (type == "reAll") {
                    for (var i = 0; i < userids.length; i++) {
                        if (userids[i].checked == true) {
                            userids[i].checked = false;
                        } else {
                            userids[i].checked = true;
                        }
                    }
                }
            }
        }
    }

    // 图片添加
    $('#imgs-add>input').change(function (e) {
        var file = this.files[0];
        var imgPath = $(this).val();
        if (imgPath == "") {
            return false;
        } else {
            var imgUrl = window.URL.createObjectURL(this.files[0]);
        }
        if (!/image\/\w+/.test(file.type)) {
            alert("请确保文件为图像类型");
            return false;
        }
        if (file.size > 2000000) {
            alert('图片过大,不得超过2M！');
            return false;
        }
        var imgs_html = '<div class="img-cover"><span></span><img src="' + imgUrl + '" width="109px" height="109px" alt=""></div>';
        $("#imgs-add").before(imgs_html);

        $(".img-cover").on("click", "span", function () {
            $(this).parent(".img-cover").remove();
        });
    });
    // 图片删除
    $(".img-cover").on("click", "span", function () {
        $(this).parent(".img-cover").remove();
    });

    // 图片添加
    $('#imgs-add-content>input').change(function (e) {
        var file = this.files[0];
        var imgPath = $(this).val();
        if (imgPath == "") {
            return false;
        } else {
            var imgUrl = window.URL.createObjectURL(this.files[0]);
        }
        if (!/image\/\w+/.test(file.type)) {
            alert("请确保文件为图像类型");
            return false;
        }
        if (file.size > 2000000) {
            alert('图片过大,不得超过2M！');
            return false;
        }
        var imgs_html = '<div class="img-cover"><span></span><img src="' + imgUrl + '" width="109px" height="109px" alt=""></div>';
        $("#imgs-add-content").before(imgs_html);

        $(".img-cover").on("click", "span", function () {
            $(this).parent(".img-cover").remove();
        });
    });
    // 图片删除
    $(".img-cover").on("click", "span", function () {
        $(this).parent(".img-cover").remove();
    });


    // 用户管理全选 user1-mycheckbox
    $('#userAll-mycheckbox').change(function () {
        if (this.checked == true) {
            selectAll('user-contorl', 'all');
        } else {
            selectAll('user-contorl', 'notAll');
        }
    });
    // 用户管理全选
    $('#postAll-mycheckbox').change(function () {
        if (this.checked == true) {
            selectAll('post-contorl', 'all');
        } else {
            selectAll('post-contorl', 'notAll');
        }
    });
    // 评论管理全选
    $('#commentAll-mycheckbox').change(function () {
        if (this.checked == true) {
            selectAll('comment-contorl', 'all');
        } else {
            selectAll('comment-contorl', 'notAll');
        }
    });
    // 标签管理全选
    $('#tagAll-mycheckbox').change(function () {
        if (this.checked == true) {
            selectAll('tag-contorl', 'all');
        } else {
            selectAll('tag-contorl', 'notAll');
        }
    });
    // 标签管理全选
    $('#orderAll-mycheckbox').change(function () {
        if (this.checked == true) {
            selectAll('order-contorl', 'all');
        } else {
            selectAll('order-contorl', 'notAll');
        }
    });
    // 标签管理全选
    $('#pushAll-mycheckbox').change(function () {
        if (this.checked == true) {
            selectAll('push-contorl', 'all');
        } else {
            selectAll('push-contorl', 'notAll');
        }
    });
    // 普通商品的select颜色
    $('.shop-select>select').change(function () {
        var selectVal = $(this).val();
        if (selectVal == 'online') {
            $(this).removeClass('text-yellow').addClass('text-green');

        } else if (selectVal == 'offline') {
            $(this).removeClass('text-green').addClass('text-yellow');
        }
    });
    // 颜色色值
    $('#color-num').blur(function () {
        var colorNum = $(this).val();
        $(this).siblings('.color-span').css('background', colorNum);
    });

    Checkbix.init();
    // 表格排序
    TableSort();
    // 时间
    // format(new Date());
    //  format2(new Date());

    // 验证
    // validator();
    //    调整主要内容高度
    //    function mainContentHeightAdjust() {
    //       // Adjust main content height
    //       var docHeight = $(document).height();
    //       if(docHeight > $('.main-content').height())
    //          $('.main-content').height(docHeight);
    //    }

    //  class add mouse hover
    // $('.custom-nav > li').hover(function () {
    //     $(this).addClass('nav-hover');
    // }, function () {
    //     $(this).removeClass('nav-hover');
    // });

})();