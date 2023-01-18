class PowerUpModel {
    
    constructor () {
        this._xPos = this.randomPosition();
        this._yPos = this.randomPosition();
        this._duration = this.randomDuration();
    }

    randomDuration() {
      let minDuration = 5000;
      let maxDuration = 10000;
      let randomDuration = (Math.random()*(maxDuration-minDuration))+minDuration;
      return randomDuration;
    }

    randomPosition() {
      return Math.floor(Math.random()*19);
    }

    set xPos(xPos) {
        this._xPos = xPos;
    }

    get xPos() {
        return this._xPos;
    }
    
    set yPos(yPos) {
        this._yPos = yPos;
    }

    get yPos() {
        return this._yPos;
    }
    
    set duration(duration) {
        this._duration = duration;
    }

    get duration() {
        return this._duration;
    }


}