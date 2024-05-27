class Game {
    constructor(canvasElement, canvasWidth, canvasHeight) {
        this.canvasElement = canvasElement;
        this.canvasElement.width = canvasWidth;
        this.canvasElement.height = canvasHeight;
        this.ctx = this.canvasElement.getContext("2d");
        this.particles = [];
        this.isGravityGun = false;
        this.laser;

        // Put this requestAF at the end of draw() with a condition to avoid infinite loop & keep the clg
    }

    drawPlayer(player) {
        const path = new Path2D();
        path.rect(player.x, player.y, 20, 20);
        this.ctx.fillStyle = player.color;
        this.ctx.fill(path);
    }

    drawParticles() {
        this.particles.forEach((particle) => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, 5, 0, Math.PI * 2, true);
            this.ctx.closePath();
            this.ctx.fillStyle = particle.color; // particle.color
            this.ctx.fill();
            this.ctx.save();
        });
    }

    drawLaser(mouseX, mouseY) {
        if (this.canvasElement.getContext) {
            // Gun
            const gun = new Path2D();
            gun.rect(this.canvasElement.width / 2 - 2.5, this.canvasElement.height - 25, 5, 5);
            this.isGravityGun ? (this.ctx.fillStyle = "purple") : (this.ctx.fillStyle = "red");
            this.ctx.fill(gun);
            this.isGravityGun ? (this.ctx.lineWidth = 10) : (this.ctx.lineWidth = 10);

            this.laser = new Path2D();
            this.laser.moveTo(this.canvasElement.width / 2 - 2.5, this.canvasElement.height - 25);
            // Laser
            this.laser.lineTo(
                this.#toBorder(this.canvasElement.width / 2 - 2.5, this.canvasElement.height - 25, mouseX, mouseY, 0, 0, this.canvasElement.width, this.canvasElement.height).x,
                this.#toBorder(this.canvasElement.width / 2 - 2.5, this.canvasElement.height - 25, mouseX, mouseY, 0, 0, this.canvasElement.width, this.canvasElement.height).y
            );
            this.isGravityGun ? (this.ctx.strokeStyle = "purple") : (this.ctx.strokeStyle = "red");
            this.ctx.stroke(this.laser);
            // console.log(this.ctx.isPointInStroke(laser, this.particles[0].x, this.particles[0].y));
        }
    }

    generateParticles() {
        for (let index = 0; index < 20; index++) {
            this.particles.push(this.#randomParticle());
        }
    }

    // Remove particles dropped on the ground from this.particles
    // Create new particle at the place of the old one
    // Add dropped particles to a new array
    moveParticles() {
        this.particles.forEach((particle) => {
            particle.moveAround(this.canvasElement.width, this.canvasElement.height);
        });
    }

    shootAtParticle() {
        // Gravity gun make particle drop
        this.particles.forEach((particle) => {
            if (this.ctx.isPointInStroke(this.laser, particle.x, particle.y)) {
                if (this.isGravityGun) {
                    particle.drop();
                    // gravityGun.cooldown()
                } else {
                    particle.combine();
                }
            }
        });
        // Particle gun make particle combine
    }
    repelParticles() {
        this.particles.forEach((particle) => {
            for (let index = 0; index < this.particles.length; index++) {
                if (particle === this.particles[index]) {
                    continue;
                }
                particle.repel(this.particles[index]);
            }
        });
    }

    /**
     *
     * @param {Position 1 at X} x1
     * @param {Position 1 at Y} y1
     * @param {Position 2 at X} x2
     * @param {Position 2 at Y} y2
     * @param {Position of left borber} left
     * @param {Position of top borber} top
     * @param {Position of right borber} right
     * @param {Position of bottom borber} bottom
     * @returns Position of line going through P1 and P2 in the border
     */
    #toBorder(x1, y1, x2, y2, left, top, right, bottom) {
        let dx, dy, py, vx, vy;
        vx = x2 - x1;
        vy = y2 - y1;
        dx = vx < 0 ? left : right;
        dy = py = vy < 0 ? top : bottom;
        if (vx === 0) {
            dx = x1;
        } else if (vy === 0) {
            dy = y1;
        } else {
            dy = y1 + (vy / vx) * (dx - x1);
            if (dy < top || dy > bottom) {
                dx = x1 + (vx / vy) * (py - y1);
                dy = py;
            }
        }
        return { x: dx, y: dy };
    }

    /**
     * Generate a random particle
     */
    #randomParticle() {
        let randomX = 10 + Math.random() * (this.canvasElement.width - 10);
        let randomY = 10 + Math.random() * (this.canvasElement.height - this.canvasElement.height * (3 / 5));
        return Math.random() > 0.5 ? new Proton(randomX, randomY, "orange") : new Electron(randomX, randomY, "blue");
    }
}
