import ScoreText from "./ScoreText";

export default class ScoreTextGroup {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.scoreTextArray = [];
    }
    getScoreTextArray() {
        return this.scoreTextArray;
    }
    addScoreText(x, y, score) {
        this.scoreTextArray.push(
            new ScoreText(x, y, `${score}+`, "white", this.ctx)
        );
    }
    manageScoreTexts() {
        this.scoreTextArray.forEach((scoreText, idx) => {
            scoreText.update();
            scoreText.draw();

            if (scoreText.alpha <= 0)
                setTimeout(() => this.scoreTextArray.splice(idx, +1), 0);
        });
    }
}
