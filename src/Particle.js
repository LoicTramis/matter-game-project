// http://buildnewgames.com/particle-systems/

class Particle {
    constructor(x, y, life, angle, speed, size, color) {
        this.x = x;
        this.y = y;
        this.isGrounded = false;
        this.hasChanged = false;

        let angleInRadians = (angle * Math.PI) / 180;
        this.vx = 1;
        this.vy = 1;

        this.color = color;
        this.originalSize = size;
        this.alpha = 1;
    }

    moveAround(width, height) {
        /* if (this.hasChanged) {
            this.drop();
        } */
        if (!this.hasChanged) {
            if (this.x < 10) {
                this.x += this.vx;
            }
            if (this.y < 10) {
                this.x = this.x;
                this.y += this.vy;
            }
            if (this.x > width) {
                this.x -= this.vx;
            }
            if (this.y < (height * 2) / 5) {
                this.x += Math.random() > 0.5 ? this.vx : -this.vx;
                this.y += Math.random() > 0.5 ? this.vy : -this.vy;
            } else {
                this.y -= this.vy;
            }
            if (this.y > height) {
                this.y = height - 10;
                this.isGrounded = true;
            }
        }
    }
    // ! GET THAT SHIT WORKING
    /* repel(particle) {
        let dx = this.x - particle.x;
        let dy = this.y - particle.y;
        let distance = Math.hypot(dx, dy);
        // If 2 particles are really close
        if (distance < 20) {
            this.x += this.vx * -1;
            this.y += this.vy * -1;
            if (distance < 10) {
                this.color = "red";
                console.log("something's not right");
            }
            return true;
        }
        return false;
    } */
    drop() {
        this.y *= 1.02;
    }
}
