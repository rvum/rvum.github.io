var username;
window.onload=function(){
    getName();
    init();
    var start = document.getElementById("start");
    start.addEventListener('click',startClick);
    function startClick(){
        window.location.href="./page.html?"+username;
    }
};
var user = document.getElementById("user");
function getName(){
    username = window.location.search.toString().slice(1);
    user.innerHTML=username;
}

function init(){
    var request = new XMLHttpRequest();
    var data = "username="+username;
    request.open("POST","http://121.42.189.96/getWord/");
    request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    request.send(data);
    request.onreadystatechange=function(){
        if(request.readyState===4){
            if(request.status===200){
                var result = JSON.parse(request.responseText).Data;
                console.log(result);
                var today = document.getElementById("today");
                today.innerHTML=result.uncompleted;
                var newWord = document.getElementById("new");
                newWord.innerHTML=result.completed;

            }
        }
    }
}
//维他柠檬茶o
user.onclick=function(){
    window.location.href="./default.html?"+username;
};
