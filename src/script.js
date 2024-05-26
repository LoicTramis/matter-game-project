window.onload = function () {

    const canvasElement = document.getElementById("game")
    const canvasWidth = window.innerWidth * 70 / 100
    const canvasHeight = window.innerHeight * 80 / 100
    const game = new Game(canvasElement, canvasWidth, canvasHeight)
    let raf
    game.generateParticles();
    console.log(game.particles)


    // Generate snow of electron
    game.canvasElement.addEventListener("mousemove", (e) => {
        const rect = game.canvasElement.getBoundingClientRect();
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY;

        raf = window.requestAnimationFrame(() => {
            game.draw(mouseX, mouseY)
        });

    })
    game.canvasElement.addEventListener("click", (e) => {
        console.log("click")
    })

    game.canvasElement.addEventListener("mouseout", (e) => {
        window.cancelAnimationFrame(raf);

    })
};
