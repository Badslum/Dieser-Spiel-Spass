class Collision {
    static checkCollision(player, obstacles) {
        return obstacles.some(obstacle => 
            obstacle.x === player.x && obstacle.y === player.y
        );
    }

    static checkWallCollision(player, canvasWidth, canvasHeight) {
        return player.x < 0 || player.y < 0 || player.x > canvasWidth || player.y > canvasHeight;
    }

    static checkPlayerCollision(player, otherPlayers) {
        return otherPlayers.some(other => 
            other.id !== player.id && player.x === other.x && player.y === other.y
        );
    }
}

export default Collision;