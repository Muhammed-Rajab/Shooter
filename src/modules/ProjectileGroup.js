import Projectile from "./Projectile";

export default class ProjectileGroup {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.projectileArray = [];
    }
    getProjectilesArray() {
        return this.projectileArray;
    }
    manageProjectiles() {
        this.projectileArray.forEach(projectile => {
            projectile.update();
            projectile.draw();
        });
    }
    spawnProjectile(mouseX, mouseY) {
        const projectileX = this.canvas.width / 2;
        const projectileY = this.canvas.height / 2;

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
            this.ctx
        );
        this.projectileArray.push(projectile);
    }
}
