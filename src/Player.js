class Player {
    constructor(x, y, speed, color) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.color = color;
    }

    move(left, right) {
        if (left) {
            this.x -= this.speed;
        }
        if (right) {
            this.x += this.speed;
        }
    }
}
