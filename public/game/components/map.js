export function drawGrid(ctx, canvas, grid) {
    ctx.strokeStyle = "#bbbbbb";
    const gridSize = 15; // **Sicherstellen, dass es überall gleich ist**
    
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 1) {
                ctx.fillStyle = "red";
                ctx.fillRect(j * gridSize, i * gridSize, gridSize, gridSize);
            }
            ctx.strokeRect(j * gridSize, i * gridSize, gridSize, gridSize);
        }
    }
}
