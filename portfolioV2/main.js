let mainContainer = document.querySelector(".Main_Container");
let navBar = document.getElementById("navBar");
let navBarUL = document.querySelector("#navBar ul");
let navBarAnc = document.querySelectorAll("#navBar ul li a");
let akLog = document.querySelector(".ak_Logo");
let logos = document.getElementsByClassName("logo");
//need one for a controller
let l1 = logos[0].offsetTop;
let isHidden = false;

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
            logos[i].style.top= (17-(100*(offset/document.body.clientHeight)))+"vh";
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
        //navBarAnc.style.fontSize = "2vh";
        //console.log(navBar.childNodes);
    }else if(offset<170){
        navBar.classList.remove("fixedMenu");
        //adjust to regular sizes
        navBar.style.height = "13vh";
        navBarAnc.forEach(anchor => {
            anchor.style.fontSize = "4vh";
        });
        akLog.classList.remove("ak_Show");
    }

}


function navController(){
    let offset = mainContainer.scrollTop;
    logoController(offset);
    stickyNav(offset);
}
mainContainer.addEventListener("scroll",navController);
