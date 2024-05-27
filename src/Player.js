class Player {
    constructor(x, y, speed, color) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.color = color;
        this.particles = [];
    }

    move(left, right) {
        if (left) {
            this.x -= this.speed;
        }
        if (right) {
            this.x += this.speed;
        }
    }

    pickParticle(particle) {
        this.particles.push();
    }

    throwParticle() {
        this.particles.pop();
    }
}
