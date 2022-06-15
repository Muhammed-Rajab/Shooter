import Particle from "./Particle";

import gsap from "gsap";

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
        this.shrinkVal = 5;
    }

    shrink() {
        // Shrinks the radius if the condition is true
        if (this.radius - this.shrinkVal > this.shrinkVal)
            // this.radius -= this.shrinkVal;
            gsap.to(this, {
                radius: this.radius - this.shrinkVal,
            });
    }
}
