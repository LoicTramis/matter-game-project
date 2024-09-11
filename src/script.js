/* === BUTTON === */
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const quitButton = document.getElementById("quit-button");
/* === SCREENS === */
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");
const overScreen = document.getElementById("over-screen");
/* === HTML ELEMENT === */
const stuffElement = document.getElementById("stuff");

/* === LEVELS === */
const levels = [
    {
        level: 1,
        life: 3,
        nbOfElectrons: 3,
        nbOfProtons: 2,
        nbOfNeutrons: 0,
        goal: "Create Hydrogen",
        won: false,
        loose: false,
    },
    {
        level: 2,
        life: 3,
        nbOfElectrons: 4,
        nbOfProtons: 4,
        nbOfNeutrons: 4,
        goal: "Create Helium",
        won: false,
        loose: false,
    },
];

startButton.addEventListener("click", () => {
    console.log("start click");
    startScreen.style.display = "none";
    gameScreen.style.display = "flex";
    endScreen.style.display = "none";
    overScreen.style.display = "none";

    stuffElement.style.display = "flex";

    loadLevel();
});
quitButton.addEventListener("click", () => {
    console.log("quit click");
    startScreen.style.display = "flex";
    gameScreen.style.display = "none";
    endScreen.style.display = "none";
    overScreen.style.display = "none";

    stuffElement.style.display = "flex";
    levels.forEach((level) => (level.won = false));
});
nextButton.addEventListener("click", () => {
    console.log("next click");
    startScreen.style.display = "none";
    endScreen.style.display = "none";
    gameScreen.style.display = "flex";
    overScreen.style.display = "none";

    stuffElement.style.display = "flex";
    loadLevel();
});

function loadLevel() {
    if (!levels[0].won) {
        loadGame(levels[0]);
    } else if (!levels[1].won) {
        loadGame(levels[1]);
    }
}

function loadGame(level) {
    /* === GET DOM === */
    const canvasElement = document.getElementById("game");
    const statusLevelElement = document.getElementById("status-level");
    const goalElement = document.getElementById("rules-goal");
    const inventoryElement = document.getElementById("stuff");
    const ctx = canvasElement.getContext("2d");

    /* === SET DOM === */
    statusLevelElement.textContent = `Level ${level.level}`;
    goalElement.textContent = `${level.goal}`;

    /* === CANVAS DIMENSION === */
    const canvasWidth = (window.innerWidth * 70) / 100;
    const canvasHeight = (window.innerHeight * 80) / 100;

    /* === PLAYER POSITION === */
    const playerPosition = {
        x: canvasWidth / 2 - 150,
        y: canvasHeight - 50,
    };
    const pressedKeys = {
        ArrowLeft: false,
        ArrowRight: false,
    };

    const game = new Game(canvasElement, canvasWidth, canvasHeight, level);
    const player = new Player(playerPosition.x, playerPosition.y, 5, "#00000000");
    let mouseX, mouseY;

    /* === FOCUS CANVAS === */
    canvasElement.setAttribute("tabindex", 1);
    canvasElement.focus();

    /* ========================================= */
    /* ============ EVENT FUNCTIONS ============ */
    /* ========================================= */
    function displayInventory() {
        inventoryElement.children.length ? inventoryElement.firstChild.remove() : null;

        const inventoryList = document.createElement("ul");
        const inventoryItem = document.createElement("li");

        if (player.particle) {
            inventoryItem.textContent = player.particle.constructor.name;
        }
        inventoryList.appendChild(inventoryItem);
        inventoryElement.appendChild(inventoryList);
    }
    /* === WIN CONDITION === */
    function checkWinCondition() {
        console.log(game.level.won);
        if (game.level.won) {
            gameScreen.style.display = "none";
            stuffElement.style.display = "hidden";
            endScreen.style.display = "flex";
            game.level.won = false;
        }
    }

    function mouseMove(e) {
        const rect = game.canvasElement.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY;
        // raf = window.requestAnimationFrame(animate);
    }

    function keyPress(e) {
        if (e.type === "keydown") {
            e.key === "ArrowLeft" ? (pressedKeys.ArrowLeft = true) : null;
            e.key === "ArrowRight" ? (pressedKeys.ArrowRight = true) : null;
            e.key === " " ? (game.isGravityGun = !game.isGravityGun) : null;
        }
        if (e.type === "keyup") {
            e.key === "ArrowLeft" ? (pressedKeys.ArrowLeft = false) : null;
            e.key === "ArrowRight" ? (pressedKeys.ArrowRight = false) : null;
        }
        if (e.type === "click") {
            game.shootLaser(player, mouseX, mouseY);
            // console.log(game.particles);
        }
        displayInventory();
        checkWinCondition(level);
    }

    game.canvasElement.addEventListener("mousemove", mouseMove);
    game.canvasElement.addEventListener("click", keyPress);
    game.canvasElement.addEventListener("keydown", keyPress);
    game.canvasElement.addEventListener("keyup", keyPress);

    game.generateParticles(level);

    animate();
    function animate() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Drawing logic
        game.drawParticles();
        game.drawLaser(mouseX, mouseY, player);
        game.drawPlayer(player);

        // Particles animation
        game.moveParticles();
        game.pickParticles(player);
        game.combineParticles();

        // Player animation
        player.move(pressedKeys.ArrowLeft, pressedKeys.ArrowRight, canvasWidth);

        // ? game.repelParticles();
        requestAnimationFrame(animate);
    }
}
