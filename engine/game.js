import Tile from "./tile.js";
 
export default class Game {


    constructor(size) {

        this.handlers = []; 

        this.size = size;
        this.score = 0;
        this.won = false;
        this.over = false;
        this.board = [];
        this.onLoseFunctions = [];
        this.onWinFunctions = [];
        this.onMoveFunctions = [];
        
        for(let i = 0; i < this.size; i++) {
            let temp = [];
            for(let j = 0; j < this.size; j++){
                temp[j] = 0; 
            }
            this.board[this.board.length] = temp;
        }
        //generate two new tiles
        this.newTile();
        this.newTile();
    }

    setupNewGame() {

        this.score = 0;
        this.won = false;
        this.over = false;
        this.board = [];
        
        for(let i = 0; i < this.size; i++) {
            let temp = [];
            for(let j = 0; j < this.size; j++){
                temp[j] = 0; 
            }
            this.board[this.board.length] = temp;
        }
        //generate two new tiles
        this.newTile();
        this.newTile();
    }

    loadGame(gameState) {
        let count = 0;
        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){

                if(gameState.board[count] == 0) {
                    this.board[i][j] = 0;
                } else {
                    this.board[i][j] = new Tile(gameState.board[count]);
                }
                count++;
            }
        }
        this.score = gameState.score;
        this.won = gameState.won;
        this.over = gameState.over;
    }

    move(direction){

        if(this.over){
            return;
        }

        //input: string {up,down,left,right}
        //test if a move is possible
        //used to test if any value reaches 2048
        
        let newValue;
        let changeMade = false;


        switch(direction) {
            case "up":
                for(let i = 0; i < this.size; i++){
                    for(let j = 0; j < this.size; j++){

                        if(this.board[j][i]!=0) {
                            let c = j;
                            while(c > 0) {
                                if(this.board[c-1][i] == 0) {
                                    this.board[c-1][i] = this.board[c][i];
                                    this.board[c][i].hasMoved = false;
                                    this.board[c][i] = 0;
                                    changeMade = true;

                                } else {
                                    if(this.board[c-1][i].value == this.board[c][i].value){
                                        if(!(this.board[c-1][i].hasMoved) && !(this.board[c][i].hasMoved)){
                                            newValue = this.board[c-1][i].increaseValue();
                                            this.score += newValue;
                                            this.board[c][i].hasMoved = false;
                                            this.board[c][i] = 0;
                                            changeMade = true;
                                            if(newValue == 2048){
                                                if(!this.won){
                                                    this.won = true;
                                                    let currentGameState = this.getGameState();
                                                    this.onWinFunctions.forEach(function(element){
                                                        element(currentGameState);
                                                    });
                                                }
                                            }
                                        }
                                }
                                }
                                c--;
                            }
                        }

                    }
                }    

                break;

            case "down":

                for(let i = this.size-1; i >= 0; i--){
                    for(let j = this.size-1; j >= 0; j--){
                        if(this.board[j][i]!=0) {
                            let c = j;
                            while(c < this.size-1) {
                                if(this.board[c+1][i] == 0) {
                                    this.board[c+1][i] = this.board[c][i];
                                    this.board[c][i].hasMoved = false;
                                    this.board[c][i] = 0;
                                    changeMade = true;
                                } else {
                                    if(this.board[c+1][i].value == this.board[c][i].value){
                                        if(!(this.board[c+1][i].hasMoved) && !(this.board[c][i].hasMoved)){
                                            newValue = this.board[c+1][i].increaseValue();
                                            this.score += newValue;
                                            //has moved equals false ???
                                            this.board[c][i] = 0;
                                            changeMade = true;
                                            if(newValue == 2048){
                                                if(!this.won){
                                                    this.won = true;
                                                    let currentGameState = this.getGameState();
                                                    this.onWinFunctions.forEach(function(element){
                                                        element(currentGameState);
                                                    });
                                                }
                                            }
                                        }
                                    }
                                }
                                c++;
                            }
                        }

                    }
                } 

                break;

            case "left":

                    for(let i = 0; i < this.size; i++){
                        for(let j = 0; j < this.size; j++){
    
                            if(this.board[i][j]!=0) {
                                let c = j;
                                while(c > 0) {
                                    if(this.board[i][c-1] == 0) {
                                        this.board[i][c-1] = this.board[i][c];
                                        this.board[i][c].hasMoved = false;
                                        this.board[i][c] = 0;
                                        changeMade = true;
                                    } else {
                                        if(this.board[i][c-1].value == this.board[i][c].value){
                                            if(!(this.board[i][c-1].hasMoved) && !(this.board[i][c].hasMoved)){
                                                newValue = this.board[i][c-1].increaseValue();
                                                this.score += newValue;
                                                this.board[i][c] = 0;
                                                changeMade = true;
                                                if(newValue == 2048){
                                                    if(!this.won){
                                                    this.won = true;
                                                    let currentGameState = this.getGameState();
                                                    this.onWinFunctions.forEach(function(element){
                                                        element(currentGameState);
                                                    });
                                                }
                                                }
                                            }
                                        }
                                    }
                                    c--;
                                }
                            }
    
                        }
                    }                 

                break;

            case "right":
                    for(let i = this.size-1; i >= 0; i--){
                    for(let j = this.size-1; j >= 0; j--){
                            if(this.board[i][j]!=0) {
                                let c = j;
                                while(c < this.size-1) {
                                    if(this.board[i][c+1] == 0) {
                                        this.board[i][c+1] = this.board[i][c];
                                        this.board[i][c].hasMoved = false;
                                        this.board[i][c] = 0;
                                        changeMade = true;
                                    } else {
                                        if(this.board[i][c+1].value == this.board[i][c].value){
                                            if(!(this.board[i][c+1].hasMoved) && !(this.board[i][c].hasMoved)){
                                                newValue = this.board[i][c+1].increaseValue();
                                                this.score += newValue;
                                                this.board[i][c] = 0;
                                                changeMade = true;
                                                if(newValue == 2048){
                                                    if(!this.won){
                                                    this.won = true;
                                                    let currentGameState = this.getGameState();
                                                    this.onWinFunctions.forEach(function(element){
                                                        element(currentGameState);
                                                    });
                                                }}
                                            }
                                    }
                                    }
                                    c++;
                                }
                            }
    
                        }
                    }


                break;
            default: 
                break;

        }

        this.clearMoves();
        //if not move was made, don't complete
        if(!changeMade){
            if(this.hasLost()){
                this.over = true;
                let currentGameState = this.getGameState();

                this.onLoseFunctions.forEach(function(element){
                    element(currentGameState);
                });
                
                
                return;
            }
        }



        if(!this.isFull() && changeMade){
            this.newTile();
        } 
        
        
        let hasLost = this.hasLost();

        if(hasLost){
            this.over = true;
                let currentGameState = this.getGameState();
                this.onLoseFunctions.forEach(function(element){
                    element(currentGameState);
                });
                return;
        }

        let currentGameState = this.getGameState();
        this.onMoveFunctions.forEach(function(element){
            element(currentGameState);
        });

    }

    hasLost(){
        if(!this.isFull()){
            return false;            
        }

        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){

                if(this.board[j][i]!=0) {
                    let c = j;
                    while(c > 0) {
                        if(this.board[c-1][i] == 0) {
                            this.board[c][i].hasMoved = false;

                        } else {
                            if(this.board[c-1][i].value == this.board[c][i].value){
                                if(!(this.board[c-1][i].hasMoved) && !(this.board[c][i].hasMoved)){
                                    this.board[c][i].hasMoved = false;
                                    return false;
                                }
                        }
                        }
                        c--;
                    }
                }
            }
        }
        
        for(let i = this.size-1; i >= 0; i--){
            for(let j = this.size-1; j >= 0; j--){
                if(this.board[j][i]!=0) {
                    let c = j;
                    while(c < this.size-1) {
                        if(this.board[c+1][i] == 0) {
                            this.board[c][i].hasMoved = false;
                        } else {
                            if(this.board[c+1][i].value == this.board[c][i].value){
                                if(!(this.board[c+1][i].hasMoved) && !(this.board[c][i].hasMoved)){
                                    return false;
                                }
                            }
                        }
                        c++;
                    }
                }
            }
        } 
        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){

                if(this.board[i][j]!=0) {
                    let c = j;
                    while(c > 0) {
                        if(this.board[i][c-1] == 0) {
                            this.board[i][c].hasMoved = false;
                        } else {
                            if(this.board[i][c-1].value == this.board[i][c].value){
                                if(!(this.board[i][c-1].hasMoved) && !(this.board[i][c].hasMoved)){
                                    return false;
                                }
                            }
                        }
                        c--;
                    }
                }

            }
        }
        for(let i = this.size-1; i >= 0; i--){
            for(let j = this.size-1; j >= 0; j--){
                    if(this.board[i][j]!=0) {
                        let c = j;
                        while(c < this.size-1) {
                            if(this.board[i][c+1] == 0) {
                                this.board[i][c].hasMoved = false;
                            } else {
                                if(this.board[i][c+1].value == this.board[i][c].value){
                                    if(!(this.board[i][c+1].hasMoved) && !(this.board[i][c].hasMoved)){
                                       return false;
                                    }
                            }
                            }
                            c++;
                        }
                    }
                }
            }

        return true;
    }

    toString(){
        let output = "";
        for(let i = 0; i < this.size; i ++){

            let temp = "";

            for(let j = 0; j < this.size; j++){
                if(this.board[i][j] == 0){
                    temp += "[ ] ";
                } else {
                    temp += "[" + this.board[i][j].value + "] ";
                }
            }
            output += temp + '\n';
        }
        return output;
    }
    
   onMove(callback) {
        this.onMoveFunctions[this.onMoveFunctions.length] = callback;

    }

    onWin(callback){
        this.onWinFunctions[this.onWinFunctions.length] = callback;
    }

    onLose(callback){
        this.onLoseFunctions[this.onLoseFunctions.length] = callback;
    }

    getGameState(){

        let temp = [];

        for(let i = 0; i < this.size; i++) {
            for(let j = 0; j < this.size; j++) {
                if(this.board[i][j] === 0){
                    temp[temp.length] = 0;
                } else {
                    temp[temp.length] = this.board[i][j].value;
                }
            }
        }
        return {'board': temp, 'score': this.score, 'won': this.won, 'over': this.over};
    }

    newTile(){
        if(this.over){ 
            return null;
        }
        let newTile = new Tile(0);
        let location = this.newLocation();
        this.board[Math.floor(location/this.size)][location%this.size] = newTile;
        return newTile;
    }

    newLocation(){

        //if there are no possible moves, don't do anything
        if(this.over){
            return;
        }

        //generate a possible location
        let location = Math.floor(Math.random()*this.size*this.size);
        let count = 0;
        while(count+location < this.size*this.size){
            if(this.isEmpty(location+count)){
                return location + count;
            } 
            count++
        }

        count = 0;
        while(count<location){
            if(this.isEmpty(count)) {
                return count;
            }
            count++;
        }
    }

    isEmpty(location){
        return (this.board[Math.floor(location/this.size)][location%this.size] == 0);
    }

    clearMoves(){
        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){
                if(this.board[i][j]!= 0){
                    this.board[i][j].hasMoved = false;
                }
            }
        }
    }


    isFull(){
        for(let i = 0; i < this.size; i++) {
            for(let j = 0; j < this.size; j++){
                if(this.board[i][j] == 0) {
                    return false;
                }
            }
        }
        return true;
    }


}