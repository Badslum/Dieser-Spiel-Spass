// 
// Description: Backend-functions to check and update the game board based on the pattern of the player's movement.
//
// Created by:      Bastian Roth on 02.03.2025
// Last updated by: Bastian Roth on 02.03.2025
//

// Check if the player is on a cell of the same team
function checkPattern(player,gameBoard) {
    const currentCell = gameBoard[player.x][player.y];
    if (currentCell && (currentCell.team === player.team)) {
        return true;
    }
    return false;
}


// Update the game board with the player's territory
function updateTerritory(player,gameBoard) {
    gameBoard[player.x][player.y] = {
        team: player.team,
        player: playerID,
    };
}


// Export
module.exports = { checkPattern, updateTerritory };