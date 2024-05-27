// http://buildnewgames.com/particle-systems/

class Particle {
    constructor(x, y, life, angle, speed, size, color) {
        this.x = x;
        this.y = y;
        this.isGrounded = false;

        let angleInRadians = (angle * Math.PI) / 180;
        this.velocityX = speed * Math.cos(angleInRadians);
        this.velocityY = -speed * Math.sin(angleInRadians);

        this.originalLife = this.life;
        this.color = color;
        this.originalSize = size;
        this.alpha = 1;
    }

    // ? Try with Particle.prototype.update = function(dt) instead
    update(dt) {
        this.life -= dt;

        if (this.life > 0) {
            this.x += this.velocityX * dt;
            this.y += this.velocityY * dt;
        }
    }
    moveAround(width, height) {
        if (this.x < 10) {
            this.x += 2;
        }
        if (this.y < 10) {
            this.x = this.x;
            this.y += 2;
        }
        if (this.x > width) {
            this.x -= 1;
        }
        if (this.y < (height * 2) / 5) {
            this.x += Math.random() > 0.5 ? 1 : -1;
            this.y += Math.random() > 0.475 ? 1 : -1;
        } else {
            this.x = this.x;
            this.y *= 1.02;
        }
        if (this.y > height) {
            this.x = this.x;
            this.y = height - 10;
            this.isGrounded = true;
        }
    }
    repel() {}
}
