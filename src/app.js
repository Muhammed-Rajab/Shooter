import Hero from "./modules/Hero";
import Particle from "./modules/Particle";
import Vector from "./modules/Vector";

// * Canvas Setup
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// * Helper functions
const updateCanvasDimension = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
updateCanvasDimension();
const clearCanvas = () => {
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

/*
 * ----------------- Code Starts Here ------------------
 */

// * Variables
const hero = new Hero(50, 50, 25, ctx);

// * Functions

// * Game loop
function gameLoop() {
    // Clearing
    clearCanvas();

    // Drawing
    hero.draw();

    // Updating

    // Collision
    requestAnimationFrame(gameLoop);
}
gameLoop();
