import Hero from "./modules/Hero";
import EnemyGroup from "./modules/EnemyGroup";
import ParticleGroup from "./modules/ParticleGroup";
import ProjectileGroup from "./modules/ProjectileGroup";
import { clearCanvas, updateCanvasDimension } from "./modules/utils";

/*----------------- Code Starts Here ------------------*/
class App {
    constructor() {
        // * Elements
        this.scoreText = document.querySelector(".score");
        // * Canvas Setup
        this.canvas = document.querySelector("#canvas");
        this.ctx = canvas.getContext("2d");
        updateCanvasDimension(this.canvas);

        // * Objects
        this.hero = new Hero(
            this.canvas.width / 2,
            this.canvas.height / 2,
            25,
            this.ctx
        );

        this.projectileGroup = new ProjectileGroup(this.canvas, this.ctx);

        this.enemyGroup = new EnemyGroup(this.canvas, this.ctx);

        this.particleGroup = new ParticleGroup(this.canvas, this.ctx);
        // * Starts the enemy spawning loop
        this.enemyGroup.spawnNewEnemies();

        // * Initialize Eventlisteners
        this.#eventListenersInitialization();

        // * Game configs and properties
        this.animationFrameRequestId = undefined;
        this.scoreObj = { score: 0 };
        this.hitScore = 40;
    }
    #updateScore() {
        this.scoreText.innerHTML = `Score: ${this.scoreObj.score}`;
    }

    #eventListenersInitialization() {
        /* Initializes Event listeners */

        // Shoots projectile on click to a specific direction
        this.canvas.addEventListener("click", e =>
            this.projectileGroup.spawnProjectile(e.clientX, e.clientY)
        );
    }
    gameEnded() {
        // Sets the hitScore to 0 and makes the hero explode while showing the end screen with score
        this.hitScore = 0;
    }

    run() {
        /* Method to start game loop */
        this.#loop();
    }

    #loop() {
        // Storing animationRequestId for stoping loop
        this.animationFrameRequestId = requestAnimationFrame(
            this.#loop.bind(this)
        );

        // Clearing canvas
        clearCanvas(this.canvas, this.ctx);

        // Drawing and updating hero
        this.hero.draw();
        this.hero.update();

        // Managing Groups
        this.projectileGroup.manageProjectiles();
        this.enemyGroup.manageEnemies(
            this.hero,
            this.projectileGroup.getProjectilesArray(),
            this.particleGroup,
            this.scoreObj,
            this.hitScore,
            this.gameEnded.bind(this)
        );
        this.particleGroup.manageParticles();

        // Update score
        this.#updateScore();
    }
}

const game = new App();

// Starts the game loop
game.run();
