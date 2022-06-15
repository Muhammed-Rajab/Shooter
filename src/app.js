import Hero from "./modules/Hero";
import ProjectileGroup from "./modules/ProjectileGroup";
import EnemyGroup from "./modules/EnemyGroup";
import { clearCanvas, updateCanvasDimension } from "./modules/utils";

/*----------------- Code Starts Here ------------------*/
class App {
    constructor() {
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
        this.enemyGroup.spawnNewEnemies();

        // * Initialize Eventlisteners
        this.#eventListenersInitialization();

        // * Game configs and properties
        this.animationFrameRequestId = undefined;
    }
    #eventListenersInitialization() {
        // * Event listeners
        this.canvas.addEventListener("click", e =>
            this.projectileGroup.spawnProjectile(e.clientX, e.clientY)
        );
    }
    run() {
        this._loop();
    }
    _loop() {
        this.animationFrameRequestId = requestAnimationFrame(
            this._loop.bind(this)
        );

        // Clearing
        clearCanvas(this.canvas, this.ctx);

        // Drawing
        this.hero.draw();

        // Updating
        this.hero.update();

        // Managing Groups
        this.projectileGroup.manageProjectiles();
        this.enemyGroup.manageEnemies(
            this.hero,
            this.projectileGroup.getProjectilesArray(),
            this.animationFrameRequestId
        );
    }
}

const game = new App();
game.run();
