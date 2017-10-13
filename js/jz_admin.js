// 提示框的 逻辑
function showInfo(text) {
    $("body").addClass("overflow-hidden");
    $(".info-text").html(text);
    $(".modal-info").show();

}
$(".info-sure").click(function (e) {
    e.preventDefault();
    $("body").removeClass("overflow-hidden");
    $(".modal-info").hide();
});

function openHref(url) {
    $(".info-sure-2").click(function (e) {
        e.preventDefault();
        window.location.href = url;
    });
}
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

//家族 后台功能
//登录成功后 获取 
//公众功能



var login_uid = null; //uid
var server = "http://192.168.1.4:8081//"; //http:
var Comment = {
    init: function () {

        if (!login_uid) {
            //没有登录 提示登录
            // window.location.href="";
        }
    }
};

//首页功能

var Index = {
    init: function () {
        //主播收入
        //            var form = new FormData();
        //     form.append("uid", uid); // 

        //     fetch(server + "/user/my_info", {
        //         method: 'POST',
        // //      headers: { 'Accept': 'application/json',
        // //      'Content-Type': 'application/json'},
        //         mode: 'cors',
        //         cache: 'default',
        //         body: form
        //     }).then((response) => response.json()).then(function (data) {
        //         //console.log(data);
        //         if (data.code == 200) {
        //             console.log(data);
        //         }
        //     });
    }
};

