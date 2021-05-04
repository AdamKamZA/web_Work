//get container
//print divs of random heights
function generateBars() {
    let container = document.getElementsByClassName("container")[0];
    let lbl = document.getElementById("lbl")
    //generate a number of divs
    for (let i = 0; i < 20; i++) {
        //random number
        let height = Math.floor((Math.random() * (300 - 50)) + 50);
        let div = document.createElement("div");
        //styling and adding to class to inherit css styling
        div.style = `height:${height}px; width:20px;`;
        div.classList.add("bar");
        //div.setAttribute("data-height", height);

        //adding event listeners
        div.addEventListener("mouseover", () => div.innerText = height);
        div.addEventListener("mouseout", () => div.innerText = "");

        //event listener for inspecting each div element(bar)
        div.addEventListener("click", () => events(div));

        container.appendChild(div);
    }
}

function events(div) {
    {
        let container = document.getElementById("inspectContainer");
        container.innerHTML = "";
        container.classList.add("isActive");
        let tDiv = div.cloneNode(true);//creating a clone
        //resetting the div on each click
        container.innerHTML = "";
        tDiv.classList.add("viewing");

        //remove height, but parse in as innerText
        let hVal = tDiv.innerText;
        tDiv.innerText = '';
        container.innerText = hVal;

        //adding events to the viewing div, only when a div is clicked
        let cont = document.getElementsByClassName("barDisplay")[0];
        cont.classList.add("show");

        cont.addEventListener("mouseover", () => {
            cont.style.transform = "translate(-10px,-10px)";
            cont.style.boxShadow = "10px 10px 15px 5px #202020"
        })
        cont.addEventListener("mouseout", () => {
            cont.style.transform = "translate(10px,10px)";
            cont.style.boxShadow = "0 0 0 0";
        })

        container.appendChild(tDiv);

    }
}
function bubbleSort() {
    //gets a list of the divs on the page, writing them and their heights into an array (maybe 2D)
    let objDiv = document.getElementsByClassName("bar");
    let interval = [];
    let len = objDiv.length;
    //start the sorting 
    for (let x = 0; x < len; x++) {
        for (let y = x + 1; y < len; y++) {
            interval.push(swap(objDiv, x, y));
        }
    }

    //stops all intervals after correct elapsed time
    setTimeout(() => {
        interval.forEach(val => clearInterval(val))
    }, 19200);
}

function swap(objDiv, x, y) {
    return setInterval(function () {
        objDiv[y].style.backgroundColor = "blue";
        if (objDiv[y].clientHeight < objDiv[x].clientHeight) {
            //looking to animate the transform 
            
            //swap
            objDiv[y].parentNode.insertBefore(objDiv[y], objDiv[x]);

        }
        objDiv[x].style.backgroundColor = "#262626";
    }, 1000 * y)

}

/* to display heights, I will append the div to another div at the bottom right
of the screen and I will refernce height, and its position, upon moving off of the BarProp, it will fade away */

function load() {
    let btnSort = document.getElementById("sort");
    btnSort.addEventListener("click", bubbleSort);
    let btnClose = document.getElementById("close");
    btnClose.addEventListener("click",function(){
        let cont = document.getElementsByClassName("barDisplay")[0];
        cont.classList.remove("show");
    })
}