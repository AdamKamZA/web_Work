let mainContainer = document.querySelector(".Main_Container");
let pg1 = document.querySelector(".page_home");
let navBar = document.getElementById("navBar");
let navBarUL = document.querySelector("#navBar ul");
let navBarAnc = document.querySelectorAll("#navBar ul li a");
let navBarHeight = navBar.getBoundingClientRect()
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
        //navBarAnc.style.fontSize = "2vh";
        //console.log(navBar.childNodes);
    }else if(offset<170){
        navBar.classList.remove("fixedMenu");
        //adjust to regular sizes
        navBar.style.height = "13vh";
        navBarAnc.forEach(anchor => {
            anchor.style.fontSize = "4vh";
        });
    }

}


function navController(){
    let offset = mainContainer.scrollTop;
    logoController(offset);
    stickyNav(offset);
}
mainContainer.addEventListener("scroll",navController);