//主播认证 
var Anchor_atte = {
    init: function () {
        this.DataLoad();
    },
    DataLoad: function () {
        //显示 头像 和昵称
        //            var form = new FormData();
        //     form.append("uid", uid); // 

        //     fetch(server + "/user/my_info", {
        //         method: 'POST',
        // //      headers: { 'Accept': 'application/json',
        // //      'Content-Type': 'application/json'},
        //         mode: 'cors',
        //         cache: 'default',
        //         body: form
        //     }).then((response) => response.json()).then(function (data) {
        //         //console.log(data);
        //         if (data.code == 200) {
        //             console.log(data);
        //         }
        //     });
    },
    InputCheck: function () {
        //判断各个都填没有

    },
    upload_img_ok: false,
    upload_img_src: null,
    login_uid: null, //uid 
    login_token: null, //token
    pic_id_front: null, //身份证正面
    pic_id_back: null, //身份证反面
    init: function () {
        //初始化
        this.login_uid = $.getUrlParam("login_uid");
        this.login_token = $.getUrlParam("login_token");
        this.conmitInput();
        this.phoneReg();
        this.getSmsCode();
        this.uploadImg();
        this.allSubmitClick();
    },
    conmitInput: function () {
        $(".atte-form-box input").keyup(function () {

            if ($(this).val().length > 0) {
                $(this).addClass("actived");
                $(this).removeClass("erroed");
                $(this).css("color", "#333");

            } else {
                $(this).removeClass("actived");
                $(this).addClass("erroed");
                $(this).css("color", "#fe426f");
            }
        });

        $(".atte-form-box input").blur(function () {

            if ($(this).val().length > 0) {
                $(this).addClass("actived");
                $(this).removeClass("erroed");
                $(this).css("color", "#333");
            } else {
                $(this).removeClass("actived");
                $(this).addClass("erroed");
                $(this).css("color", "#fe426f");
            }
        });
        //图片是否上传 图片提交按钮

        $(".upload-submit-btn").click(function (e) {
            e.preventDefault();
            //判断两张图片是否都上传
            if (atteRolu.pic_id_front) {
                //正面上传
                if (atteRolu.pic_id_back) {
                    //都上传了
                    $(".form-nav").show();
                    $(".upload-img-nav").hide();
                    $(".atte-main-box").css("left", "0");
                } else {
                    showInfo("身份证国徽面没上传");
                }
            } else {
                showInfo("身份证正面没上传");
            }
        });


    },

    uploadImg: function () {
        //上传图片 显示图片
        $(".img-box-btn>input").change(function (e) {
            var imgPath = $(this).val();
            var ipt = $(this);
            if (imgPath == "") {
                showInfo('请选择上传图片!');
                //alert("请选择上传图片！");
                return;
            }
            //判断上传文件的后缀名
            var strExtension = imgPath.substr(imgPath.lastIndexOf('.') + 1);
            if (strExtension != 'jpg' && strExtension != 'gif' &&
                strExtension != 'png' && strExtension != 'bmp' && strExtension != 'JPG' && strExtension != 'PNG') {
                showInfo('请选择图片文件!');
                // alert("请选择图片文件");
                return;
            } else {
                for (var n = 0; n < this.files.length; n++) {
                    var fileObj = this.files[n];
                    var imgUrl = window.URL.createObjectURL(this.files[n]);
                    var form_2 = new FormData();
                    // ipt.parent().siblings(".img-box").find("div").css("background", "url(" + imgUrl + ") no-repeat").css("background-size", "100% 100%").find("img").attr("src", imgUrl)
                    form_2.append("login_uid", atteRolu.login_uid);
                    form_2.append("login_token", atteRolu.login_token);
                    form_2.append("file", fileObj);
                    fetch(server + "/file/upload", {
                        method: 'POST',
                        //headers: myHeaders,
                        mode: 'cors',
                        cache: 'default',
                        body: form_2
                    }).then((response) => response.json()).then(function (data) {
                        //console.log(data);
                        // atteRolu[ipt.attr("name")]=222;
                        //  console.log(atteRolu.pic_id_front);
                        if (data.code == 200) {
                            //添加图片 
                            ipt.parent().siblings(".img-box").find("div").css("background", "url(" + data.data.url + ") no-repeat").css("background-size", "100% 100%").find("img").attr("src", data.data.url);
                            ipt.addClass("actived").removeClass("erroed");
                            atteRolu[ipt.attr("name")] = data.data.url;


                        } else {
                            ipt.addClass("erroed").removeClass("actived");
                            showInfo('当前网络不稳定,上传失败,请重新上传');
                        }

                    });

                }
            }

        });
    },

    allSubmitClick: function () {
        //点击提交  判断是否都填写完成 
        $("#all_submit_btn").click(function (e) {
            e.preventDefault();
            // 判断是否都填写完成 

            if ($("input").length == $("input.actived").length) {
                //都填了 fetch   跳转
                var form_2 = new FormData();
                for (var j = 0; j < $(".atte-form-box input.actived").length; j++) {
                    var element = $($(".atte-form-box input.actived")[j]);
                    form_2.append(element.attr("name"), element.val()); // 
                }
                form_2.append("pic_id_front", atteRolu.pic_id_front); // 
                form_2.append("pic_id_back", atteRolu.pic_id_back); //
                form_2.append("login_uid", atteRolu.login_uid); // 
                form_2.append("login_token", atteRolu.login_token); //
                fetch(server + "/user/authentication", {
                    method: 'POST',
                    //headers: myHeaders,
                    mode: 'cors',
                    cache: 'default',
                    body: form_2
                }).then((response) => response.json()).then(function (data) {
                    if (data.code == 200) {
                        // 成功 跳转网页
                        alert("提交成功");
                        window.location.href = 'attestation_after.html?login_uid=' + atteRolu.login_uid + "&login_token=" + atteRolu.login_token;

                    } else if (data.code == 400) {
                        showInfo(data.message);
                    } else {
                        showInfo('当前网络不稳定,提交失败,请重新提交');
                    }

                });


            } else {
                //有没填 的 
                if ($($("input.erroed")[0]).hasClass("not-upload-info")) {
                    //图片没上传
                    showInfo($($("input.erroed")[0]).parent().siblings(".img-box-txt").html() + "没上传");

                } else {
                    //其他没填写
                    showInfo($($("input.erroed")[0]).siblings("p").html() + "没填写");
                }
            }

        });

    }
}

