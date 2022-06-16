import UI from "./modules/UI";
import Hero from "./modules/Hero";
import EnemyGroup from "./modules/EnemyGroup";
import ParticleGroup from "./modules/ParticleGroup";
import ScoreTextGroup from "./modules/ScoreTextGroup";
import ProjectileGroup from "./modules/ProjectileGroup";
import { clearCanvas, updateCanvasDimension } from "./modules/utils";

/*----------------- Code Starts Here ------------------*/
class App {
    constructor() {
        // * UI Handler
        this.ui = new UI();

        // * Elements
        this.restartBtn = document.querySelector(".restart-game-btn");
        this.homeEndButton = document.querySelector(".home-game-btn");
        this.homeScoreButton = document.querySelector(".home-score-btn");

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

        this.scoreTextGroup = new ScoreTextGroup(this.canvas, this.ctx);

        // * Initialize Eventlisteners
        this.#eventListenersInitialization();

        // * Game configs and properties
        this.animationFrameRequestId = undefined;
        this.scoreObj = { score: 0 };
        this.hitScore = 40;
    }
    #reset() {
        this.scoreObj.score = 0;
        this.hitScore = 40;
        this.projectileGroup.reset();
        this.particleGroup.reset();
        this.enemyGroup.reset();
        this.ui.updateScore(0);
    }
    #eventListenersInitialization() {
        /* Initializes Event listeners */

        // Shoots projectile on click to a specific direction
        this.canvas.addEventListener("click", e =>
            this.projectileGroup.spawnProjectile(e.clientX, e.clientY)
        );
        document
            .querySelector(".start-game-btn")
            .addEventListener("click", e => {
                this.ui.hideStartScreen();
                this.run();
            });
        this.restartBtn.addEventListener("click", () => {
            this.#reset();
            this.enemyGroup.spawnNewEnemies();
            this.ui.hideEndScreen();
        });
        this.homeEndButton.addEventListener("click", () => {
            cancelAnimationFrame(this.animationFrameRequestId);
            this.#reset();
            this.ui.hideEndScreen();
            this.ui.showStartScreen();
        });
        this.homeScoreButton.addEventListener("click", () => {
            cancelAnimationFrame(this.animationFrameRequestId);
            this.#reset();
            this.ui.showStartScreen();
        });
    }
    gameEnded() {
        // Sets the hitScore to 0 and makes the hero explode while showing the end screen with score
        this.hitScore = 0;
        this.ui.showEndScreen(this.scoreObj.score);
    }

    run() {
        /* Method to start game loop */

        // * Starts the enemy spawning loop
        this.enemyGroup.spawnNewEnemies();
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
            this.gameEnded.bind(this),
            this.scoreTextGroup
        );
        this.particleGroup.manageParticles();
        this.scoreTextGroup.manageScoreTexts();

        // Update score
        this.ui.updateScore(this.scoreObj.score);
    }
}

const game = new App();

// Starts the game loop
// game.run();
