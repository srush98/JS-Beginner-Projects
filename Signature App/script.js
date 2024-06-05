
const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const fontPicker = document.getElementById("fontPicker");
const canvas = document.getElementById('myCanvas');

const undoButton = document.getElementById('undoButton');
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const retrieveButton = document.getElementById("retrieveButton");
const ctx = canvas.getContext('2d');
let canvasStates = [];

function saveCanvasState() {
    const dataUrl = canvas.toDataURL();
    canvasStates.push(dataUrl);
}

colorPicker.addEventListener("change", (event) => {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
});

canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
});

canvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        lastX = event.offsetX;
        lastY = event.offsetY;
        saveCanvasState();
    }
});

canvas.addEventListener('mouseup', (event) => {
    isDrawing = false;
});

canvasColor.addEventListener('change', (event) => {
    ctx.fillStyle = event.target.value;
    ctx.fillRect(0, 0, 800, 500);
});

fontPicker.addEventListener('change', (event) => {
    ctx.lineWidth = event.target.value;
});

// Undo Functionality
undoButton.addEventListener('click', () => {
    if (canvasStates.length > 1) {
        // Remove the last state
        canvasStates.pop();
        // Redraw the canvas from the new last state
        const lastState = canvasStates[canvasStates.length - 1];
        const img = new Image();
        img.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = lastState;
    } else {
        alert('No more previous states to undo.');
    }
});

// Clear Functionality
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Save Functionality
saveButton.addEventListener('click', () => {
    localStorage.setItem('canvasContents', canvas.toDataURL());
    let link = document.createElement('a');
    link.download = 'my-canvas.png';
    link.href = canvas.toDataURL();
    link.click();
});

// Retrieve Functionality
retrieveButton.addEventListener('click', () => {
    if (localStorage.getItem('canvasContents')) {
        let img = new Image();
        img.src = localStorage.getItem('canvasContents');
        ctx.drawImage(img, 0, 0, 800, 500);
    } else {
        alert('No saved signature');
    }
});
