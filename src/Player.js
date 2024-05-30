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

    pickParticle(particle, level) {
        /* if (this.inventory.length) {
            this.inventory.at(-1).isInShooter = false;
        } 
        this.inventory.push(particle);
        this.inventory.at(-1).isInShooter = true; */
        console.log(particle);
        if (particle?.electrons?.length === 1) {
            console.log("victory");
            level.won = true;
        } else if (!particle?.isRotating) {
            this.particle = particle;
            this.particle.isInShooter = true;
        }
    }

    throwParticle(angle) {
        if (this.particle === null) {
            return;
        }
        this.particle.throw(angle);
        // this.particle = null;
        /*this.inventory.pop()?.throw();
        if (this.inventory.length) {
            this.inventory.at(-1).isInShooter = true;
        } */
    }
    getParticle() {
        return this.particle;
    }
}