//公告板 
var Public_notice = {
    init: function () {

        var form_2 = new FormData();
        // form_2.append("login_uid", atteRolu.login_uid); // 
        // form_2.append("login_token", atteRolu.login_token); //

        fetch(server + "notice/getNoticelist", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: form_2
        }).then((response) => response.json()).then(function (data) {
            if (data.code == 200) {
                // 成功  渲染页面

                var a_fram = document.createDocumentFragment(); //代码片段  


                for (var i = 0; i < data.data.length; i++) {
                    var li = document.createElement("li");
                    var element = data.data[i];
                    var dateParms = element.createTime + "";

                    if (dateParms instanceof Date) {
                        var datatime = dateParms;
                    }

                    //判断是否为字符串

                    if ((typeof dateParms == "string") && dateParms.constructor == String) {

                        //将字符串日期转换为日期格式

                        var datatime = new Date(parseInt(dateParms));

                    }

                    if (i == 0 || i == 1) {
                        $(li).html(`  <p>     <i>New</i>
                      <a href="#" data-content="${element.content}">${element.title}</a></p>
                   
                      <span>${datatime.getFullYear()}-${datatime.getMonth()+1>=10? datatime.getMonth()+1:"0"+ (datatime.getMonth()+1)}-${datatime.getDate()>=10? datatime.getDate():"0"+ datatime.getDate()} ${datatime.getHours()>=10? datatime.getHours():"0"+ datatime.getHours()}:${datatime.getMinutes()>=10? datatime.getMinutes():"0"+ datatime.getMinutes()}:${datatime.getSeconds()>10? datatime.getSeconds():"0"+ datatime.getSeconds()}</span>`);
                    } else {
                        $(li).html(`  <p>     <i class="visihidden">New</i>
                      <a href="#" data-content="${element.content}">${element.title}</a></p>
                   
                      <span>${datatime.getFullYear()}-${datatime.getMonth()+1>=10? datatime.getMonth()+1:"0"+ (datatime.getMonth()+1)}-${datatime.getDate()>=10? datatime.getDate():"0"+ datatime.getDate()} ${datatime.getHours()>=10? datatime.getHours():"0"+ datatime.getHours()}:${datatime.getMinutes()>=10? datatime.getMinutes():"0"+ datatime.getMinutes()}:${datatime.getSeconds()>10? datatime.getSeconds():"0"+ datatime.getSeconds()}</span>`);
                    }
                    a_fram.appendChild(li);
                }
                $(".notice-info-con").html(a_fram);
            } else if (data.code == 400) {
                showInfo(data.message);
            } else {
                showInfo('当前网络不稳定,提交失败,请重新提交');
            }

        });


        this.ClickDetail();
        //点击 去掉new字

    },
    ClickDetail: function () {
        //点击查看详情

        $(".notice-info-con").on("click", "a", function (e) {
            e.preventDefault();
            var content_text = $(this).data("content");
            console.log(content_text)
            $(".content-txt-box").html(content_text);
            $(".modal-log-box").show();

        });

        //点击弹窗

        $(".modal-close-modal").click(function (e) {
            //
            e.preventDefault();
            $('.modal-log-box').hide();
        });
    }

}


//首页功能

var Family_index = {
    init: function () {
        //家族首页
        //            var form = new FormData();
        //     form.append("uid", uid); // 

        //     fetch(server + "/user/my_info", {
        //         method: 'POST',
        // //      headers: { 'Accept': 'application/json',
        // //      'Content-Type': 'application/json'},
        //         mode: 'cors',
        //         cache: 'default',
        //         body: form
        //     }).then((response) => response.json()).then(function (data) {
        //         //console.log(data);
        //         if (data.code == 200) {
        //             console.log(data);
        //         }
        //     });
    }
};

