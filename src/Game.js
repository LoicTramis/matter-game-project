class Game {
    constructor(canvasElement, canvasWidth, canvasHeight) {
        this.canvasElement = canvasElement
        this.canvasElement.width = canvasWidth
        this.canvasElement.height = canvasHeight
        this.ctx = this.canvasElement.getContext("2d")
        this.electron = new Electron(this.canvasElement);
        this.draw = this.draw.bind(this)
        this.particles = []
        // Put this requestAF at the end of draw() with a condition to avoid infinite loop & keep the clg

    }

    draw(mouseX, mouseY) {
        if (this.canvasElement.getContext) {
            this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

            // Place the shooter
            const shooter = new Path2D();
            shooter.rect(this.canvasElement.width / 2 - 10, this.canvasElement.height - 30, 20, 20)
            this.ctx.fillStyle = "darkblue"
            this.ctx.fill(shooter)

            const gun = new Path2D();
            gun.rect(this.canvasElement.width / 2 - 2.5, this.canvasElement.height - 25, 5, 5)
            this.ctx.fillStyle = "red"
            this.ctx.fill(gun)

            this.ctx.beginPath()
            this.ctx.moveTo(this.canvasElement.width / 2 - 2.5, this.canvasElement.height - 25)
            this.ctx.lineTo(
                this.#toBorder(
                    this.canvasElement.width / 2 - 2.5,
                    this.canvasElement.height - 25,
                    mouseX,
                    mouseY,
                    0,
                    0,
                    this.canvasElement.width,
                    this.canvasElement.height
                ).x,
                this.#toBorder(
                    this.canvasElement.width / 2 - 2.5,
                    this.canvasElement.height - 25,
                    mouseX,
                    mouseY,
                    0,
                    0,
                    this.canvasElement.width,
                    this.canvasElement.height
                ).y
            )
            // ctx.lineTo(mouseX, mouseY)
            this.ctx.closePath()
            this.ctx.strokeStyle = "red"
            this.ctx.stroke()
            this.drawParticles()

        }
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
        return { x: dx, y: dy }
    }

    generateParticles() {
        for (let index = 0; index < 20; index++) {
            let randomParticle = Math.random() > 0.5 ? new Proton() : new Electron()
            this.particles.push(randomParticle)
        }
    }

    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(100, 100, 2, 0, Math.PI * 2, true);
            this.ctx.closePath();
            this.ctx.fillStyle = "blue"; // particle.color
            this.ctx.fill();
        })

    }
}
