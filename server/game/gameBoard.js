//
// Description: This file contains the gameboard logic.
//
// Created by:      Bastian Roth on 02.03.2025
// Last updated by: Bastian Roth on 02.03.2025
//


// Gameboard creation and obstacle placement
const gameBoard = [width, height, obstacles];
let width = int = 170;
let height = int = 100;
let obstacles = true;

function createGameBoard(width, height, obstacles) {
    const grid = [];
    for (i = 0; i < width; i++) {
        for (j = 0; j < height; j++) {
            grid[i][j] = null;
        }
    }
  return gameBoard;
}


// Obstacle placement if obstacles enabled
function placeObstacles() {
    if(obstacles == true){
        for (i = 0; i < width; i++) {
            for (j = 0; j < height; j++) {
                if (Math.random() < 0.1) {
                    grid[i][j] = "obstacle";
                }
            }
        }
    }
}


// Collision detection
function borderCollision(player){
    if (player.x < 0 || player.x >= width || player.y < 0 || player.y >= height) {
        player.alive = false; //? Movement stop of Killed?
    };
}

function obstacleCollision(player){
    if (grid[player.x][player.y] === "obstacle") {
        player.alive = false; //? Obstacle kill? Or introduce as variant?
    };
}


