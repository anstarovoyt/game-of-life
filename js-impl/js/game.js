/**
 * Created by anstarovoyt on 24/05/14.
 */

console.log("evaluating example.js");

function Game() {
}

Game.prototype.gameField = null;

Game.prototype.isFieldAlive = function () {
    return this.gameField != null;
};

//compatibility stuff
function isNodeJS() {
    return typeof module !== 'undefined' && module.exports;
}

if (isNodeJS()) {
    exports.gameState = new Game();
}




