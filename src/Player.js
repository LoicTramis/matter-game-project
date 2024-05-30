class Player {
    constructor(x, y, speed, color) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.color = color;
        // this.particles = [];
        this.particle = null;
    }

    move(left, right, width) {
        if (left && this.x > 0) {
            this.x -= this.speed;
        }
        if (right && this.x < width - 50) {
            this.x += this.speed;
        }
    }

    pickParticle(particle) {
        /* if (this.inventory.length) {
            this.inventory.at(-1).isInShooter = false;
        } 
        this.inventory.push(particle);
        this.inventory.at(-1).isInShooter = true; */
        if (this.particle === null) {
            this.particle = particle;
            this.particle.isInShooter = true;
            console.log(this.particle);
        }
    }

    throwParticle(angle) {
        if (this.particle === null) {
            return;
        }
        this.particle.throw(angle);
        console.log(this.particle);
        this.particle = null;
        /*this.inventory.pop()?.throw();
        if (this.inventory.length) {
            this.inventory.at(-1).isInShooter = true;
        } */
    }
    getParticle() {
        return this.particle;
    }
}
