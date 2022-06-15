export default class UI {
    constructor() {
        this.startScreen = document.querySelector(".start-screen");
        this.endScreen = document.querySelector(".end-screen");
        this.endBestScore = document.querySelector(".end-best-score");
        this.endCurrentScore = document.querySelector(".end-current-score");
    }
    getHighScore() {
        const highScore = localStorage.getItem("high-score");
        if (highScore === null) {
            localStorage.setItem("high-score", 0);
        } else {
            return +highScore;
        }
    }
    hideStartScreen() {
        this.startScreen.style.display = "none";
    }
    hideEndScreen() {
        this.endScreen.style.display = "none";
    }

    showStartScreen() {
        this.startScreen.style.display = "flex";
    }
    showEndScreen(newScore) {
        this.#setEndScores(newScore);
        this.endScreen.style.display = "flex";
    }
    #setEndScores(newScore) {
        const highScore = this.getHighScore();
        const beatHighScore = highScore < newScore;
        if (beatHighScore) localStorage.setItem("high-score", newScore);
        this.endBestScore.innerHTML = `🏆Best Score: ${
            beatHighScore ? newScore : highScore
        }`;
        this.endCurrentScore.innerHTML = `👍New Score: ${newScore}`;
    }
}
