import Particle from "./Particle";

export default class Projectile extends Particle {
    constructor(x, y, magnitude, direction, ctx) {
        super(x, y, magnitude, direction, 5, "white", ctx);
    }
}
