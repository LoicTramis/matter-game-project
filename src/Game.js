class Game {
    constructor(canvasElement, canvasWidth, canvasHeight, level) {
        this.canvasElement = canvasElement;
        this.canvasElement.width = canvasWidth;
        this.canvasElement.height = canvasHeight;
        this.ctx = this.canvasElement.getContext("2d");
        this.particles = [];
        this.isGravityGun = false;
        this.laser;
        this.playerPath;
        this.laserColors = [
            {
                color: "#240d82",
                size: 18,
            },
            {
                color: "#4720e5",
                size: 17,
            },
            {
                color: "#2399f6",
                size: 15,
            },
            {
                color: "#43108f",
                size: 13,
            },
            {
                color: "#0b0120",
                size: 11,
            },
            {
                color: "#000000",
                size: 8,
            },
        ];
        this.level = level;

        // Put this requestAF at the end of draw() with a condition to avoid infinite loop & keep the clg
    }

    drawPlayer(player) {
        const playerImg = new Image();
        playerImg.src = "./assets/player.png";
        this.playerPath = new Path2D();
        this.playerPath.rect(player.x, player.y, 40, 40);
        this.ctx.fillStyle = player.color;
        this.ctx.fill(this.playerPath);
        this.ctx.drawImage(playerImg, player.x, player.y, 40, 40);
    }

    drawParticles() {
        this.particles.forEach((particle) => {
            if (!particle.isInInventory) {
                this.#drawParticle(particle);
            }
            //
        });
    }

    drawLaser(mouseX, mouseY, player) {
        if (this.canvasElement.getContext) {
            // Gun
            const laserGun = new Image();
            laserGun.src = "./assets/laser.png";

            const gravityGun = new Image();
            gravityGun.src = "./assets/gravity.png";
            const blackHole = new Image();
            blackHole.src = "./assets/blackhole.png";

            this.laser = new Path2D();
            // Gravity gun OR Laser gun
            if (this.isGravityGun) {
                /* ------ IMAGES ---------- */
                this.ctx.drawImage(gravityGun, this.canvasElement.width / 2 - 20, this.canvasElement.height - 75, 38, 70);
                /* ---- LINES & COLORS ---- */

                // Pretty laser
                for (let i = 0; i < this.laserColors.length; i++) {
                    const element = this.laserColors[i];
                    // Line 6
                    this.ctx.lineWidth = element.size;
                    this.laser.moveTo(this.canvasElement.width / 2, this.canvasElement.height - 100);
                    this.laser.lineTo(
                        this.#toBorder(
                            this.canvasElement.width / 2 - 2.5,
                            this.canvasElement.height - 75,
                            mouseX,
                            mouseY,
                            0,
                            0,
                            this.canvasElement.width,
                            this.canvasElement.height
                        ).x,
                        this.#toBorder(
                            this.canvasElement.width / 2 - 2.5,
                            this.canvasElement.height - 75,
                            mouseX,
                            mouseY,
                            0,
                            0,
                            this.canvasElement.width,
                            this.canvasElement.height
                        ).y
                    );
                    this.ctx.strokeStyle = element.color;
                    this.ctx.stroke(this.laser);
                }

                this.ctx.drawImage(blackHole, this.canvasElement.width / 2 - 20, this.canvasElement.height - 120, 40, 40);
            } else {
                /* ------- IMAGE --------- */
                this.ctx.drawImage(laserGun, this.canvasElement.width / 2 - 27, this.canvasElement.height - 75, 50, 70);

                /* ------- LINE ---------- */
                this.laser.moveTo(this.canvasElement.width / 2 - 2.5, this.canvasElement.height - 75);
                this.ctx.lineWidth = 1;
                this.laser.lineTo(
                    this.#toBorder(this.canvasElement.width / 2 - 2.5, this.canvasElement.height - 75, mouseX, mouseY, 0, 0, this.canvasElement.width, this.canvasElement.height).x,
                    this.#toBorder(this.canvasElement.width / 2 - 2.5, this.canvasElement.height - 75, mouseX, mouseY, 0, 0, this.canvasElement.width, this.canvasElement.height).y
                );

                /* ------- COLOR --------- */
                this.ctx.strokeStyle = "red";
                if (player.particle) {
                    this.#drawParticle(player.getParticle(), this.canvasElement.width / 2 - 2.5, this.canvasElement.height - 25);
                }
                this.ctx.stroke(this.laser);
            }
            /* const gun = new Path2D();
      gun.rect(
        this.canvasElement.width / 2 - 2.5,
        this.canvasElement.height - 25,
        5,
        5
      );
      this.ctx.fill(gun); */
        }
    }

    generateParticles(level) {
        for (let index = 0; index < level.nbOfProtons; index++) {
            this.particles.push(this.#randomParticle(false, "Proton"));
        }
        for (let index = 0; index < level.nbOfElectrons; index++) {
            this.particles.push(this.#randomParticle(false, "Electron"));
        }
    }

    moveParticles() {
        this.particles.forEach((particle) => {
            particle.moveAround(this.canvasElement.width, this.canvasElement.height);
            if (particle.constructor.name === "Electron" && !particle.isThrown) {
                particle.drop();
            }
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
                particle.y = this.canvasElement.height - 75;
                const angle = (Math.atan2(mouseY - this.canvasElement.height - 25, mouseX - this.canvasElement.width / 2 - 2.5) * 180) / Math.PI;
                // console.log(angle);
                player.throwParticle(angle);
            }
        });
    }

    pickParticles(player) {
        this.particles.forEach((particle) => {
            if (!particle.isInInventory && !particle.isRotating && particle.isGrounded && this.ctx.isPointInPath(this.playerPath, particle.x, particle.y)) {
                particle.isInInventory = true;
                player.pickParticle(particle, this.level);
            }
        });
    }

    /**
     * Loop throw every particle twice to check if
     *  - particles are not the same and
     *  - one particle is thrown and
     *  - one particle is close to another particle
     *  if true then check if
     *    - particles are different and
     *    - particles are not already rotating
     *    if true then combine them by rotating one over the other
     */
    combineParticles() {
        particles: for (let i = 0; i < this.particles.length; i++) {
            const particle1 = this.particles[i];

            for (let j = 0; j < this.particles.length; j++) {
                const particle2 = this.particles[j];

                if (particle1 !== particle2 && (particle1.isThrown || particle2.isThrown) && particle1.isParticleClose(particle2)) {
                    if (particle1.constructor.name === "Electron" && particle2.constructor.name === "Proton") {
                        particle1.combine(particle1, particle2);
                        break particles;
                    }

                    if (particle1.constructor.name === "Proton" && particle2.constructor.name === "Electron") {
                        particle2.combine(particle2, particle1);
                        break particles;
                    }
                }
            }
        }
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
    #randomParticle(isRandom, particle = "Proton") {
        let randomX = 10 + Math.random() * (this.canvasElement.width - 10);
        let randomY = 10 + Math.random() * (this.canvasElement.height - this.canvasElement.height * (3 / 5));

        if (isRandom) {
            return Math.random() > 0.5 ? new Proton(randomX, randomY, "orange") : new Electron(randomX, randomY, "blue");
        } else if (particle === "Proton") {
            return new Proton(randomX, randomY, "orange");
        } else if (particle === "Electron") {
            return new Electron(randomX, randomY, "blue");
        } else if (particle === "Neutron") {
            return new Neutron(randomX, randomY, "white");
        }
    }

    #drawParticle(particle, x, y) {
        let px = x ? x : particle.x;
        let py = y ? y : particle.y;
        this.ctx.beginPath();
        if (particle.constructor.name === "Electron") {
            this.ctx.arc(px, py, 3, 0, Math.PI * 2, true);
        } else {
            this.ctx.arc(px, py, 7, 0, Math.PI * 2, true);
        }
        this.ctx.closePath();
        this.ctx.fillStyle = particle.color; // particle.color
        this.ctx.fill();
    }
}
