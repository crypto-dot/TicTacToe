function startGame() {
    buttonOptions.disableButton(this);
    buttonOptions.enableButton(document.querySelector("#reset"));
    if(document.getElementById('2player').classList[0] == "buttonClicked"){
        let playerTurn = 0;
        let player1 = playerFactory(playerTurn);
        let player2 = playerFactory(playerTurn + 1);
        let players = [player1,player2];
        let gameboard = GameBoard(players);

        gameboard.buildGameBoard();
    }
    else {
        let playerTurn = Math.floor(Math.random() * 2);
        if(playerTurn == 0){
            let botTurn = 1;
        }
        else {
            let botTurn = 0;
        }
        computerGame = computerGameBoard(playerTurn);
        computerGame.buildGameBoard();

    }
}
const buttonOptions = ( () => {
    let buttons = document.querySelectorAll("button");
    let ticTacToeGrid = document.querySelector(".TicTacToeGrid");
    let playerTurnBoard = document.querySelector(".Player");
    for(let i =0; i < 4; i++){
        switch(buttons[i].textContent){
            case "1 PLAYER (testing)": 
                buttons[i].classList.add('buttonClickable');
                buttons[i].addEventListener('click',computer);
                break;
            case "2 PLAYERS":
                buttons[i].classList.add("buttonClicked");
                buttons[i].addEventListener('click',player2);
                break;
            case "RESET":
                buttons[i].addEventListener("click",clear);
                buttons[i].classList.add("buttonClicked");
                break;
            case "START":
                buttons[i].addEventListener("click",startGame);
                buttons[i].classList.add("buttonClickable");
                break;
            default:
                buttons[i].classList.add("buttonClickable");
        }
    }
    function disableButton(button) {
        let buttoncpy = button.cloneNode(true);
        buttoncpy.classList.add("buttonClicked");
        buttoncpy.classList.remove("buttonClickable");
        button.parentNode.replaceChild(buttoncpy,button);
    }
  function clear() {
        ticTacToeGrid.replaceChildren();
        ticTacToeGrid.style.display = "none";
        if(this.textContent == "RESET"){
            buttonOptions.enableButton(document.querySelector("#start"));
            buttonOptions.disableButton(document.querySelector("#reset"))
            playerTurnBoard.textContent = "";
        }
    }
    function enableButton(button) {
        button.classList.add("buttonClickable");
        button.classList.remove("buttonClicked");
        switch(button.id){
            case "bot":
                button.addEventListener("click",computer);
                break;
            case "start":
                button.addEventListener("click",startGame);
                break;
            case "reset":
                button.addEventListener("click",clear);
                break;
            case "2player":
                button.addEventListener("click",player2);
                break;
            default:
                console.log("no event listener handled");
        }
    }
    return {
        disableButton,
        enableButton
    };

})();

