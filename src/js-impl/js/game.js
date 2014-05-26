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
    return this.isCellAliveForCell(this.getCell(x, y));
};

Game.prototype.isCellDead = function (x, y) {
    return !this.isCellAliveForCell(this.getCell(x, y));
};

Game.prototype.isCellAliveForCell = function (cell) {
    return this.gameField[cell.getKey()] != null;
}

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

Game.prototype.addNeighborhoods = function (cell, result) {
    for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
            var currentCell = this.getCell(cell.x + i, cell.y + j);
            result[currentCell.getKey()] = currentCell;
        }
    }
};

Game.prototype.collectCellsForCheck = function () {
    var cellsForCheck = {};
    for (var cell in this.gameField) {
        if (!this.gameField.hasOwnProperty(cell)) continue;
        this.addNeighborhoods(this.gameField[cell], cellsForCheck);
    }

    return cellsForCheck;
};


Game.prototype.step = function () {
    var newState = {};
    var cellsForCheck = this.collectCellsForCheck();

    for (var cellKey in cellsForCheck) {
        if (!cellsForCheck.hasOwnProperty(cellKey)) continue;
        var cell = cellsForCheck[cellKey];

        if (this.canLive(this.isCellAliveForCell(cell), this.getNeighborhoodCountForCell(cell))) {
            newState[cell.getKey()] = cell;
        }
    }

    this.gameField = newState;
};

Game.prototype.canLive = function (isCurrentAlive, countNeighborhoods) {
    var state;
    if (isCurrentAlive) {
        state = countNeighborhoods === 2 || countNeighborhoods === 3;
    } else {
        state = countNeighborhoods === 3;
    }
    return state;
};


//compatibility stuff
function isNodeJS() {
    return typeof module !== 'undefined' && module.exports;
}






