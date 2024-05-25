window.onload = function () {

    const canvasElement = document.getElementById("game")
    const canvasWidth = window.innerWidth * 80 / 100
    const canvasHeight = window.innerHeight * 80 / 100
    const game = new Game(canvasElement, canvasWidth, canvasHeight)
    let raf

    game.canvasElement.addEventListener("mousemove", (e) => {
        const rect = game.canvasElement.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        raf = window.requestAnimationFrame(() => {
            game.draw(mouseX, mouseY)
        });
    })

    game.canvasElement.addEventListener("mouseout", (e) => {
        window.cancelAnimationFrame(raf);

    })
};
