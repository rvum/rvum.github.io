var button = document.getElementById("button");
var wrong = document.getElementById("wrong");
window.onload=function (){
    button.addEventListener('click',login);
};
function login(){
    var data = "username="+username.value+"&password="+password.value;
    var request = new XMLHttpRequest();
    request.open("POST","http://121.42.189.96/login/");
    request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    request.send(data);
    request.onreadystatechange=function(){
        if(request.readyState==4){
            if(request.status==200){
                var result = JSON.parse(request.responseText);
                var code = result.code;
                if(code==0){
                    window.location.href="./start.html?"+username.value;
                }else{
                    wrong.innerHTML="*密码错误";
                    wrong.className="wrongLogin";
                }
            }
        }
    }
}