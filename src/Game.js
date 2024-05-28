class Game {
    constructor(canvasElement, canvasWidth, canvasHeight) {
        this.canvasElement = canvasElement;
        this.canvasElement.width = canvasWidth;
        this.canvasElement.height = canvasHeight;
        this.ctx = this.canvasElement.getContext("2d");
        this.particles = [];
        this.isGravityGun = false;
        this.laser;
        this.playerPath;

        // Put this requestAF at the end of draw() with a condition to avoid infinite loop & keep the clg
    }

    drawPlayer(player) {
        this.playerPath = new Path2D();
        this.playerPath.rect(player.x, player.y, 20, 20);
        this.ctx.fillStyle = player.color;
        this.ctx.fill(this.playerPath);
    }

    drawParticles() {
        this.particles.forEach((particle) => {
            if (!particle.isInInventory) {
                this.#drawParticle(particle);
            }
        });
    }

    drawLaser(mouseX, mouseY, player) {
        if (this.canvasElement.getContext) {
            // Gun
            const gun = new Path2D();
            gun.rect(this.canvasElement.width / 2 - 2.5, this.canvasElement.height - 25, 5, 5);
            this.isGravityGun ? (this.ctx.fillStyle = "purple") : (this.ctx.fillStyle = "red");
            this.ctx.fill(gun);
            this.isGravityGun ? (this.ctx.lineWidth = 15) : (this.ctx.lineWidth = 1);

            this.laser = new Path2D();
            this.laser.moveTo(this.canvasElement.width / 2 - 2.5, this.canvasElement.height - 25);
            // Laser
            this.laser.lineTo(
                this.#toBorder(this.canvasElement.width / 2 - 2.5, this.canvasElement.height - 25, mouseX, mouseY, 0, 0, this.canvasElement.width, this.canvasElement.height).x,
                this.#toBorder(this.canvasElement.width / 2 - 2.5, this.canvasElement.height - 25, mouseX, mouseY, 0, 0, this.canvasElement.width, this.canvasElement.height).y
            );
            if (this.isGravityGun) {
                this.ctx.strokeStyle = "purple";
            } else {
                this.ctx.strokeStyle = "red";
                if (player.particle) {
                    this.#drawParticle(player.getParticle(), this.canvasElement.width / 2 - 2.5, this.canvasElement.height - 25);
                }
            }
            this.ctx.stroke(this.laser);
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
        this.particles = this.particles.filter((particle) => particle.y > -100);
    }

    shootLaser(player, mouseX, mouseY) {
        // Gravity gun make particle drop
        this.particles.forEach((particle) => {
            if (this.isGravityGun) {
                if (this.ctx.isPointInStroke(this.laser, particle.x, particle.y)) {
                    particle.drop();
                    // gravityGun.cooldown()
                }
            } else if (particle.isInShooter) {
                particle.x = this.canvasElement.width / 2 - 2.5;
                particle.y = this.canvasElement.height - 25;
                const angle = (Math.atan2(mouseY - this.canvasElement.height - 25, mouseX - this.canvasElement.width / 2 - 2.5) * 180) / Math.PI;
                console.log(angle);
                player.throwParticle(angle);
            }
        });
    }

    pickParticles(player) {
        this.particles.forEach((particle) => {
            if (!particle.isInInventory && particle.isGrounded && this.ctx.isPointInPath(this.playerPath, particle.x, particle.y)) {
                particle.isInInventory = true;
                player.pickParticle(particle);
            }
        });
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

    #drawParticle(particle, x, y) {
        let px = x ? x : particle.x;
        let py = y ? y : particle.y;
        this.ctx.beginPath();
        this.ctx.arc(px, py, 5, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fillStyle = particle.color; // particle.color
        this.ctx.fill();
    }
}
