class Electron extends Particle {
    constructor(x, y, color, imageSrc) {
        // x, y, life, angle, speed, size, color
        super(x, y, null, null, null, null, color);
        this.height = 10;
        this.width = 10;

        this.charge = -1;
        this.mass = 0;

        this.electronElement = document.createElement("div");
        this.electronElement.src = imageSrc;

        this.electronElement.style.height = `${this.height}px`;
        this.electronElement.style.width = `${this.width}px`;
        this.electronElement.style.backgroundColor = `blue`;

        // gameScreen.appendChild(this.electronElement);
    }
}
