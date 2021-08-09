/* 
    https://armandocanals.com/posts/CSS-transform-rotating-a-3D-object-perspective-based-on-mouse-position.html
*/

//restricting the amount of rotation on the div
let constrain = 800;
//the container that we base the rotation off of
//parent
let mouseOverContainer = document.getElementById("hoverImg");
//the item that we rotate
//child
let ex1Layer = document.getElementsByClassName("image")[0];

//calculating the y and x rotations
function transforms(x,y,el){
    let box = el.getBoundingClientRect();

    //getting a ratio between the center of the object and the mouse cursor position on the specified div
    let calcX  = -(y-box.y-(box.height/2))/constrain;
    let calcY  = -(x-box.x-(box.width/2))/constrain;

    //returning the rotation based on the ratio calculated
    return `perspective(100px) rotateX(${calcX}deg) rotateY(${calcY}deg)`;
}
//applying the transform
function transformElement(el, xyEl){
    el.style.transform = transforms.apply(null,xyEl);
}

//creating an event to run the code
mouseOverContainer.onmousemove = function(e){
    //getting the x and y values on the screen of the specified div that triggers the div movement
    let xy = [e.clientX, e.clientY];
    let position = xy.concat([ex1Layer]);

    window.requestAnimationFrame(function(){
        transformElement(ex1Layer, position)
    });
};