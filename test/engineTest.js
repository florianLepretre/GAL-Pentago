EngineTest = TestCase("EngineTest");

EngineTest.prototype.testEmptyBoard = function () {
    var engine = new Engine();
    var boardSize = engine.getBoardSize();

    assertTrue(engine.getBalls() == 0);

    for (var i = 0; i < boardSize; i++) {
        for (var j = 0; j < boardSize; j++) {
            assertTrue(engine.getCase(i, j) == 0);
        }
    }
};

EngineTest.prototype.testWhiteBegins = function () {
    var engine = new Engine();
    assertTrue(engine.getCurrentPlayer() === 'white');
};

EngineTest.prototype.testWhitePlays = function () {
    var engine = new Engine();
    engine.play('a1', 1, 1, false);
    assertTrue(engine.getCase(0, 0) === 'white');
};

EngineTest.prototype.testBallCount = function () {
    var engine = new Engine();
    engine.play('a1', null, null, null);
    assertTrue(engine.getBalls() == 1);
};

EngineTest.prototype.testRotation = function () {
    var engine = new Engine();
    engine.play('a1', 0, 0, true);
    assertTrue(engine.getCase(0, 0) == 0);
    assertTrue(engine.getCase(0, 2) === 'white');
};

EngineTest.prototype.testBlackTurn = function () {
    var engine = new Engine();
    engine.changeTurn();
    assertTrue(engine.getCurrentPlayer() === 'black');
};

EngineTest.prototype.testBlackPlays = function () {
    var engine = new Engine();
    engine.play('a1', 0, 0, true);
    engine.play('a1', 1, 1, false);
    assertTrue(engine.getCase(0, 0) === 'black');
    assertTrue(engine.getBalls() == 2);
};

EngineTest.prototype.testBlackRotation = function () {
    var engine = new Engine();
    engine.play('a1', 0, 0, true);
    engine.play('a1', 0, 0, false);
    assertTrue(engine.getCase(0, 0) === 'white');
    assertTrue(engine.getCase(2, 0) === 'black');
};

EngineTest.prototype.testWhitePlaysWrong = function () {
    var engine = new Engine();

    engine.play('a1', 0, 0, true);
    engine.play('a1', 0, 0, false);

    assertException(function () {
        engine.play('a3', null, null, null)
    }, "NotEmptyException");
    assertException(engine.getCurrentPlayer() === 'white');
};

EngineTest.prototype.testWhiteBlackPlay = function () {
    var engine = new Engine();

    engine.play('a1',0, 0, true);
    engine.play('a1',0, 0, false);
    engine.play('b1',0, 0, true);
    engine.play('a2',0, 0, false);
    engine.play('c1',0, 0, true);
    engine.play('a3',0, 0, false);
    engine.play('d1',0, 1, false);
    engine.play('f3',0, 1, true);


    assertTrue(engine.getBalls() == 8);

    assertTrue(engine.getCase(0,0) === 'white');
    assertTrue(engine.getCase(0,1) === 'white');
    assertTrue(engine.getCase(0,2) === 'white');
    assertTrue(engine.getCase(0,3) === 'white');

    assertTrue(engine.getCase(2,0) === 'black');
    assertTrue(engine.getCase(2,1) === 'black');
    assertTrue(engine.getCase(2,2) === 'black');
    assertTrue(engine.getCase(2,3) === 'black');
};

EngineTest.prototype.testWhiteWins = function () {
    var engine = new Engine();

    engine.play('a1', 0, 0, true);
    engine.play('a1',0, 0, false);
    engine.play('b1',0, 0, true);
    engine.play('a2',0, 0, false);
    engine.play('c1',0, 0, true);
    engine.play('a3',0, 0, false);
    engine.play('d1',0, 1, false);
    engine.play('f3',0, 1, true);

    engine.play('e1', null, null, null);
    assertTrue(engine.getWinner() === 'white');
};

