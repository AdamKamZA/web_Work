let mainContainer = document.querySelector(".Main_Container");
let navBar = document.getElementById("navBar");
let navBarUL = document.querySelector("#navBar ul");
let navBarAnc = document.querySelectorAll("#navBar ul li a");
let akLog = document.querySelector(".ak_Logo");
let btn = document.getElementById("btnCV");
let logos = document.getElementsByClassName("logo");
//need one for a controller
let l1 = logos[0].offsetTop;
let isHidden = false;

//const myCV = new File(["cv"], "cv.pdf", {type:"text/pdf"});
function logoController(offset){
    if(offset > 150 && isHidden==false){
        isHidden=true;
        for(let i =0; i<logos.length;i++){
            logos[i].classList.add("hidden");
        }
        //maybe add in the sticky heres
    }else if(offset <= 150){
        isHidden = false;
        for(let i =0; i<logos.length;i++){
            logos[i].style.top= (16.5-(100*(offset/document.body.clientHeight)))+"vh";
            logos[i].classList.remove("hidden");            
        }
    }
}

function stickyNav(offset){
    if(offset>=170){        
        navBar.classList.add("fixedMenu");
        navBar.style.height = "7vh";
        navBarAnc.forEach(anchor => {
            anchor.style.fontSize = "3vh";
        });
        akLog.classList.add("ak_Show");
        changeBTN();

    }else if(offset<170){
        navBar.classList.remove("fixedMenu");
        //adjust to regular sizes
        navBar.style.height = "13vh";
        navBarAnc.forEach(anchor => {
            anchor.style.fontSize = "4vh";
        });
        akLog.classList.remove("ak_Show");
        resetBTN()
    }

}
/* Compact code to edit the button */
function changeBTN(){
    btn.style.backgroundColor="rgb(25, 25, 25)";
    btn.style.color = "rgb(216, 216, 216)";
    btn.style.transform="rotateZ(0deg)";
    btn.style.top="-10px";
}
function resetBTN(){
    btn.style.backgroundColor="rgb(216, 216, 216)";
    btn.style.color = "rgb(25, 25, 25)";
    btn.style.transform="rotateZ(-10deg)";
    btn.style.top="0.2vh";
}

//does not work
function download(){
    //Create XMLHTTP Request.
    var req = new XMLHttpRequest();
    let fileName = "cv.pdf";
    req.open("GET", "files/cv.pdf", true);
    req.responseType = "blob";
    req.onload = function () {
        //Convert the Byte Data to BLOB object.
        var blob = new Blob([req.response], { type: "application/pdf" ,src:"data:application/pdf;base64"});

        //Check the Browser type and download the File.
        var isIE = false || !!document.documentMode;
        if (isIE) {
            window.navigator.msSaveBlob(blob, fileName);
        } else {
            let url = window.URL || window.webkitURL;
            let a = document.createElement("a");
            a.setAttribute("download", fileName);
            a.setAttribute("href", window.URL.createObjectURL(blob));
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };
    req.send();

}

function DownloadFile(fileName) {
    //Set the File URL.
    var url = "files/" + fileName;

    //Create XMLHTTP Request.
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "blob";
    req.onload = function () {
        //Convert the Byte Data to BLOB object.
        var blob = new Blob([req.response], { type: "application/octetstream" });

        //Check the Browser type and download the File.
        var isIE = false || !!document.documentMode;
        if (isIE) {
            window.navigator.msSaveBlob(blob, fileName);
        } else {
            var url = window.URL || window.webkitURL;
            var link = url.createObjectURL(blob);
            var a = document.createElement("a");
            a.setAttribute("download", fileName);
            a.setAttribute("href", link);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };
    req.send();
}
function navController(){
    let offset = mainContainer.scrollTop;
    logoController(offset);
    stickyNav(offset);
}
mainContainer.addEventListener("scroll",navController);
btn.addEventListener("click",()=>DownloadFile("CV_Current.pdf"));