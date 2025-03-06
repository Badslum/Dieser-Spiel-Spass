import { updateMiniMap } from "./miniMap.js";
import { updateAreaPercentage } from "./ui.js";

export function handlePlayerDeath(player) {
    console.log("Spieler ist gestorben!");

    for (let y = 0; y < player.grid.length; y++) {
        for (let x = 0; x < player.grid[y].length; x++) {
            if (player.grid[y][x] === 2) {
                player.grid[y][x] = 0;
            }
        }
    }

    player.trail = [];
    player.spawnPlayer();

    updateMiniMap(player.grid, player);
    updateAreaPercentage(player.grid);

    console.log("Spiel wurde zurückgesetzt!");

    setTimeout(() => {
        player.alive = true;
    }, 200);
}
