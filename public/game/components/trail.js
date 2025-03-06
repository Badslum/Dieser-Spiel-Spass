export function updateTrail(player) {
    player.trail.push(...player.tempTrail);
    player.tempTrail = [];
}

export function captureArea(player) {
    player.trail.forEach(pos => {
        player.grid[pos.y][pos.x] = 1;
    });
    player.trail = [];
}

export function getFullTrail(x1, y1, x2, y2) {
    let trail = [];
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    let sx = x1 < x2 ? 1 : -1;
    let sy = y1 < y2 ? 1 : -1;
    let err = dx - dy;

    while (x1 !== x2 || y1 !== y2) {
        trail.push({ x: x1, y: y1 });
        let e2 = err * 2;
        if (e2 > -dy) {
            err -= dy;
            x1 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y1 += sy;
        }
    }

    trail.push({ x: x2, y: y2 });
    return trail;
}
