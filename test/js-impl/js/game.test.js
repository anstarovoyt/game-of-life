/**
 * Created by anstarovoyt on 25/05/14.
 */

var assert = require("assert");
var gameFactory = require('../../../src/js-impl/js/game.js').gameFactory;

describe('Game field tests', function () {
    it('Dead by default', function () {
        var game = gameFactory.createGame();
        assert.equal(game.isCellAlive(0, 0), false);
    });

    it('depends games', function () {
        var game1 = gameFactory.createGame();
        var game2 = gameFactory.createGame();
        game1.setAlive(0, 0);
        assert.ok(game1.isCellAlive(0, 0));
        assert.ok(!game2.isCellAlive(0, 0));
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
        assert.equal(game.isCellAlive(0, 0), false);
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
});