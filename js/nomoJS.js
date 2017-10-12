/**
 * Created by Administrator on 2016/8/22.
 */
function format(today) {
    var Clock = document.getElementById('Clock');
    var week=['日','一','二','三','四','五','六']
    var y=today.getFullYear();
    var m=today.getMonth()+1;
    m<10&&(m='0'+m);
    var d=today.getDate();
    d<10&&(d='0'+d);
    var w=week[today.getDay()];
    var result=y+"年"+m+"月"+d+"日 星期"+w;

//        小时
    var hours, minutes, seconds;
    var intHours, intMinutes, intSeconds;

    intHours = today.getHours();
    intMinutes = today.getMinutes();
    intSeconds = today.getSeconds();

    if (intHours == 0) {
        hours = "00:";
    } else if (intHours < 10) {
        hours = "0" + intHours+":";
    } else {
        hours = intHours + ":";
    }

    if (intMinutes < 10) {
        minutes = "0"+intMinutes+":";
    } else {
        minutes = intMinutes+":";
    }
    if (intSeconds < 10) {
        seconds = "0"+intSeconds+" ";
    } else {
        seconds = intSeconds+" ";
    }
    timeString = hours+minutes+seconds;
    Clock.innerHTML = result + " " + timeString;
    window.setTimeout("format(new Date());", 1000);
}
function format2(today) {
    var Clock = document.getElementById('Clock_2');
    var week=['日','一','二','三','四','五','六']
    var y=today.getFullYear();
    var m=today.getMonth()+1;
    m<10&&(m='0'+m);
    var d=today.getDate();
    d<10&&(d='0'+d);
    var w=week[today.getDay()];
    var result=y+"年"+m+"月"+d+"日";

//        小时
    var hours, minutes, seconds;
    var intHours, intMinutes, intSeconds;

    intHours = today.getHours();
    intMinutes = today.getMinutes();
    intSeconds = today.getSeconds();

    if (intHours == 0) {
        hours = "00:";
    } else if (intHours < 10) {
        hours = "0" + intHours+":";
    } else {
        hours = intHours + ":";
    }

    if (intMinutes < 10) {
        minutes = "0"+intMinutes+":";
    } else {
        minutes = intMinutes+":";
    }
    if (intSeconds < 10) {
        seconds = "0"+intSeconds+" ";
    } else {
        seconds = intSeconds+" ";
    }
    timeString = hours+minutes+seconds;
    Clock.innerHTML = result ;
    window.setTimeout("format(new Date());", 1000);
}
