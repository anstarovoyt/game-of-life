var assert = require("assert");
var cellFactory = require('../../../src/js-impl/js/cell.js').cellFactory;

describe('Cell tests', function () {
    it('Export factory', function () {
        assert.ok(cellFactory != null);
    });

    it('Cell equals', function () {
        var cell1 = cellFactory.createCell(1, 1);
        var cell2 = cellFactory.createCell(1, 1);
        assert.ok(cell1.equalsToCell(cell2));
    });

    it('Stable get key', function () {
        var cell = cellFactory.createCell(1, 1);
        assert.equal(cell.getKey(), cell.getKey());
    })
});