//家族设置
var Family_setting = {
    init: function () {
        this.DataLoad();
        this.CheckInput();
        this.Img_upload();
        this.ClickSubmit();
    },
    DataLoad: function () {
        //显示头像昵称
        //            var form = new FormData();
        //     form.append("uid", uid); // 

        //     fetch(server + "/user/my_info", {
        //         method: 'POST',
        // //      headers: { 'Accept': 'application/json',
        // //      'Content-Type': 'application/json'},
        //         mode: 'cors',
        //         cache: 'default',
        //         body: form
        //     }).then((response) => response.json()).then(function (data) {
        //         //console.log(data);
        //         if (data.code == 200) {
        //             console.log(data);
        //         }
        //     });
    },
    CheckInput: function () {
        $(".fs-text-input").keyup(function () {

            if ($(this).val().length > 0) {
                $(this).addClass("actived");
                $(this).removeClass("erroed");
                $(this).css("color", "#333");

            } else {
                $(this).removeClass("actived");
                $(this).addClass("erroed");
                $(this).css("color", "#fe426f");
            }
        });

        $(".fs-text-input").blur(function () {

            if ($(this).val().length > 0) {
                $(this).addClass("actived");
                $(this).removeClass("erroed");
                $(this).css("color", "#333");
            } else {
                $(this).removeClass("actived");
                $(this).addClass("erroed");
                $(this).css("color", "#fe426f");
            }
        });
    },
    Img_upload: function () {
        //上传图片
        $(".fs-img-file").change(function (e) {
            var imgPath = $(this).val();
            var ipt = $(this);
            if (imgPath == "") {
                showInfo('请选择上传图片!');
                //alert("请选择上传图片！");
                return;
            }
            //判断上传文件的后缀名
            var strExtension = imgPath.substr(imgPath.lastIndexOf('.') + 1);
            if (strExtension != 'jpg' && strExtension != 'gif' &&
                strExtension != 'png' && strExtension != 'bmp' && strExtension != 'JPG' && strExtension != 'PNG') {
                showInfo('请选择图片文件!');
                // alert("请选择图片文件");
                return;
            } else {
                for (var n = 0; n < this.files.length; n++) {
                    var fileObj = this.files[n];
                    var imgUrl = window.URL.createObjectURL(this.files[n]);
                    var form_2 = new FormData();
                    // ipt.parent().siblings(".img-box").find("div").css("background", "url(" + imgUrl + ") no-repeat").css("background-size", "100% 100%").find("img").attr("src", imgUrl)
                    form_2.append("login_uid", atteRolu.login_uid);
                    form_2.append("login_token", atteRolu.login_token);
                    form_2.append("file", fileObj);
                    fetch(server + "/file/upload", {
                        method: 'POST',
                        //headers: myHeaders,
                        mode: 'cors',
                        cache: 'default',
                        body: form_2
                    }).then((response) => response.json()).then(function (data) {
                        //console.log(data);
                        // atteRolu[ipt.attr("name")]=222;
                        //  console.log(atteRolu.pic_id_front);
                        if (data.code == 200) {
                            //添加图片 
                            ipt.parent().siblings(".img-box").find("div").css("background", "url(" + data.data.url + ") no-repeat").css("background-size", "100% 100%").find("img").attr("src", data.data.url);
                            ipt.addClass("actived").removeClass("erroed");
                            atteRolu[ipt.attr("name")] = data.data.url;


                        } else {
                            ipt.addClass("erroed").removeClass("actived");
                            showInfo('当前网络不稳定,上传失败,请重新上传');
                        }

                    });

                }
            }

        });
    },
    ClickSubmit: function () {
        //点击提交按钮
        //点击提交  判断是否都填写完成 
        $(".fs-atte-submit").click(function (e) {
            e.preventDefault();
            // 判断是否都填写完成 

            if ($(".fs-input").length == $(".fs-input.actived").length) {
                //都填了 fetch   跳转
                var form_2 = new FormData();
                for (var j = 0; j < $(".fs-input.actived").length; j++) {
                    var element = $($(".fs-input.actived")[j]);
                    form_2.append(element.attr("name"), element.val()); // 
                }

                form_2.append("login_uid", atteRolu.login_uid); // 
                form_2.append("login_token", atteRolu.login_token); //
                fetch(server + "/user/authentication", {
                    method: 'POST',
                    //headers: myHeaders,
                    mode: 'cors',
                    cache: 'default',
                    body: form_2
                }).then((response) => response.json()).then(function (data) {
                    if (data.code == 200) {
                        // 成功 跳转网页
                        alert("提交成功");
                        window.location.href = 'attestation_after.html?login_uid=' + atteRolu.login_uid + "&login_token=" + atteRolu.login_token;

                    } else if (data.code == 400) {
                        showInfo(data.message);
                    } else {
                        showInfo('当前网络不稳定,提交失败,请重新提交');
                    }

                });


            } else {
                //有没填 的 
                if ($($(".fs-input.erroed")[0]).hasClass("fs-img-file")) {
                    //图片没上传
                    showInfo("logo没上传");

                } else {
                    //其他没填写
                    showInfo($($(".fs-input.erroed")[0]).siblings("p").html() + "没填写");
                }
            }

        });
    }

};

