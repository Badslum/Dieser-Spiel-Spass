import { updateMiniMap } from "./miniMap.js";
import { updateAreaPercentage } from "./ui.js";

export function captureEnclosedArea(player) {
    let grid = player.grid;
    let trail = player.trail;

    if (trail.length === 0) return;

    let tempGrid = grid.map(row => [...row]);

    // Spur markieren
    trail.forEach(pos => {
        tempGrid[pos.y][pos.x] = 2;
    });

    // Flood-Fill von außen starten
    let floodGrid = tempGrid.map(row => [...row]);
    for (let y = 0; y < floodGrid.length; y++) {
        floodFill(floodGrid, 0, y, 0, -1);
        floodFill(floodGrid, floodGrid[0].length - 1, y, 0, -1);
    }
    for (let x = 0; x < floodGrid[0].length; x++) {
        floodFill(floodGrid, x, 0, 0, -1);
        floodFill(floodGrid, x, floodGrid.length - 1, 0, -1);
    }

    // Eingeschlossene Flächen übernehmen
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (floodGrid[y][x] === 0 || floodGrid[y][x] === 2) {
                grid[y][x] = 1;
            }
        }
    }

    player.trail = [];

    updateMiniMap(grid, player);
    updateAreaPercentage(grid);
}

function floodFill(grid, x, y, target, replacement) {
    if (grid[y][x] !== target) return;
    let queue = [{ x, y }];

    while (queue.length > 0) {
        let { x, y } = queue.pop();
        grid[y][x] = replacement;

        [[0, 1], [1, 0], [0, -1], [-1, 0]].forEach(([dx, dy]) => {
            let newX = x + dx, newY = y + dy;
            if (newX >= 0 && newX < grid[0].length && newY >= 0 && newY < grid.length) {
                if (grid[newY][newX] === target) {
                    queue.push({ x: newX, y: newY });
                }
            }
        });
    }
}
