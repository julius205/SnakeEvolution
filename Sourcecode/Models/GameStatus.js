class GameStatus {
    constructor() {
        this._gameRunning = true;
        this._gamePaused = false;
    }

    stopGame() {
        this._gameRunning = false;
    }

    pauseGame() {
        this._gamePaused = true;
    }

    resumeGame() {
        this._gamePaused = false;
    }

    set gameRunning(gameRunning) {
        this._gameRunning = gameRunning;
    }

    get gameRunning() {
        return this._gameRunning;
    }

    set gamePaused(gamePaused) {
        this._gamePaused = gamePaused;
    }

    get gamePaused() {
        return this._gamePaused;
    }

}