import Enemy from "./Enemy";

export default class EnemyGroup {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.enemyArray = [];
    }
    getEnemiesArray() {
        // Returns enemyArray
        return this.enemyArray;
    }
    spawnNewEnemies() {
        // A loop to spawn enemy every 1000 milliseconds
        const enemyRadius = Math.floor(Math.random() * (30 - 5) + 5);

        let enemyX, enemyY;

        if (Math.random() < 0.5) {
            enemyX =
                Math.random() < 0.5
                    ? 0 - enemyRadius
                    : canvas.width + enemyRadius;
            enemyY = Math.random() * canvas.height;
        } else {
            enemyX = Math.random() * canvas.width;
            enemyY =
                Math.random() < 0.5
                    ? 0 - enemyRadius
                    : canvas.height + enemyRadius;
        }

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
            this.ctx
        );
        this.enemyArray.push(enemy);

        setTimeout(this.spawnNewEnemies.bind(this), 1000);
    }
    _enemyHitsHero(hero, enemy) {
        // Checks if the enemy hits the hero
        const dist = Math.hypot(
            hero.position.getX() - enemy.position.getX(),
            hero.position.getY() - enemy.position.getY()
        );
        return dist - hero.radius - enemy.radius < 1;
    }
    _projectileHitsEnemy(projectile, enemy) {
        // Checks if the projectile hits the enemy
        const dist = Math.hypot(
            projectile.position.getX() - enemy.position.getX(),
            projectile.position.getY() - enemy.position.getY()
        );
        return dist - projectile.radius - enemy.radius < 1;
    }
    manageEnemies(hero, projectilesArray, animationFrameRequestId) {
        // Manage the enemies collision, shrinking and interaction with othehr  particles

        this.enemyArray.forEach((enemy, enemyIdx) => {
            // Draws enemy
            enemy.update();
            enemy.draw();

            // Exits the loop if an enemy hits the hero
            if (this._enemyHitsHero(hero, enemy)) {
                console.log("Hit the player");
                cancelAnimationFrame(animationFrameRequestId);
            }

            projectilesArray.forEach((projectile, projectileIdx) => {
                // If a projectile hits the enemy, then shrink the size of the enemy if it's big enough, else just remove the enemy from the array for next frame (using setTimeOut)
                if (this._projectileHitsEnemy(projectile, enemy)) {
                    enemy.shrink();
                    if (enemy.radius - enemy.shrinkVal <= enemy.shrinkVal) {
                        setTimeout(() => {
                            this.enemyArray.splice(enemyIdx, 1);
                            projectilesArray.splice(projectileIdx, 1);
                        }, 0);
                    } else {
                        setTimeout(() => {
                            projectilesArray.splice(projectileIdx, 1);
                        }, 0);
                    }
                }
            });
        });
    }
}
