window.onload = function () {
    const canvasElement = document.getElementById("game");
    const ctx = canvasElement.getContext("2d");
    const canvasWidth = (window.innerWidth * 70) / 100;
    const canvasHeight = (window.innerHeight * 80) / 100;
    const game = new Game(canvasElement, canvasWidth, canvasHeight);
    let raf, mouseX, mouseY;

    function mouseMove(e) {
        const rect = game.canvasElement.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY;
        // raf = window.requestAnimationFrame(animate);
    }
    game.canvasElement.addEventListener("mousemove", mouseMove);
    game.canvasElement.addEventListener("click", () => console.log(game.particles));

    game.generateParticles();

    animate();
    function animate() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        game.moveParticles();
        game.drawParticles();
        game.draw(mouseX, mouseY);
        raf = requestAnimationFrame(animate);
    }
    // raf = window.requestAnimationFrame(animate);

    /* game.canvasElement.addEventListener("mouseout", (e) => {
        window.cancelAnimationFrame(raf);
    }); */
};
