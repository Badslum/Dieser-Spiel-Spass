export function updateMiniMap(grid, player) {
    const canvas = document.getElementById("mini-map");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rows = grid.length;
    const cols = grid[0].length;

    // **Seitenverhältnis beibehalten**
    const aspectRatio = cols / rows;
    const baseSize = 100;
    canvas.width = baseSize * aspectRatio;
    canvas.height = baseSize;

    const cellWidth = canvas.width / cols;
    const cellHeight = canvas.height / rows;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // **Mini-Map-Raster zeichnen**
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (grid[y][x] === 1) {
                ctx.fillStyle = "red"; // Eingenommene Fläche
            } else {
                ctx.fillStyle = "white"; // Neutrale Fläche
            }
            ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
        }
    }

    // **Spur hinter dem Spieler auf der Mini-Map anzeigen**
    ctx.fillStyle = "rgba(255, 50, 50, 0.5)"; // Halbtransparente rote Linie
    player.trail.forEach(pos => {
        ctx.fillRect(pos.x * cellWidth, pos.y * cellHeight, cellWidth, cellHeight);
    });

    // **Spieler live auf der Mini-Map anzeigen**
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(
        player.x * cellWidth + cellWidth / 2,
        player.y * cellHeight + cellHeight / 2,
        Math.min(cellWidth, cellHeight) / 3,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // **Mini-Map-Rahmen zeichnen**
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}
