// 提示框的 逻辑
function showInfo(text) {
    $("body").addClass("overflow-hidden");
    $(".info-text").html(text);
    $(".modal-info").fadeIn(300);

    setTimeout(function () {
        $("body").removeClass("overflow-hidden");
        $(".modal-info").fadeOut(300);
    }, 2500);

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
var server = "http://192.168.1.5:8081//"; //http:
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
        //  家族首页
        var form = new FormData();

        fetch(server + "check/getStatisticForFamily", {
            method: 'POST',
            //      headers: { 'Accept': 'application/json',
            //      'Content-Type': 'application/json'},
            mode: 'cors',
            cache: 'default',
            body: form
        }).then((response) => response.json()).then(function (data) {
            //console.log(data);
            if (data.code == 200) {


                $("#now_time").html(data.data.today);
                var fram = document.createDocumentFragment();
                for (var i = 0; i < data.data.data.length; i++) {
                    var element = data.data.data[i];
                    var li_html = document.createElement("li");
                    $(li_html).html(`  <p>${element.title}</p>
                             <div>${element.result}</div>`);
                    fram.appendChild(li_html);
                }
                $("#return_yesterday_con").html(fram)


            }
        });
    }
};

//家族设置
var Family_setting = {
    init: function () {
        this.DataLoad();
        this.CheckInput();
        this.uploadImg();
        this.ClickSubmit();
    },
    logo: null, //图片路径
    DataLoad: function () {
        //显示头像昵称
        var form = new FormData();
        // form.append("uid", uid); // 

        fetch(server + "family/getFamilyInfo", {
            method: 'POST',
            //      headers: { 'Accept': 'application/json',
            //      'Content-Type': 'application/json'},
            mode: 'cors',
            cache: 'default',
            body: form
        }).then((response) => response.json()).then(function (data) {
            //console.log(data);
            if (data.code == 200) {

                // console.log(data);
                // $(".family-logo").val( data.data.familyInfo.logo);
                $(".img-logo-box-img").attr("src", data.data.familyInfo.logo);
                $(".img-logo-box").css("background", "url(" + data.data.familyInfo.logo + ") no-repeat").css("background-size", "100% 100%");
                $(".family-name").html(data.data.familyInfo.familyName);
                $(".complant-name").html(data.data.familyInfo.company);
                $(".boss-name").html(data.data.familyInfo.userName);
                $(".family-declaration").html(data.data.familyInfo.declaration);
                $(".family-notice").html(data.data.familyInfo.notic);
                $(".family-agentUp").val(data.data.familyInfo.agentUp);
                Family_setting.logo = data.data.familyInfo.logo;
            }
        });
    },
    CheckInput: function () {
        $(".fs-input").keyup(function () {

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

        $(".fs-input").blur(function () {

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

    uploadImg: function () {

        //图片上传
        var filechooser = $(".fs-img-file");
        //    用于压缩图片的canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext('2d');
        //    瓦片canvas
        var tCanvas = document.createElement("canvas");
        var tctx = tCanvas.getContext("2d");
        var maxsize = 100 * 1024;
        $("#upload").on("click", function () {
                filechooser.click();
            })
            .on("touchstart", function () {
                $(this).addClass("touch")
            })
            .on("touchend", function () {
                $(this).removeClass("touch")
            });
        var ipt = null;
        filechooser.change(function () {
            ipt = $(this);
            if (!this.files.length) return;
            var files = Array.prototype.slice.call(this.files);
            if (files.length > 9) {
                alert("最多同时只可上传9张图片");
                return;
            }
            files.forEach(function (file, i) {
                if (!/\/(?:jpeg|png|jpg|gif)/i.test(file.type)) return;
                var reader = new FileReader();
                var li = document.createElement("li");
                //          获取图片大小
                var size = file.size / 1024 > 1024 ? (~~(10 * file.size / 1024 / 1024)) / 10 + "MB" : ~~(file.size / 1024) + "KB";
                li.innerHTML = '<div class="progress"><span></span></div><div class="size">' + size + '</div>';
                // $(".img-list").append($(li));
                reader.onload = function () {
                    var result = this.result;
                    var img = new Image();
                    img.src = result;
                    $(li).css("background-image", "url(" + result + ")");
                    //如果图片大小小于100kb，则直接上传
                    if (result.length <= maxsize) {
                        img = null;
                        upload(result, file.type, $(li));
                        return;
                    }
                    //      图片加载完毕之后进行压缩，然后上传
                    if (img.complete) {
                        callback();
                    } else {
                        img.onload = callback;
                    }

                    function callback() {
                        var data = compress(img);
                        upload(data, file.type, $(li));
                        img = null;
                    }
                };
                reader.readAsDataURL(file);
            })
        });
        //    使用canvas对大图片进行压缩
        var file_img = null;

        function compress(img) {
            var initSize = img.src.length;
            var width = img.width;
            var height = img.height;
            //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
            var ratio;
            if ((ratio = width * height / 4000000) > 1) {
                ratio = Math.sqrt(ratio);
                width /= ratio;
                height /= ratio;
            } else {
                ratio = 1;
            }
            canvas.width = width;
            canvas.height = height;
            //        铺底色
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            //如果图片像素大于100万则使用瓦片绘制
            var count;
            if ((count = width * height / 1000000) > 1) {
                count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
                //            计算每块瓦片的宽和高
                var nw = ~~(width / count);
                var nh = ~~(height / count);
                tCanvas.width = nw;
                tCanvas.height = nh;
                for (var i = 0; i < count; i++) {
                    for (var j = 0; j < count; j++) {
                        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                    }
                }
            } else {
                ctx.drawImage(img, 0, 0, width, height);
            }
            //进行最小压缩
            var ndata = canvas.toDataURL('image/jpeg', 0.1);
            // console.log('压缩前：' + initSize);
            // console.log('压缩后：' + ndata.length);
            // console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
            tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;

            return ndata;
        }
        //    图片上传，将base64的图片转成二进制对象，塞进formdata上传
        function upload(basestr, type, $li) {
            var text = window.atob(basestr.split(",")[1]);
            var buffer = new Uint8Array(text.length);
            var pecent = 0,
                loop = null;
            for (var i = 0; i < text.length; i++) {
                buffer[i] = text.charCodeAt(i);
            }
            var blob = getBlob([buffer], type);

            var form_2 = new FormData();


            form_2.append("file", blob, "file_" + Date.parse(new Date()) + ".jpg");
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
                    $(".img-logo-box-img").attr("src", data.data.url);
                    $(".img-logo-box").css("background", "url(" + data.data.url + ") no-repeat").css("background-size", "100% 100%").find("img").attr("src", data.data.url);
                    ipt.addClass("actived").removeClass("erroed");
                    Family_setting.logo = data.data.url;


                } else {
                    ipt.addClass("erroed").removeClass("actived");
                    showInfo('当前网络不稳定,上传失败,请重新上传');
                }

            });

            //   formdata.append("login_uid", atteRolu.login_uid);
            //         formdata.append("login_token", atteRolu.login_token);
            //         formdata.append("file", blob);

            // xhr.open('post', server + "/file/upload");
            // xhr.onreadystatechange = function () {
            //     if (xhr.readyState == 4 && xhr.status == 200) {
            //         var jsonData = JSON.parse(xhr.responseText);
            //         var imagedata = jsonData[0] || {};
            //         var text = imagedata.path ? '上传成功' : '上传失败';
            //         console.log(text + '：' + imagedata.path);
            //         clearInterval(loop);
            //         //当收到该消息时上传完毕

            //         if (!imagedata.path) return;
            //         $(".pic-list").append('<a href="' + imagedata.path + '">' + imagedata.name + '（' + imagedata.size + '）<img src="' + imagedata.path + '" /></a>');
            //     }
            // };
            // //数据发送进度，前50%展示该进度
            // xhr.upload.addEventListener('progress', function (e) {
            //     if (loop) return;
            //     pecent = ~~(100 * e.loaded / e.total) / 2;
            //     $li.find(".progress span").css('width', pecent + "%");
            //     if (pecent == 50) {
            //         mockProgress();
            //     }
            // }, false);
            // //数据后50%用模拟进度
            // function mockProgress() {
            //     if (loop) return;
            //     loop = setInterval(function () {
            //         pecent++;
            //         $li.find(".progress span").css('width', pecent + "%");
            //         if (pecent == 99) {
            //             clearInterval(loop);
            //         }
            //     }, 100)
            // }
            // xhr.send(formdata);
        }
        /**
         * 获取blob对象的兼容性写法
         * @param buffer
         * @param format
         * @returns {*}
         */
        function getBlob(buffer, format) {
            try {

                return new Blob(buffer, {
                    type: format
                });
            } catch (e) {
                var bb = new(window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
                buffer.forEach(function (buf) {
                    bb.append(buf);
                });

                return bb.getBlob(format);
            }
        }
        /**
         * 获取formdata
         */
        function getFormData() {
            var isNeedShim = ~navigator.userAgent.indexOf('Android') &&
                ~navigator.vendor.indexOf('Google') &&
                !~navigator.userAgent.indexOf('Chrome') &&
                navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534;
            return isNeedShim ? new FormDataShim() : new FormData()
        }
        /**
         * formdata 补丁, 给不支持formdata上传blob的android机打补丁
         * @constructor
         */
        function FormDataShim() {

            var o = this,
                parts = [],
                boundary = Array(21).join('-') + (+new Date() * (1e16 * Math.random())).toString(36),
                oldSend = XMLHttpRequest.prototype.send;
            this.append = function (name, value, filename) {
                parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');
                if (value instanceof Blob) {
                    parts.push('; filename="' + (filename || 'blob') + '"\r\nContent-Type: ' + value.type + '\r\n\r\n');
                    parts.push(value);
                } else {
                    parts.push('\r\n\r\n' + value);
                }
                parts.push('\r\n');
            };
            // Override XHR send()
            XMLHttpRequest.prototype.send = function (val) {
                var fr,
                    data,
                    oXHR = this;
                if (val === o) {
                    // Append the final boundary string
                    parts.push('--' + boundary + '--\r\n');
                    // Create the blob
                    data = getBlob(parts);
                    // Set up and read the blob into an array to be sent
                    fr = new FileReader();
                    fr.onload = function () {
                        oldSend.call(oXHR, fr.result);
                    };
                    fr.onerror = function (err) {
                        throw err;
                    };
                    fr.readAsArrayBuffer(data);
                    // Set the multipart content type and boudary
                    this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
                    XMLHttpRequest.prototype.send = oldSend;
                } else {
                    oldSend.call(this, val);
                }
            };
        }
        //图片上传结束


    },

    ClickSubmit: function () {
        //点击提交按钮
        //点击提交  判断是否都填写完成 
        $("#editFamilyInfo").click(function (e) {
            e.preventDefault();
            // 判断是否都填写完成 

            if ($(".fs-input").length == $(".fs-input.actived").length) {
                //都填了 fetch   跳转
                var form_2 = new FormData();
                for (var j = 0; j < $(".fs-input.actived").length; j++) {
                    var element = $($(".fs-input.actived")[j]);
                    form_2.append(element.attr("name"), element.val()); // 
                }

                // Family_setting.logo
                form_2.append("logo", Family_setting.logo); // 
                fetch(server + "family/editFamilyInfo", {
                    method: 'POST',
                    //headers: myHeaders,
                    mode: 'cors',
                    cache: 'default',
                    body: form_2
                }).then((response) => response.json()).then(function (data) {
                    if (data.code == 200) {
                        // 成功 跳转网页
                        showInfo("提交成功");
                        setTimeout(function () {
                            window.location.reload();
                        }, 300)


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
        // 显示数据
        var form = new FormData();
        // form.append("uid", uid); // 

        fetch(server + "family/getFamilyInfo", {
            method: 'POST',
            //      headers: { 'Accept': 'application/json',
            //      'Content-Type': 'application/json'},
            mode: 'cors',
            cache: 'default',
            body: form
        }).then((response) => response.json()).then(function (data) {
            //console.log(data);
            if (data.code == 200) {

                // console.log(data);
                // $(".family-logo").val( data.data.familyInfo.logo);
                $(".img-logo-box-img").attr("src", data.data.familyInfo.logo);
                $(".img-logo-box").css("background", "url(" + data.data.familyInfo.logo + ") no-repeat").css("background-size", "100% 100%");
                $(".family-name").val(data.data.familyInfo.familyName);
                $(".family-id").val(data.data.familyInfo.id);
                $(".complant-name").val(data.data.familyInfo.company);
                $(".boss-name").val(data.data.familyInfo.userName);
                $(".companyPic").css("background", "url(" + data.data.familyInfo.logo + ") no-repeat").css("background-size", "100% 100%");
                $(".picIdFront").css("background", "url(" + data.data.familyInfo.picIdFront + ") no-repeat").css("background-size", "100% 100%");
                $(".picIdBack").css("background", "url(" + data.data.familyInfo.picIdBack + ") no-repeat").css("background-size", "100% 100%");
                $(".picIdUser").css("background", "url(" + data.data.familyInfo.picIdUser + ") no-repeat").css("background-size", "100% 100%");
                $(".idCardType" + data.data.familyInfo.idCardType).attr("checked", "");
                $(".idCard").val(data.data.familyInfo.idCard);
                $(".family-declaration").html(data.data.familyInfo.declaration);
                $(".family-notice").html(data.data.familyInfo.notic);
                $(".family-agentUp").val(data.data.familyInfo.agentUp);
                Family_setting.logo = data.data.familyInfo.logo;
            }
        });
    }
};

//分页

//成员管理 
var Membership = {
    init: function () {

    },
    li_length: null,
    pagesFuc: function (page_number, form) {

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

                var li_leng = data.data.totalCount;

                //分页
                var setTotalCount = li_leng;
                var all_pages = parseInt(li_leng % 20 == 0 ? li_leng / 20 : li_leng / 20 + 1);
                $('.content-footer').paging({
                    initPageNo: 1, // 初始页码
                    totalPages: all_pages, //总页数
                    totalCount: '合计' + setTotalCount + '条数据', // 条目总数
                    slideSpeed: 600, // 缓动速度。单位毫秒
                    jump: false, //是否支持跳转
                    callback: function (page) { // 回调函数
                        //刷新页面
                        //console.log(page)
                        Membership.DataLoad(page_number, form);
                    }
                });


            }
        });

    },
    DataInit: function (page_number) {
        var form = new FormData();
        //  page=1     familyid=1

        form.append("role", ''); // 
        form.append("status", 1); // 
        form.append("page", page_number); // 
        this.pagesFuc(page_number, form);
    },

    DataLoad: function (page_number, form) {

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

                    var dateParms = element.createTime + "";

                    if (dateParms instanceof Date) {
                        var datatime = dateParms;
                    }

                    //判断是否为字符串

                    if ((typeof dateParms == "string") && dateParms.constructor == String) {

                        //将字符串日期转换为日期格式

                        var datatime = new Date(parseInt(dateParms));

                    }

                    $(tr).html(
                        `        
                                <td>${element. id}</td>
                              
                                <td>${element.number}</td>
                                <td>${element.nickName}</td>
                               
                                <td>${element.level==0?"普通":element.level==1?"精英":"优秀"}</td>
                                
                                  <td>${element.roomStatus==0?"关闭":element.roomStatus==1?"直播中":"暂停"}</td>
                                
                                    <td>${element.role==0?"主播":element.role==1?"经纪人":"--"}</td>
                                    <td>${element.agentname!=null||element.agentname!=''?element.agentname:"--"}</td>
                                <td class="color-blue"><a href="anchor_msg.html?item=nav-line-11&id=${element.uid}">查看</a></td>
                                 <td>${element.coWay==0?"签约":element.coWay==1?"其他":"--"}</td>
                              
                                <td class="text-blue">${element.signStatus == 0?"--":element.hetongStartTime+" 至 "+element.hetongEndTime}</td>
                                
                               

                               <td class="text-blue">${element.signStatus == 0?"--": element.signTime}</td>
                               <td class="text-blue">${element.signStatus == 0?"--": element.probation}</td>
                                 <td class="text-blue">${element.signStatus == 0?"未签":"已签"}</td>
                                <td class="membership-edit">
                                    
                                   
                                     <a href="edit_people.html?item=nav-line-11&id=${element.number}"  style="font-size:14px;">编辑</a>
                                    <a href="check_contract.html?item=nav-line-10&id=${element.uid}" class="">查看合同</a>
                            
                                      <a  class="user-edit padd-agree-yes-not" data-showmodal='not-agree-people-modal'  data-id=${element.uid} data-modalclass="padd-agree-not-btn" style="font-size:14px;">删除</a>
                                      
        
                                    
                                </td> `

                    );
                    tr_fram.appendChild(tr);
                }

                $("#tbody").html(tr_fram);

            }
        });


    },
    searchSome: function () {
        //上面搜索框
        $("#padd_search_btn").click(function (e) {
            e.preventDefault();
            var role = $(".role").val();
            var status = 1;
            var number = $(".number").val();
            var nickname = $(".nickname").val();
            var dayDiff = $(".dayDiff").val();
            var form = new FormData();
            form.append("role", role); // 
            form.append("status", status); // 
            form.append("nickname", nickname); // 
            form.append("number", number); // 
            form.append("page", 1); // 
            form.append("dayDiff", dayDiff); // 
            Membership.pagesFuc(1, form);
        });

    },
    Atte_msg: function (uid) {
        var form = new FormData();
        form.append("uid", uid); // 

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
    Edit_agree: function () {
        // 同意或者驳回
        $("#tableSort").on("click", ".padd-agree-yes-not", function (e) {
            e.preventDefault();

            $("." + $(this).data("showmodal")).find(".padd-agree-btn").attr("data-id", $(this).data("id"));


        })
        $(".padd-agree-btn").click(function (e) {
            e.preventDefault();
            var id = $(this).data("id");
            var status = $(this).data("status");
            var form = new FormData();
            form.append("uid", id); // 

            fetch(server + "check/removeAnchor", {
                method: 'POST',

                mode: 'cors',
                cache: 'default',
                body: form
            }).then((response) => response.json()).then(function (data) {
                //console.log(data);
                if (data.code == 200) {
                    $('.modal-log-box').hide();
                    showInfo("操作成功");
                    setTimeout(function () {
                        window.location.reload();
                    }, 300);


                } else {
                    showInfo(data.message)
                }
            });
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
        var uid = $.getUrlParam("id");
        var form = new FormData();
        form.append("uid", uid); // 

        fetch(server + "check/lookHeTong", {
            method: 'POST',
            //      headers: { 'Accept': 'application/json',
            //      'Content-Type': 'application/json'},
            mode: 'cors',
            cache: 'default',
            body: form
        }).then((response) => response.json()).then(function (data) {
            //console.log(data);
            if (data.code == 200) {
                $(".img-box img").attr("src", data.data.url)
            } else {

            }
        });
    },
    Del_people: function () {
        //移除成员
    },
    sub_id: null,
    Edit_people: function () {
        //编辑成员
        var uid = $.getUrlParam("id");
        var form = new FormData();
        form.append("number", uid); // 
        form.append("status", 1); // 
        form.append("page", 1);
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
                var element = data.data.list[0];
                $(".number").html(element.number);
                $(".nickname").html(element.nickName);
                $(".role" + element.role).attr("checked", "");
                $(".level" + element.level).attr("checked", "")
                $(".getrate").html(element.getrate * 100);
                $(".salary").val(element.salary);
                Membership.sub_id = element.id;
            }
        });


        $(".ep-atte-submit").click(function (e) {
            e.preventDefault();
            var salary = $(".salary").val();
            if (salary && salary > 0) {
                var form = new FormData();
                for (var j = 0; j < $("input").length; j++) {
                    var element = $("input")[j];
                    if ($(element).is(":checked")) {

                        form.append($(element).attr("name"), $(element).val()); // 
                    }
                }



                form.append("salary", salary); // 

                form.append("id", Membership.sub_id);
                fetch(server + "check/editAnchor", {
                    method: 'POST',
                    //      headers: { 'Accept': 'application/json',
                    //      'Content-Type': 'application/json'},
                    mode: 'cors',
                    cache: 'default',
                    body: form
                }).then((response) => response.json()).then(function (data) {
                    //console.log(data);
                    if (data.code == 200) {
                        showInfo("操作成功");
                        setTimeout(function () {
                            window.location.reload();
                        }, 300);


                    } else {
                        showInfo(data.data.massage);
                    }
                });

            } else {
                showInfo("底薪填写不正确")
            }

        })
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
        this.DataLoad();

    },
    li_length: null,
    pagesFuc: function (page_number, form) {

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

                var li_leng = data.data.totalCount;

                //分页
                var setTotalCount = li_leng;
                var all_pages = parseInt(li_leng % 20 == 0 ? li_leng / 20 : li_leng / 20 + 1);
                $('.content-footer').paging({
                    initPageNo: 1, // 初始页码
                    totalPages: all_pages, //总页数
                    totalCount: '合计' + setTotalCount + '条数据', // 条目总数
                    slideSpeed: 600, // 缓动速度。单位毫秒
                    jump: false, //是否支持跳转
                    callback: function (page) { // 回调函数
                        //刷新页面
                        //console.log(page)
                        People_add.DataLoad(page_number, form);
                    }
                });


            }
        });

    },
    DataInit: function (page_number) {
        var form = new FormData();
        //  page=1     familyid=1

        form.append("role", ''); // 
        form.append("status", 0); // 
        form.append("page", page_number); // 
        this.pagesFuc(page_number, form);
    },

    DataLoad: function (page_number, form) {

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

                    var dateParms = element.createTime + "";

                    if (dateParms instanceof Date) {
                        var datatime = dateParms;
                    }

                    //判断是否为字符串

                    if ((typeof dateParms == "string") && dateParms.constructor == String) {

                        //将字符串日期转换为日期格式

                        var datatime = new Date(parseInt(dateParms));

                    }

                    $(tr).html(
                        `
                                <td>${element. id}</td>
                              
                                <td>${element.number}</td>
                                <td>${element.nickName}</td>
                                <td>${element.status==0?"审核中":element.status==1?"已通过":"未通过"}</td>
                               
                                <td class="color-blue"><a href="anchor_msg.html?item=nav-line-11&id=${element.uid}">查看</a></td>
                                <td>${datatime.getFullYear()}-${datatime.getMonth()+1>=10? datatime.getMonth()+1:"0"+ (datatime.getMonth()+1)}-${datatime.getDate()>=10? datatime.getDate():"0"+ datatime.getDate()} ${datatime.getHours()>=10? datatime.getHours():"0"+ datatime.getHours()}:${datatime.getMinutes()>=10? datatime.getMinutes():"0"+ datatime.getMinutes()}:${datatime.getSeconds()>10? datatime.getSeconds():"0"+ datatime.getSeconds()}</td>
                                <td class="text-blue">${element.signStatus == 0?"--":element.hetongStartTime+" 至 "+element.hetongEndTime}</td>
                                
                               <td class="text-blue">${element.signStatus == 0?"--": element.signTime}</td>
                                <td class="membership-edit">
                                    
                                    ${element.status==1?`
                                    <a href="edit_people.html?item=nav-line-11&id=${element.id}"  style="font-size:14px;">编辑</a>
                                   <!--  <a  href="sign_contact.html?item=nav-line-11&id=${element.id}"  style="font-size:14px;">签署合同</a>-->
                                    `:`     
                                     <a href="#" data-showmodal='agree-people-modal' data-id=${element.id} class="user-edit padd-agree-yes-not" data-modalclass="padd-agree-btn" style="font-size:14px;">同意</a>
                                      <a  class="user-edit padd-agree-yes-not" data-showmodal='not-agree-people-modal'  data-id=${element.id} data-modalclass="padd-agree-not-btn" style="font-size:14px;">驳回</a>`}
                                      
                                   
                                      
                                </td>`
                    );
                    tr_fram.appendChild(tr);
                }

                $("#tbody").html(tr_fram);

            }
        });


    },
    searchSome: function () {
        //上面搜索框
        $("#padd_search_btn").click(function (e) {
            e.preventDefault();
            var role = $(".role").val();
            var status = $(".status").val();
            var number = $(".number").val();
            var nickname = $(".nickname").val();
            var form = new FormData();
            form.append("role", role); // 
            form.append("status", status); // 
            form.append("nickname", nickname); // 
            form.append("number", number); // 
            form.append("page", 1); // 
            People_add.pagesFuc(1, form);
        });

    },
    Atte_msg: function (uid) {
        var form = new FormData();
        form.append("uid", uid); // 

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
    Sign_contact: function () {
        //签署合同

    },
    Edit_agree: function () {
        // 同意或者驳回
        $("#tableSort").on("click", ".padd-agree-yes-not", function (e) {
            e.preventDefault();

            $("." + $(this).data("showmodal")).find(".padd-agree-btn").attr("data-id", $(this).data("id"));


        })
        $(".padd-agree-btn").click(function (e) {
            e.preventDefault();
            var id = $(this).data("id");
            var status = $(this).data("status");
            var form = new FormData();
            form.append("id", id); // 
            form.append("status", status); // 
            fetch(server + "check/checkAnchor", {
                method: 'POST',

                mode: 'cors',
                cache: 'default',
                body: form
            }).then((response) => response.json()).then(function (data) {
                //console.log(data);
                if (data.code == 200) {
                    $('.modal-log-box').hide();
                    showInfo("操作成功");
                    setTimeout(function () {
                        window.location.reload();
                    }, 300);


                } else {
                    showInfo(data.message)
                }
            });
        });

    }

}

