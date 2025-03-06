export function updateAreaPercentage(grid) {
    const totalCells = grid.length * grid[0].length;
    let occupiedCells = 0;

    // **Zähle die eingefärbten Felder**
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 1) {
                occupiedCells++;
            }
        }
    }

    // **Berechne den Prozentsatz**
    const percentage = ((occupiedCells / totalCells) * 100).toFixed(2);

    // **Anzeige aktualisieren**
    document.getElementById("area-percentage").innerText = `Fläche: ${percentage}%`;
}



