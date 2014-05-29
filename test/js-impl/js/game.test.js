/**
 * Created by anstarovoyt on 25/05/14.
 */

var assert = require("assert");
var gameFactory = require('../../../src/js-impl/js/game.js').gameFactory;

describe('Game field tests', function () {
    it('Dead by default', function () {
        var game = gameFactory.createGame();
        assert.ok(!game.isCellAlive(0, 0));
        assert.ok(game.isCellDead(0, 0));
    });

    it('depends games', function () {
        var game1 = gameFactory.createGame();
        var game2 = gameFactory.createGame();
        game1.setAlive(0, 0);
        assert.ok(game1.isCellAlive(0, 0));
        assert.ok(game2.isCellDead(0, 0));
    });

    it('Can set alive', function () {
        var game = gameFactory.createGame();
        game.setAlive(0, 0);
        assert.ok(game.isCellAlive(0, 0));
    });

    it('Can set dead', function () {
        var game = gameFactory.createGame();
        game.setAlive(0, 0);
        game.setDead(0, 0);
        assert.ok(game.isCellDead(0, 0));
    });

    it('Set alives', function () {
        var game = gameFactory.createGame();
        game.setAlives([
            0, 0,
            1, 1,
            1, 0]);
        assert.ok(game.isCellAlive(0, 0));
        assert.ok(game.isCellAlive(1, 1));
        assert.ok(game.isCellAlive(1, 0));
    });

    it('Self is not neighborhood', function () {
        var game = gameFactory.createGame();
        game.setAlive(0, 0);
        assert.equal(game.getNeighborhoodCount(0, 0), 0);
    });

    it('Count neighborhood line', function () {
        var game = gameFactory.createGame();
        game.setAlive(0, 0);
        game.setAlive(1, 0);
        game.setAlive(-1, 0);
        assert.equal(game.getNeighborhoodCount(0, 0), 2);
    });

    it('Count neighborhood plus', function () {
        var game = gameFactory.createGame();
        game.setAlive(0, 0);
        game.setAlive(1, 0);
        game.setAlive(-1, 0);
        game.setAlive(0, 1);
        game.setAlive(0, -1);
        assert.equal(game.getNeighborhoodCount(0, 0), 4);
    });

    it('Correct count neighborhoods', function () {
        var game = gameFactory.createGame();
        game.setAlive(0, 0);
        var collectCellsForCheck = game.collectCellsForCheck();

        assert.equal(Object.keys(collectCellsForCheck).length, 9);
    });

    it('Correct cells neighborhoods', function () {
        var game = gameFactory.createGame();
        game.setAlive(0, 0);
        var acceptableNumbers = {"1": true, "0": true, "-1": true};
        var collectCellsForCheck = game.collectCellsForCheck();
        for (var cellId in collectCellsForCheck) {
            if (!collectCellsForCheck.hasOwnProperty(cellId)) continue;

            assert.ok(acceptableNumbers[collectCellsForCheck[cellId].x]);
            assert.ok(acceptableNumbers[collectCellsForCheck[cellId].y]);
        }
    });

    it('one cell should dead', function () {
        var game = gameFactory.createGame();
        game.setAlive(0, 0);
        game.step();
        assert.ok(game.isCellDead(0, 0));
    });

    it('two cell in line should dead', function () {
        var game = gameFactory.createGame();
        game.setAlive(0, 0);
        game.setAlive(0, 1);
        game.step();
        assert.ok(game.isCellDead(0, 0));
        assert.ok(game.isCellDead(0, 1));
    });

    it('blinker one step', function () {
        var game = gameFactory.createGame();
        game.setAlive(0, 0);
        game.setAlive(0, 1);
        game.setAlive(0, -1);
        game.step();
        assert.ok(game.isCellAlive(0, 0));
        assert.ok(game.isCellAlive(1, 0));
        assert.ok(game.isCellAlive(-1, 0));
        assert.ok(game.isCellDead(0, 1));
        assert.ok(game.isCellDead(0, -1));
    });

    it('block is stable', function () {
        var game = gameFactory.createGame();
        game.setAlive(0, 0);
        game.setAlive(0, 1);
        game.setAlive(1, 0);
        game.setAlive(1, 1);
        game.step();
        assert.ok(game.isCellAlive(0, 0));
        assert.ok(game.isCellAlive(1, 1));
        assert.ok(game.isCellAlive(1, 0));
        assert.ok(game.isCellAlive(0, 1));
        assert.ok(game.isCellDead(0, -1));
        assert.ok(game.isCellDead(-1, 0));
        assert.ok(game.isCellDead(-1, -1));
    });

    it('blinker two steps', function () {
        var game = gameFactory.createGame();
        game.setAlive(0, 0);
        game.setAlive(0, 1);
        game.setAlive(0, -1);
        game.step();
        game.step();
        assert.ok(game.isCellAlive(0, 0));
        assert.ok(game.isCellAlive(0, 1));
        assert.ok(game.isCellAlive(0, -1));
        assert.ok(game.isCellDead(1, 0));
        assert.ok(game.isCellDead(-1, 0));
    });

    it('Limit field test', function () {
        var game = gameFactory.createGame();
        game.setLimit(3);
        game.setAlive(0, 0);
        game.setAlive(0, 1);
        game.setAlive(0, 2);
        game.step();
        assert.ok(game.isCellAlive(0, 1));
        assert.ok(game.isCellDead(0, 2));
        assert.ok(game.isCellDead(-1, 1));
        game.step();
        assert.ok(game.isCellDead(0, 0));
        assert.ok(game.isCellDead(0, 1));
        assert.ok(game.isCellDead(0, 2));
    });
});