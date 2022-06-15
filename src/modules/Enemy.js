import Particle from "./Particle";

export default class Enemy extends Particle {
    constructor(x, y, magnitude, direction, radius, ctx) {
        super(
            x,
            y,
            magnitude,
            direction,
            radius,
            `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`,
            ctx
        );
    }
}
