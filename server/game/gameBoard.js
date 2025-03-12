//
// Description: This file contains the gameboard logic.
//
// Created by:      Bastian Roth on 02.03.2025
// Last updated by: Bastian Roth on 02.03.2025
//


// Gameboard creation and obstacle placement
const gameBoard = [width, height, obstacles];
let height = int = 100;
let width = int = height / 9 * 16; // Format 16:9 is forced
let obstacles = true;

function createGameBoard(width, height) {
    const grid = [];
    for (i = 0; i < width; i++) {
        for (j = 0; j < height; j++) {
            grid[i][j] = null;
        }
    }
  return grid;
}


// Obstacle placement if obstacles enabled
function placeObstacles() {
    if(obstacles == true){
        for (i = 0; i < width; i++) {
            for (j = 0; j < height; j++) {
                if (Math.random() < 0.2) {
                    grid[i][j] = "obstacle";
                }
            }
        }
    }
}


// Collision detection
// Worldbordercollision prevents movement
function borderCollision(player){
    if (player.x < 0 || player.x >= width) {
        Input.x = 0;
    } else if (player.y < 0 || player.y >= height){
        Input.y = 0;
    };
}

// Obstaclecollision kills players
function obstacleCollision(player){
    if (grid[player.x][player.y] === "obstacle") {
        player.alive = false;
    };
}


