EngineTest = TestCase("EngineTest");

EngineTest.prototype.testEmptyBoard = function () {
    var engine = new Engine();
    var boardSize = engine.getBoardSize();

    assertTrue(engine.getBalls() == 0);

    for (var i = 0; i < boardSize; i++) {
        for (var j = 0; i < boardSize; i++) {
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
    engine.play('a1');
    assertTrue(engine.getCase(0, 0) === 'white');
};

EngineTest.prototype.testBallCount = function () {
    var engine = new Engine();
    engine.play('a1');
    assertTrue(engine.getBalls() == 1);
};

EngineTest.prototype.testRotation = function () {
    var engine = new Engine();
    engine.play('a1');
    engine.rotate(0, 0, true);
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
    engine.play('a1');
    engine.rotate(0, 0, true);
    engine.changeTurn();
    engine.play('a1');
    assertTrue(engine.getCase(0, 0) === 'black');
    assertTrue(engine.getBalls() == 2);
};

EngineTest.prototype.testBlackRotation = function () {
    var engine = new Engine();
    engine.play('a1');
    engine.rotate(0, 0, true);
    engine.changeTurn();
    engine.play('a1');
    engine.rotate(0, 0, false);
    assertTrue(engine.getCase(0, 0) === 'white');
    assertTrue(engine.getCase(2, 0) === 'black');
};

EngineTest.prototype.testWhitePlaysWrong = function () {
    var engine = new Engine();

    engine.play('a1');
    engine.rotate(0, 0, true);
    engine.changeTurn();

    engine.play('a1');
    engine.rotate(0, 0, false);
    engine.changeTurn();

    assertException(function () {
        engine.play('a3')
    }, "NotEmptyException");
    assertException(engine.getCurrentPlayer() === 'white');
};

EngineTest.prototype.testWhiteBlackPlay = function () {
    var engine = new Engine();

    engine.play('a1');
    engine.rotate(0, 0, true);
    engine.changeTurn();

    engine.play('a1');
    engine.rotate(0, 0, false);
    engine.changeTurn();

    engine.play('b1');
    engine.rotate(0, 0, true);
    engine.changeTurn();

    engine.play('a2');
    engine.rotate(0, 0, false);
    engine.changeTurn();

    engine.play('c1');
    engine.rotate(0, 0, true);
    engine.changeTurn();

    engine.play('a3');
    engine.rotate(0, 0, false);
    engine.changeTurn();

    engine.play('d1');
    engine.rotate(0, 1, false);
    engine.changeTurn();

    engine.play('f3');
    engine.rotate(0, 1, true);
    engine.changeTurn();

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

    engine.play('a1');
    engine.rotate(0, 0, true);
    engine.changeTurn();

    engine.play('a1');
    engine.rotate(0, 0, false);
    engine.changeTurn();

    engine.play('b1');
    engine.rotate(0, 0, true);
    engine.changeTurn();

    engine.play('a2');
    engine.rotate(0, 0, false);
    engine.changeTurn();

    engine.play('c1');
    engine.rotate(0, 0, true);
    engine.changeTurn();

    engine.play('a3');
    engine.rotate(0, 0, false);
    engine.changeTurn();

    engine.play('d1');
    engine.rotate(0, 1, false);
    engine.changeTurn();

    engine.play('f3');
    engine.rotate(0, 1, true);
    engine.changeTurn();

    engine.play('e1');
    assertTrue(engine.getWinner() === 'white');
};

EngineTest.prototype.testBlackWins = function () {
    var engine = new Engine();

    assertTrue(engine.getCurrentPlayer() === 'white');

    var movesList = "c4cbl;d4abr;c3ctl;c3ctl;c4cbl;e5cbr;b1ctl;b2ctr;c4cbl;c3";
    var move = movesList.split(";");

    for (var key = 0; key < move.length; key++) {
        engine.play(move[key].substring(0,2));
        var clockwise     = (move[key].charAt(2) === 'c');
        var lineOffset    = (move[key].charAt(3) === 't') ? 0 : 1;
        var columnOffset  = (move[key].charAt(4) === 'l') ? 0 : 1;
        engine.rotate(lineOffset, columnOffset, clockwise);
        engine.changeTurn();
    }

    assertTrue(engine.getWinner() === 'black');
};
