console.log(`i'm here`);

//element references
const gridContainer = document.querySelector(`#grid`);

let grid = {
    height: 400,
    width: 400,
    gridSize: 16,
    backgroundColor: `white`,
    brushColor: `rgb(0 0 0 / 50%)`,
}

function drawGrid() {
    let pixelColumn = document.createElement(`div`);
    pixelColumn.classList.add(`pixel-column`);
    pixelColumn.style.cssText = `flex:1;`;

    let pixel = document.createElement(`div`);
    pixel.classList.add(`pixel`);
    pixel.style.cssText = `border: 1px black solid;`;
    pixel.style.height = `${+grid.height / +grid.gridSize}px`;

    for (let i = 0; i < (grid.gridSize); i++) {
        let columnClone = pixelColumn.cloneNode(true);

        for (let i = 0; i < (grid.gridSize); i++) {
            let pixelClone = pixel.cloneNode(true);
            columnClone.appendChild(pixelClone);
        }
        gridContainer.appendChild(columnClone);
    }
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


drawGrid();

const drawableGrid = gridContainer.querySelectorAll(`.pixel`); //only initializes after drawGrid()

drawableGrid.forEach((pixel) => {
    whileMouseDownMoving(pixel, (e) => {
        colorPixelAction(e);
        console.log(e.target);
    })
});

function colorPixelAction(eventObj) {
    if (eventObj.target.classList[0] == `pixel`) {
        eventObj.target.style.backgroundColor = brushColorBtn();
    }
    if (eventObj.target.classList[0] == `pixel` && document.querySelector(`#random-cb`).checked === true) {
        eventObj.target.style.backgroundColor = randomPixelColor();
    }
    if (eventObj.target.classList[0] == `pixel` && document.querySelector(`#darken-cb`).checked === true) {
        eventObj.target.style.backgroundColor = darkenPixelColor(eventObj.target.style.backgroundColor);
    }

}

//button functions
const clearGridBtn = () => {
    drawableGrid.forEach((pixel) => {
        pixel.style.backgroundColor = grid.backgroundColor;
    });
};

function brushColorBtn() {
    const colorPicker = document.querySelector(`#color-pk`);
    return colorPicker.value;
}

//checkbox actions
const randomPixelColor = () => {
    let randomNum = () => Math.floor(Math.random() * 255);
    return `rgb(${randomNum()} ${randomNum()} ${randomNum()} / 50%)`;
}
const darkenPixelColor = (rgbColor) => {

    // const getColorValueArray = (color) => {
    //     const canvas = document.createElement(`canvas`);
    //     const context = canvas.getContext(`2d`);
    //     context.fillStyle = color;
    //     context.fillRect(0,0,1,1);
    //     return context.getImageData(0,0,1,1).data;

    // }
    console.log(rgbColor);
    rgbArr = rgbColor.substring(5, rgbColor.length - 1).replace(/ /g, '').split(',');
    // rgbArr[3] = +rgbArr[3] * 0.1;
    let rgb = `rgb(${rgbArr[0]} ${rgbArr[1]} ${rgbArr[2]} ${+rgbArr[3] * 1.1})`
    console.log(`rgba(${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]}, ${+rgbArr[3] * 1.1})`);
    // ${rgbArr[1]} ${rgbArr[2]} ${+rgbArr[3] *0.1}
    // let rgb = `rgb (${getColorValueArray[0]} ${getColorValueArray[1]} ${getColorValueArray[2]} / ${ getColorValueArray[3] * .1}%)` 

    return rgb;
}


//testing
const buttonArray = document.querySelectorAll(`.btn`);
buttonArray.forEach((button) => {
    button.addEventListener(`click`, (e) => {
        console.log(e.target);
        console.log(e.target.name);
        console.log(e.target.value);
        console.log(e.target.checked);
        console.log(e.target.color);


        if (e.target.name == clearGridBtn.name) clearGridBtn();
        if (e.target.name == brushColorBtn.name) {
            console.log(`yep`);
            // const colorPicker = document.querySelector(`#color-pk`);
            // grid.brushColor = colorPicker.value;
            brushColorBtn();
        };



    });
});

