import { updateMiniMap } from "./miniMap.js";
import { handlePlayerDeath } from "./playerDeath.js";
import { captureEnclosedArea } from "./areaCapture.js";

export function movePlayer(player) {
    if (!player.alive) return;

    let newX = player.x;
    let newY = player.y;

    switch (player.direction) {
        case "up": newY--; break;
        case "down": newY++; break;
        case "left": newX--; break;
        case "right": newX++; break;
    }

    if (newX < 0 || newX >= player.grid[0].length || newY < 0 || newY >= player.grid.length) {
        return;
    }

    // **Fix: Spieler stirbt nur, wenn er seine eigene SPUR trifft, nicht eine eingenommene Fläche**
    if (player.trail.some(pos => pos.x === newX && pos.y === newY)) {
        handlePlayerDeath(player);
        return;
    }

    player.x = newX;
    player.y = newY;

    // **Fix: Spur erst in `trail[]` übernehmen, wenn progress === 1 erreicht wurde**
    if (Math.abs(player.prevX - player.x) + Math.abs(player.prevY - player.y) === 1) {
        player.trail.push({ x: player.prevX, y: player.prevY });
    }

    updateMiniMap(player.grid, player);

    if (player.grid[newY][newX] === 1) {
        captureEnclosedArea(player);
    }
}
