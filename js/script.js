console.log(`i'm here`);

//element references
const gridContainer = document.querySelector(`#grid`);

let grid = {
    height: 400,
    width: 400,
    gridSize: 16,
    backgroundColor: `white`,
    brushColor: `black`,
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
    })
});

function colorPixelAction(eventObj) {
    if (eventObj.target.classList[0] == `pixel`) {
        eventObj.target.style.backgroundColor = grid.brushColor;
    }
    if (eventObj.target.classList[0] == `pixel` && document.querySelector(`#random-cb`).checked === true) {
        eventObj.target.style.backgroundColor = randomPIxelColor();
    }
}

//button functions
const clearGridBtn = () => {
    drawableGrid.forEach((pixel)=>{
        pixel.style.backgroundColor = grid.backgroundColor;
    });
};

const randomPIxelColor = () => {
    let randomNum = () => Math.floor(Math.random()*255);
    return `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
}


//testing
const buttonArray = document.querySelectorAll(`.btn`);
buttonArray.forEach((button) => {
    button.addEventListener(`click`, (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        console.log(e.target.checked);


        if (e.target.name == clearGridBtn.name) clearGridBtn();
        if (e.target.checked === true) randomPIxelColor();


    });
});

