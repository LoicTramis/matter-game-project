class Player {
    constructor(x, y, speed, color) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.color = color;
        this.inventory = [];
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
        if (this.inventory.length) {
            this.inventory.at(-1).isInShooter = false;
        }
        this.inventory.push(particle);
        this.inventory.at(-1).isInShooter = true;
    }

    throwParticle() {
        this.inventory.pop()?.throw();
        if (this.inventory.length) {
            this.inventory.at(-1).isInShooter = true;
        }
    }
    getLastParticle() {
        return this.inventory.at(-1);
    }
}
