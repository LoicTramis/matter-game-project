window.onload = function () {
  const canvasElement = document.getElementById("game");
  const inventoryElement = document.getElementById("stuff");
  const ctx = canvasElement.getContext("2d");

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

  const game = new Game(canvasElement, canvasWidth, canvasHeight);

  // Transparent square
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
  }

  game.canvasElement.addEventListener("mousemove", mouseMove);

  game.canvasElement.addEventListener("click", keyPress);
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

    // Particles animation
    game.moveParticles();
    game.pickParticles(player);
    game.combineParticles();

    // Player animation
    player.move(pressedKeys.ArrowLeft, pressedKeys.ArrowRight, canvasWidth);

    // ? game.repelParticles();
    requestAnimationFrame(animate);
  }
};
