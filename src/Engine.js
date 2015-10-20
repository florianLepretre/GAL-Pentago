function NotEmptyException(message) {
    "use strict";

    this.message = message;
    this.name = "NotEmptyException";
}

var Engine = function () {
    "use strict";

    var that = this,
        balls,
        boardSize,
        board,
        player1,
        player2,
        currentPlayer;

    var initBoard = function () {
        var line, column;
        for (line = 0; line < boardSize; line++) {
            for (column = 0; column < boardSize; column++) {
                board[line][column] = 0;
            }
        }
    };

    var computeRotationCoordinates = function (line, column, lineOffset, columnOffset, clockWise) {
        if (clockWise) {
            return (that.getCase((2 - column) + lineOffset, line + columnOffset));
        }
        return (that.getCase(column + lineOffset, (2 - line) + columnOffset));
    };

    var create2DArray = function (size) {
        var line;
        var arr = new Array(size);
        for (line = 0; line < size; line++) {
            arr[line] = new Array(size);
        }
        return arr;
    };

    var rotateSubArray = function (size, lineOffset, columnOffset, clockWise) {
        var line, column;
        var arr = create2DArray(size);

        for (line = 0; line < size; ++line) {
            for (column = 0; column < size; ++column) {
                arr[line][column] = computeRotationCoordinates(line, column, lineOffset, columnOffset, clockWise);
            }
        }
        return arr;
    };

    var init = function () {
        balls = 0;
        boardSize = 6;
        player1 = 'white';
        player2 = 'black';
        currentPlayer = player1;

        board = create2DArray(boardSize);
        initBoard();
    };

    this.addBall = function () {
        ++balls;
    };

    this.changeTurn = function () {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
    };

    this.getBalls = function () {
        return balls;
    };

    this.getBoardSize = function () {
        return boardSize;
    };

    this.getCase = function (line, column) {
        return board[line][column];
    };

    this.getCurrentPlayer = function () {
        return currentPlayer;
    };

    this.play = function (coordinates) {
        var line = coordinates.charCodeAt(1) - 49;
        var column = coordinates.charCodeAt(0) - 97;

        if (this.getCase(line, column) !== 0) {
            throw new NotEmptyException("NotEmptyException");
        }

        this.setCase(line, column, this.getCurrentPlayer());
        this.addBall();
    };

    this.rotate = function (lineOffset, columnOffset, clockwise) {
        var size2 = this.getBoardSize() / 2;
        var line, column;

        var tmpArray = rotateSubArray(size2, lineOffset * size2, columnOffset * size2, clockwise);

        for (line = 0; line < size2; line++) {
            for (column = 0; column < size2; column++) {
                this.setCase(line + lineOffset * size2, column + columnOffset * size2, tmpArray[line][column]);
            }
        }
    };

    this.setCase = function (line, column, player) {
        board[line][column] = player;
    };

    init();
};