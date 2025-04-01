// 
// Description: Test check for Player amount, Test Check for % of Territories, Test gain Territory
// 
<<<<<<< HEAD
// ToDo for Christian Weisbrod

const gameState = require("../server/game/gameState");
const gameBoard = Array.from({ length: 10 }, () => Array(10).fill(0));

// Spieler hinzufügen
gameState.addPlayer("player1", gameBoard);
gameState.addPlayer("player2", gameBoard);
gameState.addPlayer("player3", gameBoard);
gameState.addPlayer("player4", gameBoard);

// Spielflächen für Spieler setzen
gameBoard[0][0] = 1; 
gameBoard[0][1] = 1; 
gameBoard[1][0] = 1; 

gameBoard[2][2] = 2; 
gameBoard[2][3] = 2; 
gameBoard[3][2] = 2; 
gameBoard[3][3] = 2; 
gameBoard[4][4] = 2; 

gameBoard[5][5] = 3;
gameBoard[5][6] = 3; 
gameBoard[6][5] = 3; 
gameBoard[6][6] = 3; 
gameBoard[7][7] = 3; 
gameBoard[8][8] = 3; 
gameBoard[9][9] = 3; 

gameBoard[4][0] = 4;
gameBoard[4][1] = 4; 
gameBoard[4][2] = 4; 
gameBoard[4][3] = 4; 
gameBoard[4][4] = 4; 
gameBoard[4][5] = 4; 
gameBoard[4][6] = 4; 
gameBoard[4][7] = 4; 

// Punktestände berechnen
["player1", "player2", "player3", "player4"].forEach(playerId => gameState.updateScore(playerId));

// Top 3 Spieler ausgeben
console.log("🔝 Top 3 Spieler nach eingenommener Fläche:");
console.log(gameState.getTop3Players());

// Test beenden
process.exit(0);
=======
// ToDo for Christian Weissbrod

//remove comment and insert own functions and varibles and adapt the example test to your needs
/*
const assert = require('assert');
const {functions} = require('../server/game/gameState');

describe('describtion for test', function() {
  it('should do what?', function() {
    const variable_x = function(varible_y, vabible_z);
    assert.strictEqual(variable_x, expected_value);
    assert.strictEqual(variable_z, expected_value);
  });
});
*/
>>>>>>> 40c9f94b97e09837f32932d1a832e2a08253f71c
