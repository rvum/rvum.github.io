var user = document.getElementById("user");
user.onclick=function(){
    window.location.href="./default.html?"+username;
};
window.onload = function () {
    username= window.location.search.toString().slice(1);
    user.innerHTML=username;
};
var username;
var cet4 = document.getElementById("cet4");
var cet6 = document.getElementById("cet6");
var cet4box = document.getElementById("cet4box");
var cet6box = document.getElementById("cet6box");
var wordcnt=50,signCet4,signCet6;
cet4.addEventListener('click', cet4Click);
cet6.addEventListener('click', cet6Click);
function cet4Click() {
    var flag = 0;
    if (cet4box.checked == true) {
        cet4box.checked = "";
        flag = 1
    } else if (flag == 0 && cet4box.checked == false) {
        cet4box.checked = "checked";
    }
}
function cet6Click() {
    var flag = 0;
    if (cet6box.checked == true) {
        cet6box.checked = "";
        flag = 1
    } else if (flag == 0 && cet6box.checked == false) {
        cet6box.checked = "checked";
    }
}
var fifRad = document.getElementById("fifRad");
var onhRad = document.getElementById("onhRad");
var fihRad = document.getElementById("fihRad");

var fif = document.getElementById("fif");
var onh = document.getElementById("onh");
var fih = document.getElementById("fih");

fif.addEventListener('click', fifClick);
onh.addEventListener('click', onhClick);
fih.addEventListener('click', fihClick);
function fifClick() {
    fifRad.checked = "checked";
}
function onhClick() {
    onhRad.checked = "checked";
}
function fihClick() {
    fihRad.checked = "checked";
}

var title1 = document.getElementById("title1");
var title2 = document.getElementById("title2");
function checkDic(){
    var dic = document.getElementsByClassName("dic");
    var flag = false ;
    var sign=[0,0];
    for(var i=0;i<dic.length;i++){
        if(dic[i].checked){
            flag = true ;
            sign[i]=1;
        }
    }
    signCet4= sign[0];
    signCet6= sign[1];
    if(!flag){
        i=1;
        var move =setInterval(function(){
            i=-i;
            title1.style.marginLeft=7*i+"px";
        },100);
        setTimeout(function(){
            clearInterval(move);
        },2000);
        return false ;
    }
}

function checkNumb(){
    var numb = document.getElementsByClassName("numb");
    var flag= false;
    var cnt=[50,100,150];
    for(var i= 0;i<numb.length;i++){
        if(numb[i].checked){
            flag = true;
            wordcnt=cnt[i];
        }
    }
    if(!flag){
        i=1;
        var move =setInterval(function(){
            i=-i;
            title2.style.marginLeft=7*i+"px";
        },100);
        setTimeout(function(){
            clearInterval(move);
        },2000);
        return false;
    }
}

var next = document.getElementById("next");
next.onclick=function(){
    checkDic();
    checkNumb();
    var request = new XMLHttpRequest();
    var data="username="+username+"&wordcnt="+wordcnt+"&signCet4="+signCet4+"&signCet6="+signCet6;
    request.open("POST","http://121.42.189.96/updatewordcnt/");
    request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    request.send(data);
    request.onreadystatechange=function(){
        if(request.readyState===4){
            if(request.status===200){
                var result = JSON.parse(request.responseText);
                if(result.code==0){
                    window.location.href="./start.html?"+username;
                }
            }
        }
    }

};
