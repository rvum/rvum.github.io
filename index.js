var button = document.getElementById("button");
var username = document.getElementById("username");
var password = document.getElementById("password");
var surePassword = document.getElementById("surePassword");
var wrong = document.getElementById("wrong");
var code,same=0;
window.onload=function(){
    button.addEventListener('click',buttonClick);
    username.addEventListener('focus',userFocus);
    password.addEventListener('focus',pswFocus);
    surePassword.addEventListener('focus',pswFocus);

};
function buttonClick(){
    samePsw();
    if(password.value==surePassword.value && password.value!==""){
        var data = "username="+username.value+"&password="+password.value;
        var request = new XMLHttpRequest();
        request.open("POST","http://121.42.189.96/register/");
        request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        request.send(data);
        request.onreadystatechange=function() {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    var result = JSON.parse(request.responseText);
                    code= result.code;
                    if(code==1){
                        wrong.innerHTML="*用户名已被注册";
                        wrong.className="wrongUser";
                        username.value="";
                        password.value="";
                        surePassword.value="";
                        return false;
                    }
                    if(code==0){
                        window.location.href="./default.html?"+username.value;
                    }
                    return false;
                }
                return false;
            }
            return false;
        };
        return false;
    }

}
/*-------分割线------------------------------------------------------------*/
function samePsw(){
    if(password.value!==surePassword.value && password.value!==""){
        same=1;
        wrong.innerHTML="*密码输入不一致";
        wrong.className="wrongPsw";
        password.value="";
        surePassword.value="";
    }
}
function userFocus(){
    if(code==1){
        wrong.innerHTML="";
        wrong.className="";
    }
}

function pswFocus(){
    if(same){
        same=0;
        wrong.innerHTML="";
        wrong.className="";
    }
}

