// Selezione elemento con classe table
let table = document.querySelector('.table');
// Selezione submit input

const submitElement = document.querySelector('input[type="submit"]')
const banner = document.querySelector('.banner')

let bombPosition = [];
let points = 0
console.log(points)
console.log(bombPosition)

// Utilizzo addEventListener su submit
submitElement.addEventListener('click', function(){ 
    point = 0;
    resetGame();

    // Selezione select
    let gridDimension = document.querySelector('select');
    // Prendo il valore di select e lo salvo in gridDimension
    gridDimension = gridDimension.value;
    // Creo variabile per calcolare il quadrato del valore di gridDimension
    let numeroCelle = gridSize(gridDimension) ** 2;
    // Creo variabile con array bombe casuale
    bombPosition = bombGenerator(numeroCelle)
    // utilizzo funzione for per creare griglia e celle 
    createGrid(numeroCelle)
    // utilizzo funzione per numero colonne
    gridCol(gridSize(gridDimension))
    console.log(gridDimension)
    console.log(bombPosition)
});

// Creo funzione per creare griglia
function createGrid(cellNum){
    let grid = cellNum
    let cella
    for (let i = 0; i < grid; i++) {
        // Creo elemento div con classe square tramite una funzione
        cella = getSquare();
        // Inserisco il numero della cella 
        cella.innerHTML = i + 1; 
        cella.dataset.numero = i + 1;
        // Appendo elemento al tabellone
        table.append(cella);
    }
}

// Creo funzione per creare celle
function getSquare() {
    // Creo costante square per creare un div
    const square = document.createElement('div');
    // Aggiungo classe square a div
    square.classList.add('square');
    // Utilizzo addEventListener su square
    square.addEventListener('click', function(){

        square.classList.add('clicked');

        const numeroCella = parseInt(this.dataset.numero);

        if(!bombPosition.includes(numeroCella)) {
            square.classList.add('safe');
            points = points + 1;
        } else {
            square.classList.add('bomb');
        }
        console.log(numeroCella)
        console.log(points)
    })
    return square
}

// Creo funzione per modificare colonne (Da migliorare)
function gridCol(col) {

    let column = col;

    table.classList.remove('table9');
    table.classList.remove('table7');
    table.classList.remove('table10');

    if(column === 10) {
        table.classList.add('table10');
    } else if(column === 9) {
        table.classList.add('table9');
    } else if(column === 7) {
        table.classList.add('table7');
    }
}

// Creo funzione per impostare grandezza griglia
function gridSize(size){   
    let gridSize = size;

    if( gridSize === "easy"){
        gridSize = 10;
    } else if (gridSize === "normal"){
        gridSize = 9
    } else if (gridSize === "hard") {
        gridSize = 7
    }
    // switch(valore) {
    //     case 'easy':
    //         gridSize = 10;
    //     break;
    //     case 'normal':
    //         gridSize = 9;
    //     break;
    //     case 'hard':
    //         gridSize = 7; 
    //     break;    
    return gridSize;
}

// Creo funzione per reset gioco
function resetGame(){
    table.innerHTML = "";
}

function bombGenerator(max){
    let bomb = [];

    while(bomb.length < 16) {
        const n = getRandomInt(1, max);

        if(!bomb.includes(n)){
            bomb.push(n);
        }
    }

    return bomb;
}

function getRandomInt(min, max ) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}
