class Player {
    constructor(id, x, y, color) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = 5;
        this.direction = 'RIGHT';
        this.isAlive = true;

        this.addEventListeners();
    }

    addEventListeners() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'w') this.direction = 'UP';
            else if (event.key === 's') this.direction = 'DOWN';
            else if (event.key === 'a') this.direction = 'LEFT';
            else if (event.key === 'd') this.direction = 'RIGHT';
        });
    }

    move() {
        if (!this.isAlive) return;

        if (this.direction === 'UP') this.y -= this.speed;
        else if (this.direction === 'DOWN') this.y += this.speed;
        else if (this.direction === 'LEFT') this.x -= this.speed;
        else if (this.direction === 'RIGHT') this.x += this.speed;
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, 10, 10);
    }

    die() {
        this.isAlive = false;
    }
}

export default Player;

