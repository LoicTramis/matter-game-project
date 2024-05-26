// http://buildnewgames.com/particle-systems/

class Particle {
    constructor(x, y, life, angle, speed, size, color) {
        this.x = x
        this.y = y
        this.life = life

        let angleInRadians = angle * Math.PI / 180
        this.velocityX = speed * Math.cos(angleInRadians)
        this.velocityY = -speed * Math.sin(angleInRadians)

        this.originalLife = this.life;
        this.color = color;
        this.originalSize = size;
        this.alpha = 1;


    }

    // ? Try with Particle.prototype.update = function(dt) instead
    update(dt) {
        this.life -= dt

        if (this.life > 0) {
            this.x += this.velocityX * dt
            this.y += this.velocityY * dt
        }
    }
}
