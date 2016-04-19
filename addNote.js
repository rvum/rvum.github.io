var addToNote = document.getElementById("addToNote");
var username;
var and = window.location.search.toString().indexOf("&");
var percent = window.location.search.toString().indexOf("%");
var count = window.location.search.toString().slice(parseInt(percent)+1);
var user = document.getElementById("user");
username= window.location.search.toString().slice(1,parseInt(and));

window.onload = function () {
    username= window.location.search.toString().slice(1,parseInt(and));
    user.innerHTML=username;
};

var submitNote1 = document.getElementById("submitNote1");
var submitNOte2 = document.getElementById("submitNote2");
submitNote1.addEventListener('click',submitNote1Click);
submitNOte2.addEventListener('click',submitNote2Click);


function submitNote1Click(){

    var request = new XMLHttpRequest();
    request.open("POST","http://121.42.189.96/addNote/");
    request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    var value = addToNote.value;
    var data="username="+username+"&content="+value+"&power=1"+"&word="+window.location.search.toString().slice(parseInt(and)+1,percent);
    request.send(data);
    window.location.href="./page.html?"+username+"%"+count;
    return false;
}

function submitNote2Click(){

    var request = new XMLHttpRequest();
    request.open("POST","http://121.42.189.96/addNote/");
    request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    var value = addToNote.value;
    var data="username="+username+"&content="+value+"&power=0"+"&word="+window.location.search.toString().slice(parseInt(and)+1,percent);
    request.send(data);
    window.location.href="./page.html?"+username+"%"+count;
    return false;
}

user.onclick=function(){
    window.location.href="./default.html?"+username;
};
