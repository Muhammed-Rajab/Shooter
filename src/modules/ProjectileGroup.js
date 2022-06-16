import Projectile from "./Projectile";

export default class ProjectileGroup {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.projectileArray = [];
    }
    reset() {
        this.projectileArray = [];
    }
    getProjectilesArray() {
        // Returns the projectileArray
        return this.projectileArray;
    }
    manageProjectiles() {
        // Draws and updates the projectile
        this.projectileArray.forEach(projectile => {
            projectile.update();
            projectile.draw();
        });
    }
    spawnProjectile(mouseX, mouseY) {
        // Event listener callback to generate projectile on mouse click
        const projectileX = this.canvas.width / 2;
        const projectileY = this.canvas.height / 2;

        const angleOfProjectile = Math.atan2(
            mouseY - projectileY,
            mouseX - projectileX
        );

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
