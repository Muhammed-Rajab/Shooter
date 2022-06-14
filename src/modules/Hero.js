import Particle from "./Particle";

export default class Player extends Particle {
    constructor(x, y, radius, ctx) {
        super(x, y, radius, "white", ctx);
    }
}
