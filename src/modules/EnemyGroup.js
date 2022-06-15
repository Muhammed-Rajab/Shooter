import Enemy from "./Enemy";

export default class EnemyGroup {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.enemyArray = [];
    }
    getEnemiesArray() {
        return this.enemyArray;
    }
    spawnNewEnemies() {
        console.log("New enemy spawned");

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
        const dist = Math.hypot(
            hero.position.getX() - enemy.position.getX(),
            hero.position.getY() - enemy.position.getY()
        );
        return dist - hero.radius - enemy.radius < 1;
    }
    _projectileHitsEnemy(projectile, enemy) {
        const dist = Math.hypot(
            projectile.position.getX() - enemy.position.getX(),
            projectile.position.getY() - enemy.position.getY()
        );
        return dist - projectile.radius - enemy.radius < 1;
    }
    manageEnemies(hero, projectilesArray, animationFrameRequestId) {
        this.enemyArray.forEach((enemy, enemyIdx) => {
            enemy.update();
            enemy.draw();

            if (this._enemyHitsHero(hero, enemy)) {
                console.log("Hit the player");
                cancelAnimationFrame(animationFrameRequestId);
            }

            projectilesArray.forEach((projectile, projectileIdx) => {
                if (this._projectileHitsEnemy(projectile, enemy)) {
                    console.log("Hit");
                    setTimeout(() => {
                        this.enemyArray.splice(enemyIdx, 1);
                        projectilesArray.splice(projectileIdx, 1);
                    }, 0);
                }
            });
        });
    }
}
