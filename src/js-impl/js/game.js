/**
 * Created by anstarovoyt on 24/05/14.
 */

console.log("evaluating example.js");

if (isNodeJS()) {
    exports.gameState = new Game();
}

function getCellFactory() {
    if (isNodeJS()) {
        return require('./cell.js').cellFactory;
    }
    return cellFactory;
}
var localCellFactory = getCellFactory();

function Game() {
}

Game.prototype.gameField = {};

Game.prototype.isCellAlive = function (x, y) {
    return this.gameField[this.getCell(x, y)] != null;
};

Game.prototype.setAlive = function (x, y) {
    this.setCellState(x, y, true);
};

Game.prototype.setDead = function (x, y) {
    this.setCellState(x, y, false);
};

Game.prototype.setCellState = function (x, y, isAlive) {
    var cell = this.getCell(x, y);
    if (isAlive) {
        this.gameField[cell.getKey()] = cell;
    } else {
        delete this.gameField[cell.getKey()];
    }
};

Game.prototype.getCell = function (x, y) {
    return localCellFactory.createCell(x, y)
};


//compatibility stuff
function isNodeJS() {
    return typeof module !== 'undefined' && module.exports;
}






