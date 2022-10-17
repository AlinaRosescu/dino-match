export class Timer {
    constructor(duration, display) {
        this.duration = duration;
        this.display = display;
        this.isPaused = false;
    }

    startTimer() {
        var timer = this.duration, minutes, seconds;
        this.interval =  setInterval(() => {
            if (!this.isPaused) {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                this.display.textContent = minutes + ":" + seconds;
                if (--timer < 0) {
                    clearInterval(this.interval);
                }
            }
        }, 1000);
    }

    pauseTimer() {
        this.isPaused = true;
    }

    resumeTimer() {
        this.isPaused = false;
    }
}