//成员月数据
var People_month_data = {
    init: function () {

    },
    li_length: null,
    n:0,
    pagesFuc: function (page_number, form) {

        fetch(server + "check/getStatisticMonthList", {
            method: 'POST',
            //      headers: { 'Accept': 'application/json',
            //      'Content-Type': 'application/json'},
            mode: 'cors',
            cache: 'default',
            body: form
        }).then((response) => response.json()).then(function (data) {
            //console.log(data);
            if (data.code == 200) {

                var li_leng = data.data.size;

                //分页
                var setTotalCount = li_leng;
                var all_pages = parseInt(li_leng % 20 == 0 ? li_leng / 20 : li_leng / 20 + 1);
                People_month_data.n++;
                if(  People_month_data.n==1){
                        $(".monthtime").val(data.data.currentTime);
                }
             
                $('.content-footer').paging({
                    initPageNo: 1, // 初始页码
                    totalPages: all_pages, //总页数
                    totalCount: '合计' + setTotalCount + '条数据', // 条目总数
                    slideSpeed: 600, // 缓动速度。单位毫秒
                    jump: false, //是否支持跳转
                    callback: function (page) { // 回调函数
                        //刷新页面
                        //console.log(page)
                        People_month_data.DataLoad(page_number, form);
                    }
                });


            }
        });

    },
    DataInit: function (page_number) {
        var form = new FormData();
        //  page=1     familyid=1

        form.append("role", ''); // 
        form.append("monthtime", ""); // 
        form.append("number", ""); // 
        form.append("page", page_number); // 
        this.pagesFuc(page_number, form);
    },

    DataLoad: function (page_number, form) {

        fetch(server + "check/getStatisticMonthList", {
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

                    var dateParms = element.createTime + "";

                    if (dateParms instanceof Date) {
                        var datatime = dateParms;
                    }

                    //判断是否为字符串

                    if ((typeof dateParms == "string") && dateParms.constructor == String) {

                        //将字符串日期转换为日期格式

                        var datatime = new Date(parseInt(dateParms));

                    }
                   
                    $(tr).html(
                        `
                    
                                <td>${element.number}</td>
                                <td>${element.nickName}</td>
                                  <td>${element.level==0?"普通":element.level==1?"精英":"优秀"}</td>
                                    <td>${element.totalTicket}</td>
                                        <td>${element.totalCount}</td>
                                         <td>${element.getrate * 100} %</td>
                                           <td>${element.role==0?"主播":element.role==1?"经纪人":"--"}</td>
                            
                                      
                                </td>`
                    );
                    tr_fram.appendChild(tr);
                }

                $("#tbody").html(tr_fram);

            }
        });


    },
    searchSome: function () {
        //上面搜索框
        $("#padd_search_btn").click(function (e) {
            e.preventDefault();
            var role = $(".role").val();

            var number = $(".number").val();
            var monthtime = $(".monthtime").val();
            var form = new FormData();


            form.append("role", role); // 
            form.append("monthtime", monthtime); // 

            form.append("number", number); // 
            form.append("page", 1); // 
            People_month_data.pagesFuc(1, form);
        });

    },
}

