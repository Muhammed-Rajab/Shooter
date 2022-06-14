import Vector from "./Vector";

export default class Particle {
    constructor(x, y, radius, color, ctx) {
        this.position = new Vector(x, y);
        this.radius = radius;
        this.color = color;
        this.ctx = ctx;
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
}
