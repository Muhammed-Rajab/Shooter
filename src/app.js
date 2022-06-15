import Hero from "./modules/Hero";
import Vector from "./modules/Vector";
import Particle from "./modules/Particle";
import Projectile from "./modules/Projectile";

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
    ctx.fillStyle = "rgb(18 18 18 / 30%)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

/*
 * ----------------- Code Starts Here ------------------
 */

// * Variables
const hero = new Hero(canvas.width / 2, canvas.height / 2, 25, ctx);
const projectileArray = [];
const enemyArray = [];

// * Event listeners
canvas.addEventListener("click", e => {
    const { clientX: mouseX, clientY: mouseY } = e;

    const projectileX = canvas.width / 2;
    const projectileY = canvas.height / 2;

    const angleOfProjectile = Math.atan2(
        mouseY - projectileY,
        mouseX - projectileX
    );
    console.log(angleOfProjectile * (180 / Math.PI));
    const projectile = new Projectile(
        projectileX,
        projectileY,
        3,
        angleOfProjectile,
        ctx
    );
    projectileArray.push(projectile);
});

// * Functions
function manageProjectiles() {
    projectileArray.forEach(projectile => {
        projectile.update();
        projectile.draw();
    });
}

// * Game loop
function gameLoop() {
    // Clearing
    clearCanvas();

    // Drawing
    hero.draw();

    // Updating
    hero.update();

    // Drawing and Updating
    manageProjectiles();

    // Collision
    requestAnimationFrame(gameLoop);
}
gameLoop();
