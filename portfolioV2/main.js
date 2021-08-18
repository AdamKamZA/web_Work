import Scene from "./scene.js"


const mainContainer = document.querySelector(".Main_Container");
const navBar = document.getElementById("navBar");
const navBarHeight = navBar.getBoundingClientRect()
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
        //maybe add in the sticky here
    }else if(offset <= 150){
        isHidden = false;
        for(let i =0; i<logos.length;i++){
            logos[i].classList.remove("hidden");
        }
    }
    for(let i=0; i<logos.length;i++){
        logos[i].style.top = ((l1 - offset)*(100/document.documentElement.clientHeight))-6+"vh";
    }
}

function stickyNav(){
    //mainContainer.classList.add("fixed");
}


function navController(){
    let offset = mainContainer.scrollTop;
    //console.log(offset);
    logoController(offset);
}

mainContainer.addEventListener("scroll",navController);

let clock = new THREE.Clock();
let DOM_Scene = document.querySelector(".scene");
let cont_scene = new Scene(DOM_Scene);
update();
function update(){
    cont_scene.update(clock.getDelta());
    window.requestAnimationFrame(update);
}

