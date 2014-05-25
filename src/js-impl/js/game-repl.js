/**
 * Created by anstarovoyt on 24/05/14.
 */
function isNodeJS() {
    return typeof module !== 'undefined' && module.exports;
}

(function testCell() {
    function getCellFactory() {
        if (isNodeJS()) {
            return  require('./cell.js').cellFactory;
        }
        //noinspection JSUnresolvedVariable
        return cellFactory;
    }
    var localCellFactory = getCellFactory();

    var cell1 = localCellFactory.createCell(2, 2);
    var cell2 = localCellFactory.createCell(2, 2);
    var cell3 = localCellFactory.createCell(2, 1);
    console.log("c1 and c2 are equal: " + cell1.equalsToCell(cell2));

    var arr = {};
    arr[cell1.getKey()] = true;
    console.log("arr with c1 " + arr[cell1.getKey()]);
    console.log("arr with c2 " + arr[cell2.getKey()]);
    console.log("arr with c3 " + arr[cell3.getKey()]);
})();