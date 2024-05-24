class Electron {
    constructor(gameScreen, imageSrc) {
        this.height = 10;
        this.width = 10;
        this.positionX = 20;
        this.positionY = 80;

        this.charge = -1;
        this.mass = 0;

        this.electronElement = document.createElement("div");
        this.electronElement.src = imageSrc;

        this.electronElement.style.position = "absolute";
        this.electronElement.style.top = `${this.electron.positionX}px`;
        this.electronElement.style.left = `${this.electron.positionY}px`;
        this.electronElement.style.height = `${this.electron.height}px`;
        this.electronElement.style.width = `${this.electron.width}px`;
        this.electronElement.style.backgroundColor = `blue`;

        this.gameScreen.appendChild(this.electronElement);
    }
}
