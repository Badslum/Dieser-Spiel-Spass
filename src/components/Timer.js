class Timer {
    constructor(duration, onEnd) {
        this.duration = duration;
        this.onEnd = onEnd;
        this.timeLeft = duration;
    }

    start() {
        this.interval = setInterval(() => {
            this.timeLeft--;
            UI.updateTimer(this.timeLeft);

            if (this.timeLeft <= 0) {
                clearInterval(this.interval);
                this.onEnd();
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
    }
}

export default Timer;