const grid = document.querySelector('#grid');
const DEFAULT_SIZE = 16;
const sizeSelector = document.querySelector('#size');
const root = document.querySelector(':root');
const item = document.querySelector('.item');
const clear = document.querySelector('#clear');
const colorPicker = document.querySelector('#color');
const rainbow = document.querySelector('#rainbow');
const pencil = document.querySelector('#pencil');
const eraser = document.querySelector('#eraser');

let activeTool = pencil;
let size = 16;
let color = '#000000';
let mouseState = false;

function createGrid(size) {
    root.style.setProperty('--size', size);

    for (let i = 0; i < (size * size); i++) {
        let child = document.createElement('div');
        child.setAttribute('class', 'item');
        grid.appendChild(child);
    }
}

function deleteGrid() {
    grid.innerHTML = '';
    grid.style['background-color'] = 'white';
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

document.addEventListener('mousedown', () => {
    mouseState = true;
    console.log(mouseState)
});

document.addEventListener('mouseup', () => {
    mouseState = false;
    console.log(mouseState)
});

grid.addEventListener('mousemove', (e) => {
        if (activeTool == 'rainbow') {
            color = getRandomColor();
            root.style.setProperty('--color', color);
        } else if (activeTool == 'pencil') {
            color = colorPicker.value;
            root.style.setProperty('--color', color);
        } else if (activeTool == 'eraser') {
            color = 'white';
            root.style.setProperty('--color', color);
        }
    if (mouseState == true) {
        e.target.style['background-color'] = color;
    }
})

colorPicker.addEventListener('input', () => {
    color = colorPicker.value;
    root.style.setProperty('--color', color);
});

sizeSelector.addEventListener('input', () => {
    size = sizeSelector.value;
    deleteGrid();
    createGrid(size);
});

clear.addEventListener('click', () => {
    deleteGrid();
    createGrid(size);
});

rainbow.addEventListener('click', () => {
    pencil.dataset.active = false;
    rainbow.dataset.active = true;
    eraser.dataset.active = false;
    activeTool = 'rainbow';
});

pencil.addEventListener('click', () => {
    rainbow.dataset.active = false;
    eraser.dataset.active = false;
    pencil.dataset.active = true;
    activeTool = 'pencil';
});

eraser.addEventListener('click', () => {
    rainbow.dataset.active = false;
    pencil.dataset.active = false;
    eraser.dataset.active = true;
    activeTool = 'eraser';
});

window.onload = () => {
    createGrid(DEFAULT_SIZE);
    root.style.setProperty('--color', color);
}
