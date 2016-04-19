var and = window.location.search.toString().indexOf("&");
var percent = window.location.search.toString().indexOf("%");
var count = window.location.search.toString().slice(parseInt(percent)+1);
var user = document.getElementById("user");
username= window.location.search.toString().slice(1,parseInt(and));
window.onload = function () {
    user.innerHTML=username;
    init();
};

function init(){
    var request = new XMLHttpRequest();
    var data="username="+username+"&word="+window.location.search.toString().slice(parseInt(and)+1,percent)+"&power=0"+"&page="+5;
    request.open("POST","http://121.42.189.96/getNote/");
    request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    request.send(data);
    request.onreadystatechange=function(){
        if(request.readyState===4){
            if(request.status===200){
                var result = JSON.parse(request.responseText).Data;
                var lookUpNote = document.getElementById("lookUpNote");
                //console.log(result);
                //console.log(result.word[1].content);
                //console.log(result.word[2].content);
                for(i=0;i<result.word.length;i++){
                    lookUpNote.innerHTML+=i+1+" "+result.word[i].content+"<br>";
                }

            }
        }
    }
}

user.onclick=function(){
    window.location.href="./default.html?"+username;
};

var nextWord = document.getElementById("nextWord");
nextWord.addEventListener('click',nextWordClick);
function nextWordClick(){
    window.location.href="./page.html?"+username+"%"+count;
}