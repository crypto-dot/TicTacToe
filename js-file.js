function startGame() {
    let gameboard = GameBoard();
    buttonOptions.disableButton(this);
    buttonOptions.enableButton(document.querySelector("#reset"));
    gameboard.buildGameBoard();
    const player1 = playerFactory(0);
    
}
function generatePlayers() {

}

function GameBoard(){
    let ticTacToeGrid = document.querySelector(".TicTacToeGrid");
    function gridSpotFilled() {
        this.removeEventListener("click",gridSpotFilled);
        this.classList.remove("gridBoxClickable");
    }

    function clear(){
        ticTacToeGrid.replaceChildren();
        if(this.textContent == "RESET"){
            buttonOptions.enableButton(document.querySelector("#start"));
            buttonOptions.disableButton(document.querySelector("#reset"))
        }
        
    }
   const buildGameBoard = function() {
        for(i = 0; i < 9; i++){
            let gridBox = document.createElement("div");
            gridBox.addEventListener("click",gridSpotFilled);
            gridBox.classList.add("gridBox");
            gridBox.classList.add("gridBoxClickable");
            ticTacToeGrid.append(gridBox);
        }
    }
    return { buildGameBoard ,clear};
};
const buttonOptions = ( () => {
    let buttons = document.querySelectorAll("button");
    for(let i =0; i < 4; i++){
        switch(buttons[i].textContent){
            case "2 PLAYERS":
                buttons[i].classList.add("buttonClicked");
                break;
            case "RESET":
                buttons[i].addEventListener("click",GameBoard().clear);
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
    function enableButton(button) {
        button.classList.add("buttonClickable");
        button.classList.remove("buttonClicked");
        switch(button.id){
            case "start":
                button.addEventListener("click",startGame);
                break;
            case "reset":
                button.addEventListener("click",GameBoard().clear);
                break;
            default:
                console.log("no event listener handled");
        }
    }
    return {
        disableButton, enableButton
    };

} )();

function playerFactory(playerTurn) {
    let name = null;
    while(name == null){
        name = prompt(`Player ${playerTurn + 1} Name: `);
    }
    return(name,playerTurn);

}