function GameBoard(players)
{
    let playerTurn = 0;
    let ticTacToeGrid = document.querySelector(".TicTacToeGrid");
    let ticTacToeGridArray;
    let playerTurnBoard = document.querySelector(".Player");
    ticTacToeGrid.style.display = "grid";

    playerTurnBoard.textContent = `${players[playerTurn % 2].getName()}'s turn`;
    
    function playerSymbol() {
        let playerSymbols = ["X", "O"];
        return playerSymbols[playerTurn++ % 2];
    }
    function checkBoardWinCondition() {
        let firstRowWin = ticTacToeGridArray[0][0].textContent  === ticTacToeGridArray[0][1].textContent && ticTacToeGridArray[0][1].textContent === ticTacToeGridArray[0][2].textContent && ticTacToeGridArray[0][0].textContent != "";
        let secondRowWin =  ticTacToeGridArray[1][0].textContent === ticTacToeGridArray[1][1].textContent && ticTacToeGridArray[1][1].textContent === ticTacToeGridArray[1][2].textContent && ticTacToeGridArray[1][0].textContent != "";
        let thirdRowWin =  ticTacToeGridArray[2][0].textContent === ticTacToeGridArray[2][1].textContent && ticTacToeGridArray[2][1].textContent === ticTacToeGridArray[2][2].textContent && ticTacToeGridArray[2][0].textContent != "";
        let firstColumnWin = ticTacToeGridArray[0][0].textContent === ticTacToeGridArray[1][0].textContent && ticTacToeGridArray[1][0].textContent  === ticTacToeGridArray[2][0].textContent && ticTacToeGridArray[0][0].textContent != "";
        let secondColumnWin =  ticTacToeGridArray[0][1].textContent ===  ticTacToeGridArray[1][1].textContent && ticTacToeGridArray[1][1].textContent ===  ticTacToeGridArray[2][1].textContent &&  ticTacToeGridArray[0][1].textContent != "";
        let thirdColumnWin = ticTacToeGridArray[0][2].textContent === ticTacToeGridArray[1][2].textContent && ticTacToeGridArray[1][2].textContent === ticTacToeGridArray[2][2].textContent && ticTacToeGridArray[0][2].textContent != "";
        let topLeftToBottomRightDiagonal = ticTacToeGridArray[0][0].textContent === ticTacToeGridArray[1][1].textContent && ticTacToeGridArray[1][1].textContent === ticTacToeGridArray[2][2].textContent;
        let topRightToBottomLeftDiagonal = ticTacToeGridArray[0][2].textContent ===  ticTacToeGridArray[1][1].textContent && ticTacToeGridArray[1][1].textContent === ticTacToeGridArray[2][0].textContent;

        return(firstRowWin || secondRowWin || thirdRowWin || firstColumnWin || secondColumnWin || thirdColumnWin || topLeftToBottomRightDiagonal || topRightToBottomLeftDiagonal)

    }
    let gridSpotFilled = function() {
        this.removeEventListener("click",gridSpotFilled);
        this.textContent = playerSymbol();
        if(playerTurn === 9){
            playerTurnBoard.textContent = "DRAW";
            ticTacToeGridArray.forEach( (arr) => {
                arr.forEach(Element => {
                    Element.removeEventListener("click",gridSpotFilled);
                    Element.classList.remove("gridBoxClickable");
                });
            });
            return;
        }
        if(playerTurn >= 5) {
            if(checkBoardWinCondition()){
                playerTurnBoard.textContent = `${players[(playerTurn-1) % 2].getName()} WON!`;
                ticTacToeGridArray.forEach( (arr) => {
                    arr.forEach(Element => {
                        Element.removeEventListener("click",gridSpotFilled);
                        Element.classList.remove("gridBoxClickable");
                    });
                });
                return;
            }
        }
        playerTurnBoard.textContent = `${players[playerTurn % 2].getName()}'s turn`;
        this.classList.remove("gridBoxClickable");
    }

   const buildGameBoard = function() {
        for(i = 0; i < 9; i++){
            let gridBox = document.createElement("div");
            gridBox.addEventListener("click", gridSpotFilled);
            gridBox.classList.add("gridBox");
            gridBox.classList.add("gridBoxClickable");
            gridBox.setAttribute("data-row", Math.floor(i/3));
            ticTacToeGrid.append(gridBox);
        }
          ticTacToeGridArray = [
               Array.from(document.querySelectorAll(".gridBox[data-row='0']")),
                Array.from(document.querySelectorAll(".gridBox[data-row='1']")),
                Array.from(document.querySelectorAll(".gridBox[data-row='2']"))
         ]
        }
    return {buildGameBoard};
};
function computerGameBoard(playerTurn) 
{
    let ticTacToeGrid = document.querySelector(".TicTacToeGrid");
    let ticTacToeGridArray;
    let isPlayerTurn;
    if(playerTurn == 0){
        isPlayerTurn = true;
    }
    else {
        isPlayerTurn = false;
    }

    function getPlayerSymbol() {
        let playerSymbol = ["X","0"];
        return playerSymbol[playerTurn++ %2];
    }

    let gridSpotFilled = function() {
        this.removeEventListener("click",gridSpotFilled);
        this.textContent = getPlayerSymbol();
        
        if(playerTurn == 8){
            playerTurnBoard.textContent = "DRAW";
            ticTacToeGridArray.forEach( (arr) => {
                arr.forEach(Element => {
                    Element.removeEventListener("click",gridSpotFilled);
                    Element.classList.remove("gridBoxClickable");
                });
            });
            return;
        }
    }

    const buildGameBoard = function() {
        ticTacToeGrid.style.display = "grid";
        for(i = 0; i < 9; i++){
            let gridBox = document.createElement("div");
            if(isPlayerTurn){
                gridBox.addEventListener("click", gridSpotFilled);
                gridBox.classList.add("gridBoxClickable");
            }
            gridBox.classList.add("gridBox");
            gridBox.setAttribute("data-row", Math.floor(i/3));
            ticTacToeGrid.append(gridBox);
        }
          ticTacToeGridArray = [
               Array.from(document.querySelectorAll(".gridBox[data-row='0']")),
                Array.from(document.querySelectorAll(".gridBox[data-row='1']")),
                Array.from(document.querySelectorAll(".gridBox[data-row='2']"))
         ]
            }

    const computerPlay= function() {
        
    }

    return {buildGameBoard};

}
function computer(e) {
    buttonOptions.disableButton(this);
    buttonOptions.enableButton(document.getElementById('2player'));

}
function player2(e) {
    buttonOptions.disableButton(this);
    buttonOptions.enableButton(document.getElementById("bot"));

}   
function playerFactory(playerTurn) {
    let name = null;
    while(name == null){
        name = prompt(`Player ${playerTurn + 1} Name: `);
    }
    function getName() {
        return `${name}`;
    }
    return {getName};
}