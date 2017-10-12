function TableSort() {
    var tableObject = $('#tableSort'); //获取id为tableSort的table对象  
    var tbHead = tableObject.children('thead'); //获取table对象下的thead  
    var tbHeadTh = tbHead.find('tr th'); //获取thead下的tr下的th  
    var tbBody = tableObject.children('tbody'); //获取table对象下的tbody  
    var tbBodyTr = tbBody.find('tr'); //获取tbody下的tr  
    // 排序列表
    var sortIndex = -1;
    // 正排序
    var sortOrder = true;
    checkColumnValue(1, 'number');
    tbHeadTh.each(function () {//遍历thead的tr下的th  
        var thisIndex = tbHeadTh.index($(this)); //获取th所在的列号  
        
        if ($(this).hasClass('table-sort')) {
            $(this).click(function () {//给当前表头th增加点击事件 
                // 清除其他th的箭头样式
                $(this).siblings('.sort-down').removeClass('sort-down').addClass('sort-both');
                $(this).siblings('.sort-up').removeClass('sort-up').addClass('sort-both');
                // 添加被点击的th箭头样式
                $(this).removeClass('sort-both').addClass('sort-down');
                if (sortIndex == thisIndex) {
                    // 判断是正排序还是倒排序
                    if (!sortOrder) {
                        $(this).removeClass('sort-up').addClass('sort-down');
                    } else {
                        $(this).removeClass('sort-down').addClass('sort-up');
                    }
                }
                var dataType = $(this).attr("type");//点击时获取当前th的type属性值  
                checkColumnValue(thisIndex, dataType);
            });
        }

    });


    //对表格排序  
    function checkColumnValue(index, type) {

        var trsValue = new Array();
        tbBodyTr.each(function () {
            var tds = $(this).find('td');
            //获取行号为index列的某一行的单元格内容与该单元格所在行的行内容添加到数组trsValue中 
            trsValue.push(type + ".separator" + $(tds[index]).html() + ".separator" + $(this).html());
            $(this).html("");
        });

        var len = trsValue.length;

        if (index == sortIndex) {
            //如果已经排序了则直接倒序 
            trsValue.reverse();
            if (sortOrder) {
                sortOrder = false;
            } else {
                sortOrder = true;
            }
        } else {
            for (var i = 0; i < len; i++) {
                //split() 方法用于把一个字符串分割成字符串数组  
                //获取每行分割后数组的第一个值,即此列的数组类型,定义了字符串\数字\Ip  
                type = trsValue[i].split(".separator")[0];
                for (var j = i + 1; j < len; j++) {
                    //获取每行分割后数组的第二个值,即文本值  
                    value1 = trsValue[i].split(".separator")[1];

                    //获取下一行分割后数组的第二个值,即文本值  
                    value2 = trsValue[j].split(".separator")[1];

                    //接下来是数字\字符串等的比较  
                    if (type == "number") {
                        value1 = value1 == "" ? 0 : value1;
                        value2 = value2 == "" ? 0 : value2;
                        if (parseFloat(value1) > parseFloat(value2)) {
                            var temp = trsValue[j];
                            trsValue[j] = trsValue[i];
                            trsValue[i] = temp;
                        }
                    } else if (type == "ip") {
                        if (ip2int(value1) > ip2int(value2)) {
                            var temp = trsValue[j];
                            trsValue[j] = trsValue[i];
                            trsValue[i] = temp;
                        }
                    } else {
                        if (value1.localeCompare(value2) > 0) {//该方法不兼容谷歌浏览器  
                            var temp = trsValue[j];
                            trsValue[j] = trsValue[i];
                            trsValue[i] = temp;
                        }
                    }
                }
            }
        }

        for (var i = 0; i < len; i++) {
            $("tbody tr:eq(" + i + ")").html(trsValue[i].split(".separator")[2]);
        }
        sortIndex = index;
    }

    //IP转成整型  
    function ip2int(ip) {
        var num = 0;
        ip = ip.split(".");
        num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
        return num;
    }

}