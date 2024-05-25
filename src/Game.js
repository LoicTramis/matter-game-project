class Game {
    constructor(canvasElement, canvasWidth, canvasHeight) {
        this.canvasElement = canvasElement
        this.canvasElement.width = canvasWidth
        this.canvasElement.height = canvasHeight
        this.electron = new Electron(this.canvasElement);
        this.draw = this.draw.bind(this)
        // Put this requestAF at the end of draw() with a condition to avoid infinite loop & keep the clg

    }

    draw(mouseX, mouseY) {
        if (this.canvasElement.getContext) {
            const ctx = this.canvasElement.getContext("2d")
            ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

            // Place the shooter
            const shooter = new Path2D();
            shooter.rect(this.canvasElement.width / 2 - 10, this.canvasElement.height - 30, 20, 20)
            ctx.fillStyle = "darkblue"
            ctx.fill(shooter)
            const gun = new Path2D();
            gun.rect(this.canvasElement.width / 2 - 2.5, this.canvasElement.height - 25, 5, 5)
            ctx.fillStyle = "red"
            ctx.fill(gun)

            ctx.beginPath()
            ctx.moveTo(this.canvasElement.width / 2 - 2.5, this.canvasElement.height - 25)
            ctx.lineTo(
                this.toBorder(
                    this.canvasElement.width / 2 - 2.5,
                    this.canvasElement.height - 25,
                    mouseX,
                    mouseY,
                    0,
                    0,
                    this.canvasElement.width,
                    this.canvasElement.height
                ).x,
                this.toBorder(
                    this.canvasElement.width / 2 - 2.5,
                    this.canvasElement.height - 25,
                    mouseX,
                    mouseY,
                    0,
                    0,
                    this.canvasElement.width,
                    this.canvasElement.height).y
            )
            ctx.closePath()
            ctx.strokeStyle = "red"
            ctx.stroke()

        }
    }


    toBorder(x1, y1, x2, y2, left, top, right, bottom) {
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
}
