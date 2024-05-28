window.onload = function () {
    const canvasElement = document.getElementById("game");
    const inventoryElement = document.getElementById("stuff");
    const ctx = canvasElement.getContext("2d");

    /* === CANVAS DIMENSION === */
    const canvasWidth = (window.innerWidth * 70) / 100;
    const canvasHeight = (window.innerHeight * 80) / 100;

    /* === PLAYER POSITION === */
    const playerPosition = {
        x: canvasWidth / 2 - 10,
        y: canvasHeight - 30,
    };
    const pressedKeys = {
        ArrowLeft: false,
        ArrowRight: false,
        Click: false,
    };

    const game = new Game(canvasElement, canvasWidth, canvasHeight);

    const player = new Player(playerPosition.x, playerPosition.y, 5, "green");
    let raf, mouseX, mouseY;

    /* === FOCUS CANVAS === */
    canvasElement.setAttribute("tabindex", 1);
    canvasElement.focus();

    function displayInventory() {
        inventoryElement.children.length ? inventoryElement.firstChild.remove() : null;
        const inventoryList = document.createElement("ul");
        player.inventory.forEach((particle) => {
            const inventoryItem = document.createElement("li");
            inventoryItem.textContent = particle.constructor.name;
            inventoryList.appendChild(inventoryItem);
        });
        inventoryElement.appendChild(inventoryList);
    }

    function mouseMove(e) {
        const rect = game.canvasElement.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY;
        // raf = window.requestAnimationFrame(animate);
    }

    function pullTrigger() {
        pressedKeys.Click = true;
    }

    function keyPress(e) {
        if (e.type === "keydown") {
            e.keyCode === 37 ? (pressedKeys.ArrowLeft = true) : null;
            e.keyCode === 39 ? (pressedKeys.ArrowRight = true) : null;
            e.keyCode === 32 ? (game.isGravityGun = !game.isGravityGun) : null;
        }
        if (e.type === "keyup") {
            e.keyCode === 37 ? (pressedKeys.ArrowLeft = false) : null;
            e.keyCode === 39 ? (pressedKeys.ArrowRight = false) : null;
        }
        displayInventory();
    }

    game.canvasElement.addEventListener("mousemove", mouseMove);
    game.canvasElement.addEventListener("click", pullTrigger);
    game.canvasElement.addEventListener("keydown", keyPress);
    game.canvasElement.addEventListener("keyup", keyPress);

    game.generateParticles();

    animate();
    function animate() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Drawing logic
        game.drawParticles();
        game.drawLaser(mouseX, mouseY, player);
        game.drawPlayer(player);

        // Animation logic
        game.moveParticles();
        game.pickParticles(player);

        game.shootLaser(player, pressedKeys.Click);
        pressedKeys.Click = false;
        // Player animation
        player.move(pressedKeys.ArrowLeft, pressedKeys.ArrowRight);

        // ? game.repelParticles();
        raf = requestAnimationFrame(animate);
    }
    // raf = window.requestAnimationFrame(animate);

    /* game.canvasElement.addEventListener("mouseout", (e) => {
        window.cancelAnimationFrame(raf);
    }); */
};