//家族信息完善
var Family_msg_done = {
    init: function () {
        this.DataLoad();
    },
    DataLoad: function () {
        //显示数据
        //            var form = new FormData();
        //     form.append("uid", uid); // 

        //     fetch(server + "/user/my_info", {
        //         method: 'POST',
        // //      headers: { 'Accept': 'application/json',
        // //      'Content-Type': 'application/json'},
        //         mode: 'cors',
        //         cache: 'default',
        //         body: form
        //     }).then((response) => response.json()).then(function (data) {
        //         //console.log(data);
        //         if (data.code == 200) {
        //             console.log(data);
        //         }
        //     });
    }
};

//分页

//成员管理 
var Membership = {
    init: function () {

    },
    searchSome: function () {
        //上面搜索框
    },
    li_length:null,
    pagesFuc:function () {  
           var form = new FormData();
        //  page=1     familyid=1
        login_uid = 1;
        form.append("familyid", login_uid); // 
        form.append("page", 1); // 
        fetch(server + "check/getCheckAnchorList", {
            method: 'POST',
            //      headers: { 'Accept': 'application/json',
            //      'Content-Type': 'application/json'},
            mode: 'cors',
            cache: 'default',
            body: form
        }).then((response) => response.json()).then(function (data) {
            //console.log(data);
            if (data.code == 200) {
              
                var li_leng = data.data.list.length;
                  var li_leng = data.data.list.length;
                //分页
                var setTotalCount = li_leng;
                var all_pages=parseInt(li_leng%20==0?li_leng/20:li_leng/20+1);
                $('.content-footer').paging({
                    initPageNo: 1, // 初始页码
                    totalPages: all_pages, //总页数
                    totalCount: '合计' + setTotalCount + '条数据', // 条目总数
                    slideSpeed: 600, // 缓动速度。单位毫秒
                    jump: false, //是否支持跳转
                    callback: function (page) { // 回调函数
                      //刷新页面
                      //console.log(page)
                        Membership.DataLoad(page);
                    }
                });


            }
        });
        
    },
    DataLoad: function (page_number) {
        //数据加载 分页   


        var form = new FormData();
        //  page=1     familyid=1
        login_uid = 1;
        form.append("familyid", login_uid); // 
        form.append("page", page_number); // 
        fetch(server + "check/getCheckAnchorList", {
            method: 'POST',
            //      headers: { 'Accept': 'application/json',
            //      'Content-Type': 'application/json'},
            mode: 'cors',
            cache: 'default',
            body: form
        }).then((response) => response.json()).then(function (data) {
            //console.log(data);
            if (data.code == 200) {
                var tr_fram = document.createDocumentFragment();
                var li_leng = data.data.list.length;



                for (var i = 0; i < li_leng; i++) {
                    var element = data.data.list[i];
                    var tr = document.createElement("tr");
                    $(tr).html(
                        `
                                <td>0001</td>
                              
                                <td>222222</td>
                                <td>男的范德萨</td>
                                <td>1990-02-01</td>
                               
                                <td class="color-blue"><a href="anchor_msg.html?item=nav-line-11">查看</a></td>
                                <td>1991-02-01</td>
                                <td class="text-blue">23</td>
                                
                              
                                <td class="membership-edit">
                                    
                                    
                                      <a href="#" data-showmodal='agree-people-modal' class="user-edit" style="font-size:14px;">同意</a>
                                    <a  class="user-edit" data-showmodal='not-agree-people-modal' style="font-size:14px;">驳回</a>
                                          
                                </td>`
                    );

                }

            }
        });


    },
    ClickSearch: function () {
        //查询 相关
    },
    editSome: function () {
        //操作的各个按钮

        //编辑 
    },
    Atte_msg: function () {
        //认证信息 显示数据

        var form = new FormData();
        form.append("uid", 10029); // 

        fetch(server + "check/getAuthentication", {
            method: 'POST',
            //      headers: { 'Accept': 'application/json',
            //      'Content-Type': 'application/json'},
            mode: 'cors',
            cache: 'default',
            body: form
        }).then((response) => response.json()).then(function (data) {
            //console.log(data);
            if (data.code == 200) {
                $(".img-logo-src").attr("src", data.data.icon);
                $('.number-in').html(data.data.number);
                $('.nickName-in').html(data.data.nickName);
                $(".mobile-in").html(data.data.mobile);

                $(".img-logo-src").attr("src", data.data.icon);
                $('.gender-in').html(data.data.userAuthentication.gender == 0 ? "保密" : data.data.userAuthentication.gender == 1 ? "男" : "女");
                $('.age-in').html(data.data.userAuthentication.age);
                $(".realName-in").html(data.data.userAuthentication.realName);
                $(".idCard-in").html(data.data.userAuthentication.idCard);
                $(".picIdFront-in").css("background", " url(" + data.data.userAuthentication.picIdFront + ") no-repeat");
                $(".picIdBack-in").css("background", " url(" + data.data.userAuthentication.picIdBack + ") no-repeat");
            }
        });
    },
    AddJjr: function () {
        // 添加经纪人
        //   var form = new FormData();
        //     form.append("uid", uid); // 

        //     fetch(server + "/user/my_info", {
        //         method: 'POST',
        // //      headers: { 'Accept': 'application/json',
        // //      'Content-Type': 'application/json'},
        //         mode: 'cors',
        //         cache: 'default',
        //         body: form
        //     }).then((response) => response.json()).then(function (data) {
        //         //console.log(data);
        //         if (data.code == 200) {
        //             console.log(data);
        //         }
        //     });

    },
    Check_contract: function () {
        //查看合同
        //   var form = new FormData();
        //     form.append("uid", uid); // 

        //     fetch(server + "/user/my_info", {
        //         method: 'POST',
        // //      headers: { 'Accept': 'application/json',
        // //      'Content-Type': 'application/json'},
        //         mode: 'cors',
        //         cache: 'default',
        //         body: form
        //     }).then((response) => response.json()).then(function (data) {
        //         //console.log(data);
        //         if (data.code == 200) {
        //             console.log(data);
        //         }
        //     });
    },
    Del_people: function () {
        //移除成员
    },
    Edit_people: function () {
        //编辑成员
    },
    Batch_anchor: function () {
        //导入主播 
        //显示数据
        //点击 checkbox 导入
    }

};

