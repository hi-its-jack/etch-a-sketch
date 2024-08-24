document.addEventListener("DOMContentLoaded", () => {

//default values 
let setting = "colour"
let mouseDown = false

//buttons/container
const container = document.querySelector("#container")
const colourBtn = document.querySelector("#colour-btn")
const randomBtn = document.querySelector("#random-btn")
const darkeningBtn = document.querySelector("#darkening-btn")
const eraserBtn = document.querySelector("#eraser-btn")
const resetBtn = document.querySelector("#reset-btn")
const gridSizeBtn = document.querySelector("#gridSize-btn")

//create grid
function createGrid(size){
    container.innerHTML = ""
    const gridSquareSize = parseFloat(window.getComputedStyle(container).width) / size
    for(let i = 0; i < size*size; i++){
        const gridSquare = document.createElement("div")
        gridSquare.classList.add("grid-Square")
        gridSquare.style.height = `${gridSquareSize}px`
        gridSquare.style.width = `${gridSquareSize}px`
        gridSquare.style.backgroundColor = "white"
    
    gridSquare.addEventListener("mousedown", () => {
        mouseDown = true
        changeColour(gridSquare)
    })
    gridSquare.addEventListener("mouseover", () => {
        if (mouseDown){        
            changeColour(gridSquare)
        }
    })
    // gridSquare.addEventListener("mouseup", () => {
    //     mouseDown = false
    // })

    container.appendChild(gridSquare)        
    }
}

//event listeners
colourBtn.addEventListener("click", () => {
    setting = "colour"
})
randomBtn.addEventListener("click", () => {
    setting = "random"
})
darkeningBtn.addEventListener("click", () => {
    setting = "darkening"
})
eraserBtn.addEventListener("click", () => {
    setting = "eraser"
})
resetBtn.addEventListener("click", () => {
    createGrid(16)
})
gridSizeBtn.addEventListener("click", () => {
    let newSize;
    do {
        newSize = parseInt(prompt('Enter new grid size (between 2 and 99):', 16), 10);
    } while (!Number.isInteger(newSize) || newSize < 2 || newSize > 99);
    createGrid(newSize);
});

//change colour
function changeColour(gridSquare){
    switch(setting){
        case "colour":
            gridSquare.style.backgroundColor = "grey"
            break
        case "random":
            gridSquare.style.backgroundColor = randomColour()
            break
        case "darkening":
            gridSquare.style.backgroundColor = darkenColour(gridSquare)
            break
        case "eraser":
            gridSquare.style.backgroundColor = "white"
            break
    }
} 

function randomColour() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

function darkenColour(gridSquare) {
    const currentColor = window.getComputedStyle(gridSquare).backgroundColor;
    const [r, g, b] = currentColor.match(/\d+/g).map(Number);
    return `rgb(${Math.max(r - 25, 0)}, ${Math.max(g - 25, 0)}, ${Math.max(b - 25, 0)})`;
}

document.addEventListener("mouseup", () => {
    mouseDown = false;
});

//initialise
createGrid(16)
})