EngineTest.prototype.testBlackWins = function () {
    var engine = new Engine();

    assertTrue(engine.getCurrentPlayer() === 'white');

    var movesList = "c4cbl;d4abr;c3ctl;c3ctl;c4cbl;e5cbr;b1ctl;b2ctr;c4cbl;c3";
    var move = movesList.split(";");

    for (var key = 0; key < move.length; key++) {
        var clockwise     = (move[key].charAt(2) === 'c');
        var lineOffset    = (move[key].charAt(3) === 't') ? 0 : 1;
        var columnOffset  = (move[key].charAt(4) === 'l') ? 0 : 1;

        engine.play(move[key].substring(0,2), lineOffset, columnOffset, clockwise);
    }

    assertTrue(engine.getWinner() === 'black');
};

EngineTest.prototype.testBlackStarts = function () {
    var engine = new Engine(true);
    assertTrue(engine.getCurrentPlayer() === 'black');
};

EngineTest.prototype.testTieGame = function () {
    var mode = {player2Starts: false, boardSize: 6, player3: '', player4: 'blue'};
    var engine = new Engine();
    var movesList = "a1cbl;d1cbr;b1cbl;e1cbr;c1cbl;f1cbr;a2cbl;d2cbr;b2cbl;e2cbr;c2cbl;f2cbr;" +
                    "a3cbl;d3cbr;b3cbl;e3cbr;c3cbl;f3cbr;b5ctl;a4ctr;e4ctl;b4ctr;f4ctl;d4ctr;" +
                    "d5ctl;a5ctr;f5ctl;c4ctr;a6ctl;c5ctr;b6ctl;e5ctr;d6ctl;c6ctr;f6ctl;e6ctr";
    var move = movesList.split(";");

    for (var key = 0; key < move.length; key++) {
        var clockwise     = (move[key].charAt(2) === 'c');
        var lineOffset    = (move[key].charAt(3) === 't') ? 0 : 1;
        var columnOffset  = (move[key].charAt(4) === 'l') ? 0 : 1;

        engine.play(move[key].substring(0,2), lineOffset, columnOffset, clockwise);
    }

    assertTrue(engine.getBalls() == 36);
    assertTrue(engine.getWinner() == false);
};

EngineTest.prototype.testXL = function (){
    var mode = 'XL4';
    var engine = new Engine(false, mode);
    var boardSize = engine.getBoardSize();

    assertTrue(engine.getBalls() === 0);
    assertTrue(boardSize === 9);

    for (var i = 0; i < boardSize; i++) {
        for (var j = 0; j < boardSize; j++) {
            assertTrue(engine.getCase(i, j) === 0);
        }
    }

    assertTrue(engine.getCurrentPlayer() === 'red');
};

EngineTest.prototype.testFourPlayers = function () {
    var engine = new Engine(false, 'XL4');

    engine.play('a1', 2, 0, true);
    engine.play('b1', 2, 0, true);
    engine.play('c1', 2, 0, true);
    engine.play('i9', 2, 2, false);

    assertTrue(engine.getBalls() === 4);

    assertTrue(engine.getCase(0,0) === 'red');
    assertTrue(engine.getCase(0,1) === 'yellow');
    assertTrue(engine.getCase(0,2) === 'green');
    assertTrue(engine.getCase(6,8) === 'blue');
};

EngineTest.prototype.testThreePlayers = function () {
    var engine = new Engine(false, 'XL3');

    engine.setPlayers('yellow', 'blue', 'red');

    engine.play('a1', 2, 0, true);
    engine.play('b1', 2, 0, true);
    engine.play('c1', 2, 0, true);

    assertTrue(engine.getBalls() === 3);

    assertTrue(engine.getCase(0,0) === 'yellow');
    assertTrue(engine.getCase(0,1) === 'blue');
    assertTrue(engine.getCase(0,2) === 'red');
};