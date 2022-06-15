import Hero from "./modules/Hero";
import Enemy from "./modules/Enemy";
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
    ctx.fillStyle = "rgb(18 18 18 / 50%)";
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

// * Timers
function spawnEnemies() {
    console.log("New enemy spawned");
    const enemyX = Math.random() * -canvas.width;
    const enemyY = Math.random() * -canvas.height + canvas.height;
    const enemyRadius = Math.floor(Math.random() * 25) + 10;
    const enemySpeed = 0.5;
    const enemyAngle = Math.atan2(
        canvas.height / 2 - enemyY,
        canvas.width / 2 - enemyX
    );

    const enemy = new Enemy(
        enemyX,
        enemyY,
        enemySpeed,
        enemyAngle,
        enemyRadius,
        ctx
    );
    enemyArray.push(enemy);

    setTimeout(spawnEnemies, 1000);
}
spawnEnemies();

// * Functions
function manageProjectiles() {
    projectileArray.forEach(projectile => {
        projectile.update();
        projectile.draw();
    });
}

function manageEnemies() {
    enemyArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
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
    manageEnemies();

    // Collision
    requestAnimationFrame(gameLoop);
}
gameLoop();
