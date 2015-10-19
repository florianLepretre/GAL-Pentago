function NotEmptyException(message){
    this.message = message;
    this.name    = "NotEmptyException";
}

var Engine = function(){
    var balls;
    var boardSize;
    var board;
    var player1, player2;
    var currentPlayer;

    var init = function(){
        balls         = 0;
        boardSize     = 6;
        player1       = 'white';
        player2       = 'black';
        currentPlayer = player1;

        board = new Array(boardSize);
        for (var i = 0; i < boardSize; i++){
            board[i] = new Array(boardSize);
        }
        initBoard();
    };

    var initBoard = function(){
        for (var i = 0; i < boardSize; i++){
            for (var j = 0; j < boardSize; j++){
                board[i][j] = 0;
            }
        }
    };

    this.addBall = function(){
        ++balls;
    };

    this.changeTurn = function(){
        currentPlayer = (currentPlayer === 'white') ? 'black' : 'white';
    };

    this.getBalls = function(){
        return balls;
    };

    this.getBoardSize = function(){
        return boardSize;
    };

    this.getCase = function(i, j){
        return board[i][j];
    };

    this.getCurrentPlayer = function(){
        return currentPlayer;
    };

    this.play = function(coordinates){
        var line   = coordinates.charCodeAt(1) - 49;
        var column = coordinates.charCodeAt(0) - 97;

        if (this.getCase(line, column) != 0) {
            throw new NotEmptyException("NotEmptyException");
        }

        this.setCase(line, column, this.getCurrentPlayer());
        this.addBall();
    };

    this.rotateClockWise = function(subBoard){
        var size2 = this.getBoardSize()/2;

        var tmp   = new Array(size2);
        for (var k = 0; k < size2; k++){
            tmp[k] = new Array(size2);
        }

        var i, j, iOffset, jOffset;

        switch (subBoard){
            case 'NW': iOffset = 0;     jOffset = 0;     break;
            case 'NE': iOffset = 0;     jOffset = size2; break;
            case 'SW': iOffset = size2; jOffset = 0;     break;
            case 'SE': iOffset = size2; jOffset = size2; break;

            default: iOffset = jOffset = 0; break;
        }

        for (i = 0; i < size2; i++){
            for (j = 0; j < size2; j++){
                tmp[i][j] = this.getCase((2-j)+iOffset, i+jOffset);
            }
        }

        for (i = 0; i < size2; i++){
            for (j = 0; j < size2; j++){
                this.setCase(i+iOffset, j+jOffset, tmp[i][j]);
            }
        }
    };

    this.rotateAntiClockWise = function(subBoard){
        var size2 = this.getBoardSize()/2;

        var tmp   = new Array(size2);
        for (var k = 0; k < size2; k++){
            tmp[k] = new Array(size2);
        }

        var i, j, iOffset, jOffset;

        switch (subBoard){
            case 'NW': iOffset = 0;     jOffset = 0;     break;
            case 'NE': iOffset = 0;     jOffset = size2; break;
            case 'SW': iOffset = size2; jOffset = 0;     break;
            case 'SE': iOffset = size2; jOffset = size2; break;

            default: iOffset = jOffset = 0; break;
        }

        for (i = 0; i < size2; i++){
            for (j = 0; j < size2; j++){
                tmp[i][j] = this.getCase(j+iOffset, (2-i)+jOffset);
            }
        }

        for (i = 0; i < size2; i++){
            for (j = 0; j < size2; j++){
                this.setCase(i+iOffset, j+jOffset, tmp[i][j]);
            }
        }
    };

    this.setCase = function(i, j, player){
        board[i][j] = player;
    };

    init();
};