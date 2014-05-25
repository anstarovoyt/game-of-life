/**
 * Created by anstarovoyt on 24/05/14.
 */

console.log("evaluating example.js");

if (isNodeJS()) {
    exports.gameFactory = {
        createGame: function () {
            return new Game();
        }}
}

function getCellFactory() {
    if (isNodeJS()) {
        return require('./cell.js').cellFactory;
    }
    //noinspection JSUnresolvedVariable
    return cellFactory;
}
var localCellFactory = getCellFactory();

function Game() {

    this.gameField = {};
}
Game.prototype.isCellAlive = function (x, y) {
    return this.gameField[this.getCell(x, y).getKey()] != null;
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

Game.prototype.getNeighborhoodCount = function (x, y) {
    return this.getNeighborhoodCountForCell(this.getCell(x, y));
};

Game.prototype.getNeighborhoodCountForCell = function (cell) {
    var counter = 0;
    for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
            if ((i != 0 || j != 0) && this.isCellAlive(cell.x + i, cell.y + j)) {
                counter++;
            }
        }
    }
    return counter;
};

Game.prototype.getCell = function (x, y) {
    return localCellFactory.createCell(x, y)
};

Game.prototype.setAlives = function (arr) {
    for (var i = 0; i < arr.length; i += 2) {
        this.setAlive(arr[i], arr[i + 1]);
    }
};


//compatibility stuff
function isNodeJS() {
    return typeof module !== 'undefined' && module.exports;
}