//成员增减审批
var People_add = {
    init: function () {

    },
    searchSome: function () {
        //上面搜索框
    },
    Atte_msg: function () {
        //点击编辑  
        //认证信息 显示数据
        //    var form = new FormData();
        //     form.append("uid", uid); // 

        //     fetch(server + "/user/my_info", {
        //         method: 'POST',
        //         headers: { 'Accept': 'application/json',
        //        'Content-Type': 'application/json'},
        //         mode: 'cors',
        //         cache: 'default',
        //         body: form
        //     }).then((response) => response.json()).then(function (data) {
        //         //console.log(data);
        //         if (data.code == 200) {
        //             console.log(data);
        //         }
        //     });

    },
    Sign_contact: function () {
        //签署合同

    },
    Edit_agree: function () {
        //同意或者驳回

        //    var form = new FormData();
        //     form.append("uid", uid); // 

        //     fetch(server + "/user/my_info", {
        //         method: 'POST',
        //         headers: { 'Accept': 'application/json',
        //        'Content-Type': 'application/json'},
        //         mode: 'cors',
        //         cache: 'default',
        //         body: form
        //     }).then((response) => response.json()).then(function (data) {
        //         //console.log(data);
        //         if (data.code == 200) {
        //             console.log(data);
        //         }
        //     });
    }


}

//成员月数据
var People_month_data = {
    init: function () {

    },
    searchSome: function () {
        //上面搜索框
    },
    DataLoad: function () {
        //数据加载 
    }
}

//成员天数据
var People_day_data = {
    init: function () {

    },
    searchSome: function () {
        //上面搜索框
    },
    DataLoad: function () {
        //数据加载 
    }
}

//家族收入来源
var Famliy_income = {
    init: function () {

    },
    searchSome: function () {
        //上面搜索
    },
    DataLoad: function () {
        //表格数据加载
    }
}


var cookie_name = "";

login_uid = $.cookie(cookie_name);
$(function () {
    //

    //login_uid = $.getUrlParam("login_uid"); //更新 uid
    // 判断是否登录 没有登录 跳动登录页
    if (!login_uid) {
        //没有的话 都跳到登录页  Login.html
    }


    // Comment.init();
    // Index.init();
    // Public_notice.init(); //公告
    // Family_index.init(); //家族首页
    // Family_setting.init();//家族设置
    // Family_msg_done.init(); //家族信息完善 


});