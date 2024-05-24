class Game {
    constructor() {
        const gameScreen = document.getElementById("game");
        const electronElement = document.createElement("div");
        const electron = new Electron(this.gameScreen);
        electronElement.style.position = "absolute";
        electronElement.style.top = `${electron.positionX}px`;
        electronElement.style.left = `${electron.positionY}px`;
        electronElement.style.height = `${electron.height}px`;
        electronElement.style.width = `${electron.width}px`;
        electronElement.style.backgroundColor = `blue`;

        gameScreen.appendChild(electronElement);
    }
}
