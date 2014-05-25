/**
 * Created by anstarovoyt on 24/05/14.
 */

function Cell(x, y) {
    this.x = x;
    this.y = y;
}

Cell.prototype.equalsToCell = function (obj2) {
    return this.getKey() === obj2.getKey();
};

Cell.prototype.getKey = function () {
    return JSON.stringify(this);
};

//global declaration
var cellFactory = {
    createCell: function (x, y) {
        return new Cell(x, y);
    }
};

//compatibility stuff
function isNodeJS() {
    return typeof module !== 'undefined' && module.exports;
}

if (isNodeJS()) {
    exports.cellFactory = cellFacgtory;
}
