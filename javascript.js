const defaultSideCells = 16;

let rgbValueArray = new Array();
let wrapper = document.getElementById("wrapper");
let sideCells = 16;
let randomizeColor = false;
let darkenColors = false;

let resolutionBtn = document.getElementById("resolutionBtn");
resolutionBtn.addEventListener("click", () => {
    let temp = userPrompt();
    if (temp !== null) {
        deleteGrid(sideCells);
        sideCells = temp;
        createGrid(sideCells);
        addListeners(sideCells);
        if (darkenColors === true) {
            createRGBArray();
        }
    }
});

let resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", () => {
    deleteGrid(sideCells);
    resetSize();
    createGrid(sideCells);
    addListeners(sideCells);
    rgbValueArray = new Array();
    if (darkenColors === true) {
        createRGBArray();
    }
});

let randomizeBtn = document.getElementById("randomColors");
randomizeBtn.addEventListener("click", () => {
    if (randomizeColor === false) {
        randomizeColor = true;
        randomizeBtn.style.backgroundColor = "rgb(190,238,175)";
        if (darkenColors === true) {
            darkenColors = false;
            darkenBtn.style.backgroundColor = "";
        }
    }
    else if (randomizeColor === true) {
        randomizeColor = false;
        randomizeBtn.style.backgroundColor = "";

    }
});

let darkenBtn = document.getElementById("darken");
darkenBtn.addEventListener("click", () => {
    if (darkenColors === false) {
        darkenColors = true;
        if (randomizeColor === true) {
            randomizeColor = false;
            randomizeBtn.style.backgroundColor = "";
        }
        randomizeColor = false;
        createRGBArray();
        darkenBtn.style.backgroundColor = "rgb(190,238,175)";
    }
    else if (darkenColors === true) {
        darkenColors = false;
        rgbValueArray = new Array();
        darkenBtn.style.backgroundColor = "";
    }
});

function createGrid(numCells) {
    wrapper.style.gridTemplateColumns = `repeat(${numCells}, 1fr)`;
    wrapper.style.gridTemplateRows = `repeat(${numCells}, 1fr)`;
    for (let i = 1; i <= Math.pow(numCells, 2); ++i) {
        let newDiv = document.createElement("div");
        newDiv.classList.add("box");
        newDiv.setAttribute('id', `box${i}`);
        newDiv.style.backgroundColor = "rgb(255, 255, 255)";
        wrapper.appendChild(newDiv);
    }
}

function addListeners(numCells) {
    for (let i = 1; i <= Math.pow(numCells, 2); ++i) {
        let divBox = document.getElementById(`box${i}`);
        divBox.addEventListener("mouseenter", () => {
            changeColor(divBox);
        });
    }
}

function createRGBArray () {
    for (let i = 1; i <= Math.pow(sideCells, 2); ++i) {
        let divBox = document.getElementById(`box${i}`);
        let divBoxRGB = divBox.style.backgroundColor;
        rgbValueArray[i] = divBoxRGB;
    }
}

function changeColor(cellDiv) {

    if (darkenColors === true ) {
        //Gets id to target div in rgbValueArray
        let divId = cellDiv.id;
        let idPattern = /box(\d+)/;
        let idNum = divId.match(idPattern);
        idNum = parseInt(idNum[1]);

        //Gets original rgb values from rgbValueArray, calculates 10%
        let elementRGB = rgbValueArray[idNum];
        let rgbSearch = /\w+\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/
        let matchValues = elementRGB.match(rgbSearch);
        let redSubtract = Math.ceil(parseInt(matchValues[1]) * 0.1);
        let greenSubtract = Math.ceil(parseInt(matchValues[2]) * 0.1);
        let blueSubtract = Math.ceil(parseInt(matchValues[3]) * 0.1);

        //Gets current rgb values from box
        let currRGB = cellDiv.style.backgroundColor;
        let rgbCurrSearch = /\w+\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/
        let matchCurrValues = currRGB.match(rgbCurrSearch);
        let currRed = parseInt(matchCurrValues[1]);
        let currGreen = parseInt(matchCurrValues[2]);
        let currBlue = parseInt(matchCurrValues[3]);

        //Calculate new rgb values
        let newRed = currRed - redSubtract;
        let newGreen = currGreen - greenSubtract;
        let newBlue = currBlue - blueSubtract;

        //Sets new backgorund color
        cellDiv.style.backgroundColor = `rgb(${newRed}, ${newGreen}, ${newBlue})`;
    }
    else if (randomizeColor === true) {
        let rgbValue = generateRandomColor();
        cellDiv.style.backgroundColor = `rgb(${rgbValue.redValue},${rgbValue.greenValue},${rgbValue.blueValue})`; 
        return;
    }
    else if (randomizeColor === false) {
        cellDiv.style.backgroundColor = "rgb(0,0,0)";
        return;
    }
}

function generateRandomColor() {
    let rgbValue = {
        redValue: Math.floor(Math.random() * (255 - 0 + 1)) + 0,
        greenValue: Math.floor(Math.random() * (255 - 0 + 1)) + 0,
        blueValue: Math.floor(Math.random() * (255 - 0 + 1)) + 0
    }
    return rgbValue;
}

function deleteGrid(numCells) {
    for (let i = 1; i <= Math.pow(numCells, 2); ++i) {
        let divBox = document.getElementById(`box${i}`);
        divBox.remove();
    }
}

function userPrompt() {
    let validInput = false;
    let sideSquares;
    while (validInput === false) {
        sideSquares = prompt("Grid side length (must be between 1 and 100): ");
        if (sideSquares === null) {
            return sideSquares;
        }
        else {
            sideSquares = Math.floor(parseFloat(sideSquares));
        }
        validInput = validateInput(sideSquares);
    }
    return sideSquares;
}

function validateInput(userInput) {
    if ((typeof userInput === 'number') && ((userInput > 0) && (userInput < 101))) {
        return true;
    }
    else {
        return false;
    }
}

function resetSize() {
    sideCells = defaultSideCells;
}

createGrid(sideCells);
addListeners(sideCells);