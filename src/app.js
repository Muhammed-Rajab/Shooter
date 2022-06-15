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

    const enemyRadius = Math.floor(Math.random() * (30 - 5) + 5);

    let enemyX, enemyY;

    if (Math.random() < 0.5) {
        enemyX =
            Math.random() < 0.5 ? 0 - enemyRadius : canvas.width + enemyRadius;
        enemyY = Math.random() * canvas.height;
    } else {
        enemyX = Math.random() * canvas.width;
        enemyY =
            Math.random() < 0.5 ? 0 - enemyRadius : canvas.height + enemyRadius;
    }

    const enemySpeed = 0.15;
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
    enemyArray.forEach((enemy, enemyIdx) => {
        enemy.update();
        enemy.draw();
        projectileArray.forEach((projectile, projectileIdx) => {
            const dist = Math.hypot(
                projectile.position.getX() - enemy.position.getX(),
                projectile.position.getY() - enemy.position.getY()
            );
            // console.log(dist);
            if (dist - projectile.radius - enemy.radius < 1) {
                console.log("Hit");
                setTimeout(() => {
                    enemyArray.splice(enemyIdx, 1);
                    projectileArray.splice(projectileIdx, 1);
                }, 0);
            }
        });
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
