import gsap from "gsap";
import Vector from "./Vector";

export default class ScoreText {
    constructor(x, y, score, color, ctx) {
        this.score = score;
        this.color = color;
        this.ctx = ctx;
        this.position = new Vector(x, y);
        this.alpha = 1;
        this.fontSize = 0;
        // gsap.to(this.position, {
        //     setY_: this.position.getY() + 20,
        // });
        // gsap.fromTo(
        //     this.position,
        //     { setY_: this.position.getY() },
        //     { setY_: this.position.getY() + 20 }
        // );

        gsap.to(this, {
            fontSize: 36,
            alpha: 0,
            duration: 1,
        });
    }
    draw() {
        this.ctx.save();
        this.ctx.globalAlpha = this.alpha;
        this.ctx.font = `normal normal 600 ${this.fontSize}px Montserrat`;
        this.ctx.fillStyle = this.color;
        this.ctx.textAlign = "center";
        this.ctx.fillText(
            this.score,
            this.position.getX(),
            this.position.getY()
        );
        this.ctx.restore();
    }
    update() {
        // this.position.addTo(new Vector(0, -1));
    }
}
