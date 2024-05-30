// http://buildnewgames.com/particle-systems/
// https://developer.mozilla.org/en-US/play
/*
const canvas = document.getElementById("cw");
const context = canvas.getContext("2d");
context.globalAlpha = 0.5;



let particle = new Particle(innerWidth/3, innerHeight/3, 2, "#ff0000", 0.1);

setSize();
anim();

function setSize() {
  canvas.height = innerHeight;
  canvas.width = innerWidth;
}

function Particle(x, y, particleTrailWidth, strokeColor, rotateSpeed) {
  this.x = x;
  this.y = y;
  this.particleTrailWidth = particleTrailWidth;
  this.strokeColor = strokeColor;
  this.theta =  Math.PI * 0.5;
  this.rotateSpeed = rotateSpeed;
  this.t = 50;

  this.rotate = () => {
    const ls = {
      x: this.x,
      y: this.y,
    };
    this.theta += this.rotateSpeed;
    this.x = 255+Math.cos(this.theta) * this.t;
    this.y = 255+Math.sin(this.theta) * this.t;
    context.beginPath();
    context.lineWidth = this.particleTrailWidth;
    context.strokeStyle = this.strokeColor;
    context.moveTo(ls.x, ls.y);
    context.lineTo(this.x, this.y);
    context.stroke();
  };
}

function anim() {
  requestAnimationFrame(anim);

  context.fillStyle = "rgb(0 0 0 / 5%)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  particle.rotate();
}

*/

class Particle {
    constructor(x, y, life, angle, speed, size, color) {
        this.x = x;
        this.y = y;
        this.vx = 1;
        this.vy = 1;
        this.isGrounded = false;
        this.isCaptured = false;
        this.isInInventory = false;
        this.isInShooter = false;
        this.isThrown = false;
        this.isRotating = false;
        this.hasChangedDir = false;

        this.color = color;
        this.originalSize = size;
        this.theta = Math.PI * 20; // angle of rotation
        this.t = 20; // radius
        this.alpha = 1; // transparency
        this.ls = {
            x: this.x,
            y: this.y,
        };
    }

    moveAround(width, height) {
        if (this.isCaptured) {
            this.y *= 1.025;
        } else {
            if (this.x < 10 && !this.isThrown) {
                this.x += this.vx;
            }
            if (this.y < 10 && !this.isThrown) {
                this.x = this.x;
                this.y += this.vy;
            }
            if (this.x > width && !this.isThrown) {
                this.x -= this.vx;
            }
            if (this.y < (height * 2) / 5 && !this.isThrown) {
                this.vx = 1;
                this.vy = 1;
                this.x += Math.random() > 0.5 ? this.vx : -this.vx;
                this.y += Math.random() > 0.5 ? this.vy : -this.vy;
            } else {
                this.x += this.vx;
                this.y -= this.vy;
            }
        }
        if (this.y > height - 10) {
            this.vy = 0;
            this.y = height - 20;
            this.isGrounded = true;
        }
    }
    // ! GET THAT SHIT WORKING
    /* repel(particle) {
        let dx = this.x - particle.x;
        let dy = this.y - particle.y;
        let distance = Math.hypot(dx, dy);
        // If 2 particles are really close
        if (distance < 20) {
            this.vx *= -1;
            this.vy *= -1;
            if (distance < 10) {
                this.color = "red";
                console.log("something's not right");
            }
            return true;
        }
        return false;
    } */

    isParticleClose(particle) {
        let dx = this.x - particle.x;
        let dy = this.y - particle.y;
        let distance = Math.hypot(dx, dy);

        return distance < 50;
    }
    throw(angle) {
        // ! angle problem with the coeff
        // ? seems related to the size of the canvas width
        this.vx = 10 * Math.cos((angle * Math.PI) / 180);
        this.vy = -8 * Math.sin((angle * Math.PI) / 180);
        // console.log(this.vx);
        // console.log(this.vy);
        this.isThrown = true;
        this.isCaptured = false;
        this.isGrounded = false;
        this.isInInventory = false;
        this.isInShooter = false;
    }

    drop() {
        this.isCaptured = true;
    }

    combine(particle1, particle2) {
        if (particle2.constructor.name === "Proton" && particle1.isThrown && !particle1.hasAProton) {
            particle1.vx = 0;
            particle1.vy = 0;
            particle2.electrons.push(particle1);
            particle1.hasAProton = true;
            particle1.isRotating = true;
        }
        this.theta += 0.1;

        this.x = particle2.x + Math.cos(this.theta) * this.t;
        this.y = particle2.y + Math.sin(this.theta) * this.t;
        // this.isRotating = true; // ! prevent particle to rotate when executed
    }
}
