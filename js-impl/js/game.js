/**
 * Created by anstarovoyt on 24/05/14.
 */
console.log("evaluating example.js");

function Game(){
}

Game.prototype.field = null;

Game.prototype.isFieldAlive = function() {
    return this.field != null;
};

exports.gameState = new Game();

