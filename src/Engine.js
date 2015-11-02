function NotEmptyException(message) {
    "use strict";

    //noinspection JSUnusedGlobalSymbols
    this.message = message;
    //noinspection JSUnusedGlobalSymbols
    this.name = "NotEmptyException";
}

var Engine = function (player2Starts, mode) { // jshint ignore:line
    "use strict";

    var that = this,
        balls,
        boardSize,
        board,
        currentPlayer,
        nbPlayers,
        winner = false;

    var initBoard = function () {
        var line, column;
        for (line = 0; line < boardSize; line++) {
            for (column = 0; column < boardSize; column++) {
                board[line][column] = 0;
            }
        }
    };

    var checkHorizontal = function (line, column, offset) {
        if (board[line][column + offset] === currentPlayer) {
            return 1 + checkHorizontal(line, column + offset, offset);
        }
        return 0;
    };

    var checkVertical = function (line, column, offset) {
        if (!board[line + offset]) {
            return 0;
        }
        if (board[line + offset][column] === currentPlayer) {
            return 1 + checkVertical(line + offset, column, offset);
        }
        return 0;
    };

    var checkDiagonal1 = function (line, column, offset) {
        if (!board[line - offset]) {
            return 0;
        }
        if (board[line - offset][column + offset] === currentPlayer) {
            return 1 + checkDiagonal1(line - offset, column + offset, offset);
        }
        return 0;
    };

    var checkDiagonal2 = function (line, column, offset) {
        if (!board[line + offset]) {
            return 0;
        }
        if (board[line + offset][column + offset] === currentPlayer) {
            return 1 + checkDiagonal2(line + offset, column + offset, offset);
        }
        return 0;
    };

    var checkLines = function (line, column) {
        var horizontalCount = checkHorizontal(line, column, 1) + checkHorizontal(line, column, -1);
        if (horizontalCount >= 4) {
            winner = currentPlayer;
            return;
        }
        var verticalCount = checkVertical(line, column, 1) + checkVertical(line, column, -1);
        if (verticalCount >= 4) {
            winner = currentPlayer;
        }
    };

    var checkDiagonals = function (line, column) {
        var diagonal1Count = checkDiagonal1(line, column, 1) + checkDiagonal1(line, column, -1);
        if (diagonal1Count >= 4) {
            winner = currentPlayer;
            return;
        }
        var diagonal2Count = checkDiagonal2(line, column, 1) + checkDiagonal2(line, column, -1);
        if (diagonal2Count >= 4) {
            winner = currentPlayer;
        }
    };

    var checkWin = function (line, column) {
        checkLines(line, column);
        if (winner) {
            return;
        }
        checkDiagonals(line, column);
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

    var initNormal = function (player2Starts) {
        balls = 0;
        boardSize = 6;
        currentPlayer = player2Starts ? 2 : 1;
        nbPlayers = 2;

        board = create2DArray(boardSize);
        initBoard();
    };

    var initXL3 = function () {
        balls = 0;
        boardSize = 9;
        currentPlayer = 1;
        nbPlayers = 3;

        board = create2DArray(boardSize);
        initBoard();
    };

    var initXL4 = function () {
        balls = 0;
        boardSize = 9;
        currentPlayer = 1;
        nbPlayers = 4;

        board = create2DArray(boardSize);
        initBoard();
    };

    this.addBall = function () {
        ++balls;
    };

    this.changeTurn = function () {
        currentPlayer = (currentPlayer + 1 > nbPlayers) ? 1 : currentPlayer + 1;
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

    this.getWinner = function () {
        return winner;
    };

    this.play = function (coordinates) {
        var line = coordinates.charCodeAt(1) - 49;
        var column = coordinates.charCodeAt(0) - 97;

        if (this.getCase(line, column) !== 0) {
            throw new NotEmptyException("NotEmptyException");
        }

        this.setCase(line, column, this.getCurrentPlayer());
        this.addBall();
        checkWin(line, column);
    };

    this.rotate = function (lineOffset, columnOffset, clockwise) {
        var size2 = 3;
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

    if (mode === 'XL3') {
        initXL3();
    } else if (mode === 'XL4') {
        initXL4();
    } else {
        initNormal(player2Starts);
    }
};