
const gameContainer = document.getElementById("game-container")
const firstCell = document.getElementById("cell-1")
const secondCell = document.getElementById("cell-2")
const thirdCell = document.getElementById("cell-3")
const fourthCell = document.getElementById("cell-4")
const fifthCell = document.getElementById("cell-5")
const sixthCell = document.getElementById("cell-6")
const seventhCell = document.getElementById("cell-7")
const eighthCell = document.getElementById("cell-8")
const ninethCell = document.getElementById("cell-9")
const reset = document.getElementById("reset")
const start = document.getElementById("start-game")
const display = document.getElementById("display")
const inputFirstPlayer = document.getElementById("player-one-name")
const inputSecondPlayer = document.getElementById("player-two-name")

const cells = [firstCell, secondCell, thirdCell, fourthCell, fifthCell, sixthCell, seventhCell, eighthCell, ninethCell]
const cellMatrix = [[firstCell, secondCell, thirdCell], [fourthCell, fifthCell, sixthCell], [seventhCell, eighthCell, ninethCell]]

const handleClickFunctions = Array.from({ length: 3 }, () => Array(3).fill(null));

function addEventListenersToCells() {
    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            const handleClick = () => {
                let value;
                if (gameboard.round % 2 == 0) {
                    display.textContent = "It's " + playerOne.name + "'s turn, playing with " + playerOne.marker;
                    value = playerTwo.marker;
                    color = "lightblue";
                } else {
                    display.textContent = "It's " + playerTwo.name + "'s turn, playing with " + playerTwo.marker;
                    value = playerOne.marker;
                    color = "lightcoral";
                }
                gameboard.addMark(i, j, value);
                cellMatrix[i][j].style.color = color;
                cellMatrix[i][j].removeEventListener("click", handleClickFunctions[i][j]);
            };
            handleClickFunctions[i][j] = handleClick;
            cellMatrix[i][j].addEventListener("click", handleClick);
        }
    }
}

start.addEventListener("click", () => {
    if((inputFirstPlayer.value != '') && (inputSecondPlayer.value != '')){
        startGame()
    }else{
        display.textContent= "Both players should have a name"
    }
    
})

function removeEventListenersFromCells() {
    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            const handleClick = handleClickFunctions[i][j];
            if (handleClick) {
                cellMatrix[i][j].removeEventListener("click", handleClick);
                cellMatrix[i][j].style.backgroundColor = "white"
                handleClickFunctions[i][j] = null;
            }
        }
    }
}

function reloadCells(){
    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            gameboard.marks[i][j] = cellMatrix[i][j].textContent = '';
        }
    }
    gameboard.round = 1;
    gameboard.winnerFound = false;
    gameboard.winnerName = '';
    gameboard.winnerMarker = '';
    
    removeEventListenersFromCells();

    addEventListenersToCells();
}

reset.addEventListener("click", () => {
    reloadCells()
    display.textContent = "Reset done, X is starting"
})

function Player(name, marker){
    this.name = name;
    this.marker = marker;
}

