var username, words, count, wordNumb;
var user = document.getElementById("user");
var percent = window.location.search.toString().indexOf("%");
var countByUrl = window.location.search.slice(parseInt(percent) + 1);
if (countByUrl !== undefined && countByUrl.indexOf("?") == -1) count = countByUrl;
if (percent !== -1) {
    username = window.location.search.toString().slice(1, parseInt(percent));
} else {
    username = window.location.search.toString().slice(1);
}

user.onclick = function () {
    window.location.href = "./default.html?" + username;
};
window.onload = init;
function init() {
    getName();
    getWords();
}

function getName() {
    /*var slash = window.location.search.indexOf("/");
     alert("slash:"+slash);
     if(slash){
     username = window.location.search.toString().slice(1,parseInt(slash)+1);
     }else if(slash==-1){*/
    var user = document.getElementById("user");
    user.innerHTML = username;
}

function getWords() {
    var request = new XMLHttpRequest();
    var data = "username=" + username;
    request.open("POST", "http://121.42.189.96/getWord/");
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(data);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                words = JSON.parse(request.responseText).Data.word;
                wordNumb = JSON.parse(request.responseText).Data.uncompleted;
                if (count == undefined) {
                    count = 0;
                }
                displayTheWord();
            }
        }
    }
}

function displayTheWord() {
    var theWord = document.getElementById("word");
    theWord.innerHTML = words[count];
}

var know = document.getElementById("know");
var unKnow = document.getElementById("unKnow");
var val;

know.addEventListener('click', knowClick);
function knowClick() {
    count++;
    complete();
    displayTheWord();
    val = -2;
    var request = new XMLHttpRequest();
    var data = "username=" + username + "&word=" + words[count] + "&val=" + val;
    request.open("POST", "http://121.42.189.96/updateRecord/");
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(data);
    /*alert("aaa");
     request.onreadystatechange=function(){
     if(request.readyState==4){
     if(request.status==200){
     var result = JSON.parse(request.responseText);
     console.log(result);
     }
     }
     }*/
}

unKnow.addEventListener('click', unKnowClick);
function unKnowClick() {
    count++;
    complete();
    displayTheWord();
    val = 3;
    var request = new XMLHttpRequest();
    var data = "username=" + username + "&word=" + words[count] + "&val=" + val;
    request.open("POST", "http://121.42.189.96/updateRecord/");
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(data);
}

function complete() {
    if (count == wordNumb) {
        window.location.href = "./start.html?" + username;
    }
}

/*--------------分割线----------------------------------------------------------*/
var note = document.getElementById("note");
var addNote = document.getElementById("addNote");
var explain = document.getElementById("explain");
var share = document.getElementById("share");
explain.addEventListener('click', explainClick);
note.addEventListener('click', noteClick);
addNote.addEventListener('click', addNoteClick);
share.addEventListener('click', shareClick);
function explainClick() {
    window.location.href = "./explain.html?" + username + "&" + words[count] + "%" + count;
}

function noteClick() {
    window.location.href = "./note.html?" + username + "&" + words[count] + "%" + count;
}

function addNoteClick() {
    window.location.href = "./addNote.html?" + username + "&" + words[count] + "%" + count;
}

function shareClick() {
    window.location.href = "./share.html?" + username + "&" + words[count] + "%" + count;
}
