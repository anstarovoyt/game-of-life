/**
 * Created by anstarovoyt on 24/05/14.
 */
function isNodeJS() {
    return typeof module !== 'undefined' && module.exports;
}

(function testGame() {
    var gameState;

    if (isNodeJS()) {
        gameState = require('./game.js').gameState;
    } else {
        gameState = new Game();
    }
    gameState.gameField = "";
    console.log("field is alive? " + gameState.isFieldAlive());
})();


(function testCell() {
    var factory;
    if (isNodeJS()) {
        factory = require('./cell.js').cellFactory;
    } else {
        factory = cellFactory;
    }

    var cell1 = factory.createObject(2, 2);
    var cell2 = factory.createObject(2, 1);
    console.log("cells are equal: " + cell1.equalsToCell(cell2));
})();