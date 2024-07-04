//element references
const gridContainer = document.querySelector(`#grid`);
let drawableGrid = ``;


let grid = {
    height: 450,
    width: 450,
    gridSize: 16,
    backgroundColor: `white`,
    brushColor: `rgb(0 0 0 / 50%)`,
}

function drawGrid() {
    gridContainer.style.width = `${grid.width}px`;

    let pixelColumn = document.createElement(`div`);
    pixelColumn.classList.add(`pixel-column`);
    pixelColumn.style.cssText = `flex:1;`;

    let pixel = document.createElement(`div`);
    pixel.classList.add(`pixel`);
    pixel.style.cssText = `border: 1px transparent solid;`;
    pixel.style.height = `${+grid.height / +grid.gridSize}px`;

    for (let i = 0; i < (grid.gridSize); i++) {
        let columnClone = pixelColumn.cloneNode(true);

        for (let i = 0; i < (grid.gridSize); i++) {
            let pixelClone = pixel.cloneNode(true);
            columnClone.appendChild(pixelClone);
        }
        gridContainer.appendChild(columnClone);
    }
    drawableGrid = gridContainer.querySelectorAll(`.pixel`); //can only initializes after drawGrid()
    gridListeners();
}

function destroyGrid() {
    let pixelColumn = document.querySelectorAll(`.pixel-column`);
    pixelColumn.forEach((column) => {
        column.remove();
    })
}

function whileMouseDownMoving(target, callback) {
    const endMoving = () => {
        gridContainer.removeEventListener(`mousemove`, callback);
        gridContainer.removeEventListener(`mouseup`, endMoving);
    }

    target.addEventListener(`mousedown`, (e) => {
        e.stopPropagation();
        gridContainer.addEventListener(`mousemove`, callback);
        gridContainer.addEventListener(`mouseup`, endMoving);
    });
}

//button functions
const gridRangeSlider = () => {
    const slider = document.querySelector(`#range-sl`);
    const sliderTitle = document.querySelector(`label>span`);
    sliderTitle.textContent = `${slider.value} x ${slider.value}`;
    grid.gridSize = slider.value;
    destroyGrid();
    drawGrid();
}

const clearGridBtn = () => {
    drawableGrid.forEach((pixel) => {
        pixel.style.backgroundColor = grid.backgroundColor;
    });
};

const brushColorBtn = () => {
    const colorPicker = document.querySelector(`#color-pk`);
    colorPicker.style.value = `rgb(0,0,0, .5)`;
    return colorPicker.value;
}

//checkbox actions
const randomPixelColor = () => {
    let randomNum = () => Math.floor(Math.random() * 255);
    return `rgb(${randomNum()} ${randomNum()} ${randomNum()} / 50%)`;
}

const darkenPixelColor = (eventObj) => {
    console.log(eventObj.target.backgroundColor);//only works for inline html, will be: undefined

    //needed for getting a node list from color css property
    const nameToRgba = (rgb) => {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.fillStyle = rgb;
        context.fillRect(0, 0, 1, 1);
        return context.getImageData(0, 0, 1, 1).data;
    }

    let computedRGB = window.getComputedStyle(eventObj.target).getPropertyValue(`background-color`);
    let colorArray = Array.from(nameToRgba(computedRGB));
    let colorAlpha = +((colorArray[colorArray.length - 1]) / 255).toFixed(2);
    
    if(colorAlpha == 0){
        colorAlpha += .1;
    }
    else if (colorAlpha < 1) {
        colorAlpha *= 1.1;
    }
    
    colorArray.splice(3, 1, colorAlpha);


    return `rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, ${colorArray[3]})`;
}


//brush/coloring interactions
function colorPixelAction(eventObj) {
    if (eventObj.target.classList[0] == `pixel` && document.querySelector(`#darken-cb`).checked === true) {
        eventObj.target.style.backgroundColor = darkenPixelColor(eventObj);
    }

    else if (eventObj.target.classList[0] == `pixel` && document.querySelector(`#random-cb`).checked === true) {
        eventObj.target.style.backgroundColor = randomPixelColor();
    }
    else if (eventObj.target.classList[0] == `pixel`) {
        eventObj.target.style.backgroundColor = brushColorBtn();
    }


}

function gridListeners() {
    drawableGrid.forEach((pixel) => {
        whileMouseDownMoving(pixel, (e) => {
            colorPixelAction(e);
        })
    });
}

//testing
function btnListeners() {
    const buttonArray = document.querySelectorAll(`.btn`);
    buttonArray.forEach((button) => {
        button.addEventListener(`click`, (e) => {
            // console.log(e.target);
            // console.log(e.target.name);
            // console.log(e.target.value);
            // console.log(e.target.checked);
            // console.log(e.target.color);


            if (e.target.name == clearGridBtn.name) clearGridBtn();
            if (e.target.name == gridRangeSlider.name) gridRangeSlider();


        });
    });

}

drawGrid();
btnListeners();