function gameBoard() {
    this.marks = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
    this.flat = this.marks.flat();
    this.round = 1;
    this.addMark = function(row, col, mark){
        this.marks[row][col] = mark;
        cellMatrix[row][col].textContent = mark;
        this.checkWinner();
        this.round++;
    }
    this.winnerFound = false;
    this.winnerName = '';
    this.winnerMarker = '';
    this.showGameboard = function(){
        console.log(this.marks)
    }
    this.checkWinner = function() {
        //1st row
        if( this.marks[0][0] != 0 && this.marks[0][0] === this.marks[0][1] && this.marks[0][1] === this.marks[0][2]){
            this.winnerFound = true;
            this.winnerMarker = this.marks[0][0];
            if(playerOne.marker == this.winnerMarker){
                this.winnerName = playerOne.name;
            }
            else{
                this.winnerName = playerTwo.name;
            }
            gameOver(this.winnerName, this.winnerMarker);
        }else{
            //2nd row
            if( this.marks[1][0] != 0 && this.marks[1][0] === this.marks[1][1] && this.marks[1][1] === this.marks[1][2]){
                this.winnerFound = true;
                this.winnerMarker = this.marks[1][0];
                if(playerOne.marker == this.winnerMarker){
                    this.winnerName = playerOne.name;
                }
                else{
                    this.winnerName = playerTwo.name;
                }
                gameOver(this.winnerName, this.winnerMarker);
            }else{
                //3rd row
                if( this.marks[2][0] != 0 && this.marks[2][0] === this.marks[2][1] && this.marks[2][1] === this.marks[2][2]){
                    this.winnerFound = true;
                    this.winnerMarker = this.marks[2][0];
                    if(playerOne.marker == this.winnerMarker){
                        this.winnerName = playerOne.name;
                    }
                    else{
                        this.winnerName = playerTwo.name;
                    }
                    gameOver(this.winnerName, this.winnerMarker);
                }else{
                    //1st column
                    if( this.marks[0][0] != 0 && this.marks[0][0] === this.marks[1][0] && this.marks[1][0] === this.marks[2][0]){
                        this.winnerFound = true;
                        this.winnerMarker = this.marks[0][0];
                        if(playerOne.marker == this.winnerMarker){
                            this.winnerName = playerOne.name;
                        }
                        else{
                            this.winnerName = playerTwo.name;
                        }
                        gameOver(this.winnerName, this.winnerMarker);
                    }else{
                        //2nd column
                        if( this.marks[0][1] != 0 && this.marks[0][1] === this.marks[1][1] && this.marks[1][1] === this.marks[2][1]){
                            this.winnerFound = true;
                            this.winnerMarker = this.marks[0][1];
                            if(playerOne.marker == this.winnerMarker){
                                this.winnerName = playerOne.name;
                            }
                            else{
                                this.winnerName = playerTwo.name;
                            }
                            gameOver(this.winnerName, this.winnerMarker);
                        }else{
                            //3rd column
                            if( this.marks[0][2] != 0 && this.marks[0][2] === this.marks[1][2] && this.marks[1][2] === this.marks[2][2]){
                                this.winnerFound = true;
                                this.winnerMarker = this.marks[0][2];
                                if(playerOne.marker == this.winnerMarker){
                                    this.winnerName = playerOne.name;
                                }
                                else{
                                    this.winnerName = playerTwo.name;
                                }
                                gameOver(this.winnerName, this.winnerMarker);
                            }else{
                                //primary diagonal
                                if( this.marks[0][0] != 0 && this.marks[0][0] === this.marks[1][1] && this.marks[1][1] === this.marks[2][2]){
                                    this.winnerFound = true;
                                    this.winnerMarker = this.marks[0][0];
                                    if(playerOne.marker == this.winnerMarker){
                                        this.winnerName = playerOne.name;
                                    }
                                    else{
                                        this.winnerName = playerTwo.name;
                                    }
                                    gameOver(this.winnerName, this.winnerMarker);
                                }else{
                                    //secodary diagonal
                                    if( this.marks[0][2] != 0 && this.marks[0][2] === this.marks[1][1] && this.marks[1][1] === this.marks[2][0]){
                                        this.winnerFound = true;
                                        this.winnerMarker = this.marks[0][2];
                                        if(playerOne.marker == this.winnerMarker){
                                            this.winnerName = playerOne.name;
                                        }
                                        else{
                                            this.winnerName = playerTwo.name;
                                        }
                                        gameOver(this.winnerName, this.winnerMarker);
                                    }else{
                                        if(gameboard.round == 9){
                                            display.textContent = "It's a draw!"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function createPlayers() {
    playerOne = new Player(inputFirstPlayer.value, "X")
    playerTwo = new Player(inputSecondPlayer.value, "O")
}

function playRound() { 
    if(gameboard.round % 2 == 0){
        display.textContent = "It's " + playerTwo.name + "'s turn"
    }else{
        display.textContent = "It's " + playerOne.name + "'s turn"
    }
}

function startGame() {
    createPlayers()
    gameboard = new gameBoard();
    reloadCells()
    display.textContent = "The game started. " + "It's " + playerOne.name + "'s turn, playing with " + playerOne.marker;
}

function gameOver(name, marker) {
    display.textContent = "The game is over. " + name + " won, playing with " + marker;
    removeEventListenersFromCells();
}
