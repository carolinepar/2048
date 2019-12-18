import Game from "./engine/game.js";

export const loadBoard = function(){
    
    const game = new Game(4);

    let scoreBoard = document.getElementById("score");
    $("#score").append(`<p class="text">Score: ${game.getGameState().score}</p>`);

    let tilePieces = document.getElementsByClassName("tile");
    
    for(let i = 0; i < tilePieces.length; i++){
       tilePieces[i].append(`${game.getGameState().board[i]}`);
    }

    document.addEventListener("keydown", function(e){
       
        let update = false;
        switch(e.which) {
            case 37:
                update = true;
                game.move("left");
            break;
            case 38:
                update = true;
                game.move("up");
            break;
            case 39:
                update = true;
                game.move("right");
            break;
            case 40:
                update = true;
                game.move("down");
            break;

        }
        if(update){
            let score = $("#score");
            score.replaceWith(`<div id="score"><p class="text">Score: ${game.getGameState().score}</p></div>`);
        }
       
        let tilePieces = document.getElementsByClassName("tile");
    
        for(let i = 0; i < tilePieces.length; i++){
            tilePieces[i].innerHTML = `${game.getGameState().board[i]}`;
        }

        if(game.getGameState().over){
                
                let over = document.getElementById("alert");
                over.innerHTML = "Game over.";
                over.parentElement.style = "background-color: red; width: 500px; color: white; margin: auto;";
        }
        if(game.getGameState().won){

                let over = document.getElementById("alert");
                over.innerHTML = "You win!";
                over.parentElement.style = "background-color: green; width: 500px; color: white; margin: auto;";
 
        }


    });

    document.getElementById("reset").addEventListener("click",function(){

        game.setupNewGame();

        let score = $("#score");
        score.replaceWith(`<div id="score"><p class="text">Score: ${game.getGameState().score}</p></div>`);
       
        let tilePieces = document.getElementsByClassName("tile");
    
        for(let i = 0; i < tilePieces.length; i++){
            tilePieces[i].innerHTML = `${game.getGameState().board[i]}`;
        }

        let over = document.getElementById("alert");
                over.innerHTML = "&nbsp";
                over.parentElement.style = "background-color: none; width: 500px; color: white; margin: auto;";


    });
};




$(function() {
    
    loadBoard();

});