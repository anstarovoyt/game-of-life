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

    var cell1 = factory.createCell(2, 2);
    var cell2 = factory.createCell(2, 2);
    var cell3 = factory.createCell(2, 1);
    console.log("c1 and c2 are equal: " + cell1.equalsToCell(cell2));

    var arr = {};
    arr[cell1.getKey()] = true;
    console.log("arr with c1 " + arr[cell1.getKey()]);
    console.log("arr with c2 " + arr[cell2.getKey()]);
    console.log("arr with c3 " + arr[cell3.getKey()]);
})();