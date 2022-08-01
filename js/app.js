// Selezione elemento con classe table
let table = document.querySelector('.table');
// Selezione submit input

// Selezionp bottone submit 
const submitElement = document.querySelectorAll('input[type="submit"]');
// Seleziono elemento banner
const banner = document.querySelector('.banner');
// Seleziono elemento result
const textGameOver = document.querySelector('.result');
// Selezione elemento points
const textPoints = document.querySelector('.points');

// Creo array per inserire posizione bombe
let bombPosition = [];
// Creo variabile per salvare punteggio
let points = 0;
// Creo variabile per salvare numero celle
let numeroCelle;

// Utilizzo addEventListener su submit
submitElement.forEach(submit => {
    submit.addEventListener('click', function(){ 
    // Aggiungo a banner classe hide ad ogni click
    banner.classList.add('hide');
    // Resetto punteggio
    points = 0;
    // Resetto griglia
    resetGame();
    // Selezione select
    let gridDimension = document.querySelector('select');
    // Prendo il valore di select e lo salvo in gridDimension
    gridDimension = gridDimension.value;
    // Creo variabile per calcolare il quadrato del valore di gridDimension
    numeroCelle = gridSize(gridDimension) ** 2;
    // Creo variabile con array bombe casuale
    bombPosition = bombGenerator(numeroCelle)
    // utilizzo funzione for per creare griglia e celle 
    createGrid(numeroCelle)
    // utilizzo funzione per numero colonne
    gridCol(gridSize(gridDimension))
})});

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
    square.addEventListener('click', onClick);
    return square;
}
function onClick(){
    // Aggiungo classe clicked a This(square)
    this.classList.add('clicked')
    // Creo costante per impostare numero cella tramite dataset
    const numeroCella = parseInt(this.dataset.numero);
    // SE numero cella non è all'interno di bombPosition
    if(!bombPosition.includes(numeroCella)) {
        // Aggiungo classe safe a This(square)
        this.classList.add('safe');
        // incremento points
        points = points + 1;
    // ALTRIMENTI
    } else {
        // Aggiungo classe bomb a This(square)
        this.classList.add('bomb');
        // Inserisco esito partita in textGameOver
        textGameOver.innerHTML = 'Hai Perso!';
        // Inserisco punteggio totalizzato in textPoints
        textPoints.innerHTML = 'Il Tuo punteggio è di ' + points;
    }
        // Aggiungo funzione per inserire banner a fine partita
        gameOver();
}
// Creo funzione per modificare colonne (Da migliorare)
function gridCol(col) {
    // Salvo valore inserito nella funzione
    let column = col;
    // Rimuovo classi per impostare colonne
    table.classList.remove('table10','table9','table7' );

    // SE column è uguale a 10
    if(column === 10) {
        // Aggiungo a table classe table10
        table.classList.add('table10');
    // ALTRIMENTI SE column è uguale a 9
    } else if(column === 9) {
        // Aggiungo a table classe table9
        table.classList.add('table9');
    // ALTRIMENTI SE column è uguale a 7
    } else if(column === 7) {
        // Aggiungo a table classe table7
        table.classList.add('table7');
    }
}
// Creo funzione per impostare grandezza griglia
function gridSize(size){   
    // Salvo valore inserito nella funzione
    let gridSize = size;
    // SE gridSize === 'easy'
    if( gridSize === "easy"){
        // Grid size = 10
        gridSize = 10;
    // SE gridSize === 'normal'
    } else if (gridSize === "normal"){
        // Grid size = 9
        gridSize = 9
    // SE gridSize === 'hard'
    } else if (gridSize === "hard") {
        // Grid size = 7
        gridSize = 7
    }
    // Ritorno gridSize
    return gridSize;
}
// Creo funzione per reset gioco
function resetGame(){
    // Cancello contenuto table
    table.innerHTML = "";
}
// Creo funzione per generare le bombe
function bombGenerator(max){
    // Creo array
    let bomb = [];
    // Creo ciclo while per creare le bombe
    while(bomb.length < 16) {
        // Creo costante a cui associo numero random 
        const n = getRandomInt(1, max);
        // SE bomb non inclice n 
        if(!bomb.includes(n)){
            // Pusho n in bomb
            bomb.push(n);
        }
    }
    // Ritorno bomb
    return bomb;
}
// Creo funzione per generare numeri random
function getRandomInt(min, max ) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}
 // Creo funzione per banner in caso di vittora
function gameOver(){
    // SE points === numeroCelle -16
    if(points === numeroCelle - 16) {
        // Rimuovo hide da banner
        banner.classList.remove('hide');
        // Inserisco esito partita in textGameOver
        textGameOver.innerHTML = 'Hai Vinto!';
        // Inserisco punteggio totalizzato in textPoints
        textPoints.innerHTML = 'Il Tuo punteggio è di ' + points;
    }
}

