/**
 * timer logic
 */
export class Timer {
    constructor(duration, display, game) {
        this.duration = duration;
        this.display = display;
        this.isPaused = false;
        this.game = game;
        this.interval = null;
        this.timeIsOut = true;
    }

    startTimer() {
        var timer = this.duration,
            minutes,
            seconds;
        this.interval = setInterval(() => {
            this.timeIsOut = false;
            if (!this.isPaused) {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                this.display.textContent = minutes + ":" + seconds;
                if (--timer < 0) {
                    this.stopTimer();
                    this.game.checkEndGame(this);
                }
            }
        }, 1000);
    }

    stopTimer() {
        this.timeIsOut = true;
        clearInterval(this.interval);
        this.interval = null;
    }

    pauseTimer() {
        this.isPaused = true;
    }

    resumeTimer() {
        this.isPaused = false;
    }
}
