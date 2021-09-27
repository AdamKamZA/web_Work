//const MailjetClient = require("./node-mailjet");

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
function logoController(offset) {
    if (offset > 150 && isHidden == false) {
        isHidden = true;
        for (let i = 0; i < logos.length; i++) {
            logos[i].classList.add("hidden");
        }
        //maybe add in the sticky heres
    } else if (offset <= 150) {
        isHidden = false;
        for (let i = 0; i < logos.length; i++) {
            logos[i].style.top = (16.5 - (100 * (offset / document.body.clientHeight))) + "vh";
            logos[i].classList.remove("hidden");
        }
    }
}

function stickyNav(offset) {
    if (offset >= 170) {
        navBar.classList.add("fixedMenu");
        navBar.style.height = "7vh";
        navBarAnc.forEach(anchor => {
            anchor.style.fontSize = "3vh";
        });
        akLog.classList.add("ak_Show");
        changeBTN();

    } else if (offset < 170) {
        navBar.classList.remove("fixedMenu");
        //adjust to regular sizes
        navBar.style.height = "13vh";

        if (window.innerWidth >= 1390) {
            navBarAnc.forEach(anchor => {
                anchor.style.fontSize = "4vh";
            });
        }
        akLog.classList.remove("ak_Show");
        resetBTN()
    }

}
/* Compact code to edit the button */
function changeBTN() {
    btn.style.backgroundColor = "rgb(25, 25, 25)";
    btn.style.color = "rgb(216, 216, 216)";
    btn.style.transform = "rotateZ(0deg)";
    btn.style.top = "-10px";
}
function resetBTN() {
    btn.style.backgroundColor = "rgb(216, 216, 216)";
    btn.style.color = "rgb(25, 25, 25)";
    btn.style.transform = "rotateZ(-10deg)";
    btn.style.top = "0.2vh";
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

function email() {
    MailjetClient
        .connect('281d27645303eeb106f97d38d92b253e', 'b5ef532b1440db54675e1d34d30ebdf3')
    const request = mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [
                {
                    "From": {
                        "Email": "arturkars01@gmail.com",
                        "Name": "Adam"
                    },
                    "To": [
                        {
                            "Email": "arturkars01@gmail.com",
                            "Name": "Adam"
                        }
                    ],
                    "Subject": "Greetings from Mailjet.",
                    "TextPart": "My first Mailjet email",
                    "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
                    "CustomID": "AppGettingStartedTest"
                }
            ]
        })
    request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })
}
function navController() {
    let offset = mainContainer.scrollTop;
    logoController(offset);
    stickyNav(offset);
}
mainContainer.addEventListener("scroll", navController);
btn.addEventListener("click", () => DownloadFile("CV_Current.pdf"));
document.getElementById("tst").addEventListener('click', email)