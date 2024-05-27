window.onload = function () {
    const canvasElement = document.getElementById("game");
    const ctx = canvasElement.getContext("2d");
    const canvasWidth = (window.innerWidth * 70) / 100;
    const canvasHeight = (window.innerHeight * 80) / 100;

    const game = new Game(canvasElement, canvasWidth, canvasHeight);

    const player = new Player(canvasWidth / 2 - 10, canvasHeight - 30, 5, "green");
    let raf, mouseX, mouseY;

    canvasElement.setAttribute("tabindex", 1);
    canvasElement.focus();

    function mouseMove(e) {
        const rect = game.canvasElement.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY;
        // raf = window.requestAnimationFrame(animate);
    }

    function keyPress(e) {
        if (e.type === "keydown") {
            e.keyCode === 37 ? player.move(true, false) : null;
            e.keyCode === 39 ? player.move(false, true) : null;
            e.keyCode === 32 ? (game.isGravityGun = !game.isGravityGun) : null;
        }
        if (e.type === "keyup") {
            e.keyCode === 37 ? player.move(false, false) : null;
            e.keyCode === 39 ? player.move(false, false) : null;
        }
    }

    game.canvasElement.addEventListener("mousemove", mouseMove);
    game.canvasElement.addEventListener("click", () => console.log(game.particles));
    game.canvasElement.addEventListener("keydown", keyPress);
    game.canvasElement.addEventListener("keyup", keyPress);

    game.generateParticles();

    animate();
    function animate() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        game.moveParticles();
        game.drawParticles();
        game.drawLaser(mouseX, mouseY);
        game.drawPlayer(player);
        raf = requestAnimationFrame(animate);
    }
    // raf = window.requestAnimationFrame(animate);

    /* game.canvasElement.addEventListener("mouseout", (e) => {
        window.cancelAnimationFrame(raf);
    }); */
};
