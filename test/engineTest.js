EngineTest = TestCase("EngineTest");

EngineTest.prototype.testEmptyBoard = function(){
    var engine    = new Engine();
    var boardSize = engine.getBoardSize();

    assertTrue(engine.getBalls() == 0);

    for (var i = 0; i < boardSize; i++){
        for (var j = 0; i < boardSize; i++){
            assertTrue(engine.getCase(i, j) == 0);
        }
    }
};

EngineTest.prototype.testWhiteBegins = function(){
    var engine = new Engine();
    assertTrue(engine.getCurrentPlayer() === 'white');
};

EngineTest.prototype.testWhitePlays = function(){
    var engine = new Engine();
    engine.play('a1');
    assertTrue(engine.getCase(0,0) === 'white');
};

EngineTest.prototype.testBallCount = function(){
    var engine = new Engine();
    engine.play('a1');
    assertTrue(engine.getBalls() == 1);
};

EngineTest.prototype.testRotation = function(){
    var engine = new Engine();
    engine.play('a1');
    engine.rotate('NW');
    assertTrue(engine.getCase(0,0) == 0);
    assertTrue(engine.getCase(0,2) === 'white');
};

EngineTest.prototype.testBlackTurn = function(){
    var engine = new Engine();
    engine.changeTurn();
    assertTrue(engine.getCurrentPlayer() === 'black');
};