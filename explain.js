var and = window.location.search.toString().indexOf("&");
var percent = window.location.search.toString().indexOf("%");
var count = window.location.search.toString().slice(parseInt(percent)+1);
var user = document.getElementById("user");
user.onclick=function(){
    window.location.href="./default.html?"+username;
};
window.onload = function () {
    username= window.location.search.toString().slice(1,parseInt(and));
    var user = document.getElementById("user");
    user.innerHTML=username;
    init();
};

function init(){
    var request = new XMLHttpRequest();
    var data = "word="+window.location.search.toString().slice(parseInt(and)+1,parseInt(percent));
    request.open("POST","http://121.42.189.96/getWordDetail/");
    request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    request.send(data);
    request.onreadystatechange=function(){
        if(request.readyState===4){
            if(request.status===200){
                var result = JSON.parse(request.responseText);
                var explainWord = document.getElementById("explainWord");
                explainWord.innerHTML=result.Data;
            }
        }
    };
}

var nextWord = document.getElementById("nextWord");
nextWord.addEventListener('click',nextWordClick);
function nextWordClick(){
    window.location.href="./page.html?"+username+"%"+count;
}