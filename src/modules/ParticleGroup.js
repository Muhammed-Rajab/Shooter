import gsap from "gsap";
import Particle from "./Particle";
import Vector from "./Vector";

export default class ParticleGroup {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.particleArray = [];

        // Explode particle property
        this.minParticleSize = 0.5;
        this.maxParticleSize = 3.5;
        this.minParticleCount = 1;
        this.maxParticleCount = 5;
        this.minParticleMagnitude = 0.5;
        this.maxParticleMagnitude = 3;
    }

    getparticlesArray() {
        // Returns particleArray
        return this.particleArray;
    }

    spawnParticle(projectile, enemy) {
        // Spawns new particle with respect to our projectile and pushes them to array to render
        for (
            let i = 0;
            i <
            Math.floor(
                Math.random() *
                    (this.maxParticleCount - this.minParticleCount) +
                    this.minParticleCount
            ) *
                enemy.radius;
            i++
        ) {
            const p = new Particle(
                projectile.position.getX(),
                projectile.position.getY(),
                Math.floor(
                    Math.random() *
                        (this.maxParticleMagnitude -
                            this.minParticleMagnitude) +
                        this.minParticleMagnitude
                ),
                Math.random() * Math.PI * 2,
                Math.floor(
                    Math.random() *
                        (this.maxParticleSize - this.minParticleSize) +
                        this.minParticleSize
                ),
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
