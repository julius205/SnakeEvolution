class PowerUpList {

    constructor () {
        this._powerUps = [];
    }

    addPowerUp(powerUp) {
        this._powerUps.push(powerUp);
    }

    removePowerUp(powerUp) {
        const index = this._powerUps.indexOf(powerUp);
        if (index !== -1) {
          this._powerUps.splice(index, 1);
        }
    }

    get powerUps() {
        return this._powerUps;
    }

    set powerUps(powerUps) {
        this._powerUps = powerUps;
    }


}