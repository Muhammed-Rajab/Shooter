import gsap from "gsap";
import Particle from "./Particle";

export default class ParticleGroup {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.particleArray = [];

        // Explode particle property
        this.particleSize = 2.5;
        this.particleCount = 8;
    }

    getparticlesArray() {
        // Returns particleArray
        return this.particleArray;
    }

    spawnParticle(projectile, enemy) {
        // Spawns new particle with respect to our projectile and pushes them to array to render
        for (let i = 0; i < this.particleCount; i++) {
            const p = new Particle(
                projectile.position.getX(),
                projectile.position.getY(),
                1,
                Math.random() * Math.PI * 2,
                this.particleSize,
                enemy.color,
                this.ctx
            );
            gsap.to(p, {
                alpha: 0,
            });
            this.particleArray.push(p);
        }
    }

    manageParticles() {
        this.particleArray.forEach((particle, idx) => {
            particle.update();
            particle.draw();

            if (particle.alpha <= 0) {
                this.particleArray.splice(idx, 1);
            }
        });
    }
}
