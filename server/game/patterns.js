// 
// Description: Backend-functions to check and update the game board based on the pattern of the player's movement.
//
// Created by:      Bastian Roth on 02.03.2025
// Last updated by: Bastian Roth on 02.03.2025
//

//Todo: check starting position coordinates, Path and End. Add area in between
function checkPattern(player, grid){
while( player.x !== grid.team && grid.team !== grid.team){
    player.path.push({ x: player.x, y: player.y});
}}
function updateTerritory(player, grid){
    player.path.forEach(cell => {
        grid[cell.x][cell.y]= {
            team: player.team
        }
    });
}

// Export
module.exports = { checkPattern, updateTerritory };