//成员天数据
var People_day_data = {
    init: function () {

    },
     li_length: null,
     n:0,
    pagesFuc: function (page_number, form) {

        fetch(server + "check/getStatisticDayList", {
            method: 'POST',
            //      headers: { 'Accept': 'application/json',
            //      'Content-Type': 'application/json'},
            mode: 'cors',
            cache: 'default',
            body: form
        }).then((response) => response.json()).then(function (data) {
            //console.log(data);
            if (data.code == 200) {

                var li_leng = data.data.size;

                //分页
                var setTotalCount = li_leng;
                People_day_data.n++;
                if(People_day_data.n==1){
                     $(".daytime").val(data.data.currentTime);
                }
                 
                var all_pages = parseInt(li_leng % 20 == 0 ? li_leng / 20 : li_leng / 20 + 1);
                $('.content-footer').paging({
                    initPageNo: 1, // 初始页码
                    totalPages: all_pages, //总页数
                    totalCount: '合计' + setTotalCount + '条数据', // 条目总数
                    slideSpeed: 600, // 缓动速度。单位毫秒
                    jump: false, //是否支持跳转
                    callback: function (page) { // 回调函数
                        //刷新页面
                        //console.log(page)
                        People_day_data.DataLoad(page_number, form);
                    }
                });


            }
        });

    },
    DataInit: function (page_number) {
        var form = new FormData();
        //  page=1     familyid=1

        form.append("role", ''); // 
        form.append("daytime", ""); // 
        form.append("number", ""); // 
        form.append("page", page_number); // 
        this.pagesFuc(page_number, form);
    },

    DataLoad: function (page_number, form) {

        fetch(server + "check/getStatisticDayList", {
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

                    var dateParms = element.createTime + "";

                    if (dateParms instanceof Date) {
                        var datatime = dateParms;
                    }

                    //判断是否为字符串

                    if ((typeof dateParms == "string") && dateParms.constructor == String) {

                        //将字符串日期转换为日期格式

                        var datatime = new Date(parseInt(dateParms));

                    }
                   
                    $(tr).html(
                        `
                    
                                <td>${element.number}</td>
                                <td>${element.nickName}</td>
                                  <td>${element.level==0?"普通":element.level==1?"精英":"优秀"}</td>
                                    <td>${element.totalTicket}</td>
                                        <td>${element.totalCount}</td>
                                         <td>${element.getrate * 100} %</td>
                                           <td>${element.role==0?"主播":element.role==1?"经纪人":"--"}</td>
                            
                                      
                                </td>`
                    );
                    tr_fram.appendChild(tr);
                }

                $("#tbody").html(tr_fram);

            }
        });


    },
    searchSome: function () {
        //上面搜索框
        $("#padd_search_btn").click(function (e) {
            e.preventDefault();
            var role = $(".role").val();

            var number = $(".number").val();
            var daytime = $(".daytime").val();
            var form = new FormData();


            form.append("role", role); // 
            form.append("daytime", daytime); // 

            form.append("number", number); // 
            form.append("page", 1); // 
            People_day_data.pagesFuc(1, form);
        });

    },
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