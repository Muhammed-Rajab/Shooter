import Vector from "./Vector";

export default class Particle {
    constructor(x, y, magnitude, direction, radius, color, ctx) {
        this.position = new Vector(x, y);
        this.radius = radius;
        this.color = color;
        this.ctx = ctx;
        this.velocity = new Vector(0, 0);
        this.velocity.setLength(magnitude ?? 0);
        this.velocity.setAngleRad(direction ?? 0);
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(
            this.position.getX(),
            this.position.getY(),
            this.radius,
            0,
            Math.PI * 2,
            false
        );
        this.ctx.fill();
    }

    update() {
        this.position.addTo(this.velocity);
    }
}
