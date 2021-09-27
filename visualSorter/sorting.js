/**
 * This set of code is single file that controls random generation of divs between a certain range
 * Sorting controller and visual elements are controlled in this script too
 */

/**
 * Generates the vertical bars for the user to see and identify the differences between them
 */
function generateBars() {
    let container = document.getElementsByClassName("container")[0];
    let lbl = document.getElementById("lbl")
    //generate a number of divs
    for (let i = 0; i < 20; i++) {
        //height ranges from 50-300px
        let height = Math.floor((Math.random() * (300 - 50)) + 50);
        let div = document.createElement("div");
        //styling and adding to class to inherit css styling
        div.style = `height:${height}px; width:20px;`;
        div.classList.add("bar");

        //adding event listeners
        div.addEventListener("mouseover", () => div.innerText = height);
        div.addEventListener("mouseout", () => div.innerText = "");

        //event listener for inspecting each div element(bar)
        div.addEventListener("click", () => events(div));

        container.appendChild(div);
    }
}

/**
 * adds events to each bar on the screen
 * 
 * @param {div} div The generated div bar
 */
function events(div) {
    let container = document.getElementById("inspectContainer");
    container.innerHTML = "";
    container.classList.add("isActive");
    let tDiv = div.cloneNode(true);//creating a clone
    //resetting the div on each click
    container.innerHTML = "";
    tDiv.classList.add("viewing");

    //remove height, but parse in as innerText
    let hVal = tDiv.innerText;
    tDiv.innerText = "";
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

/**
 * The chosen method of sorting - Bubble Sort
 */
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
        interval.forEach(val => {
            clearInterval(val);
        });
    }, 19200);
}
function swap(objDiv, x, y) {
    return setInterval(function () {
        let finalChildAStyle = null
        finalChildAStyle = objDiv[y].getBoundingClientRect().left - objDiv[x].getBoundingClientRect().left;
        objDiv[y].style.backgroundColor = "blue";
        objDiv[x].style.backgroundColor = "#A3A697ad";
        if (objDiv[y].clientHeight < objDiv[x].clientHeight) {
            //swap
            objDiv[y].parentNode.insertBefore(objDiv[y], objDiv[x]);
        }


    }, 1000 * y)

}

/**
 * load is used to prepare the webpage with events 
 * created after all elements on the webpage have been created
 */
function load() {
    let btnSort = document.getElementById("sort");
    btnSort.addEventListener("click", bubbleSort);
    let btnClose = document.getElementById("close");
    btnClose.addEventListener("click", e=>{
        let cont = document.getElementsByClassName("barDisplay")[0];
        cont.classList.remove("show");
    });

    let contClick = document.getElementById("inspectContainer");
    let btnClone = btnClose.cloneNode(true);
    contClick.addEventListener("click", () => {
        let overlay = document.getElementsByClassName("overlay")[0];
        overlay.classList.add("isActive");
        let cont = document.getElementsByClassName("barDisplay")[0];
        cont.classList.remove("show");
        btnClone.addEventListener("click", e=>{
            overlay.classList.remove("isActive");
            cont.appendChild(contClick);
            cont.classList.add("show");
        });
        overlay.appendChild(contClick);
        overlay.appendChild(btnClone);
        
    })
}

function reset(){
    let container = document.querySelector(".container");
    container.innerHTML="";
    generateBars();
}