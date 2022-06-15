import Vector from "./Vector";

export default class Particle {
    constructor(x, y, magnitude, direction, radius, color, ctx) {
        // Particle properties
        this.position = new Vector(x, y);
        this.radius = radius;
        this.color = color;
        this.ctx = ctx;
        this.velocity = new Vector(0, 0);
        this.velocity.setLength(magnitude ?? 0);
        this.velocity.setAngleRad(direction ?? 0);
    }

    draw() {
        // Draws a circle
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
        // Updates the position by adding a velocity to it
        this.position.addTo(this.velocity);
    }
}
