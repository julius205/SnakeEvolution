class PickUpModel {

    constructor() {
        this._xPos = this.random();
        this._yPos = this.random();
        this._isGolden = this.randomPickUpType();
        this._isValid = true;
    }

    random() {
        return Math.floor(Math.random()*19);
    }

    randomPickUpType() {
        const randomNumber = Math.random();
        if (randomNumber < 0.2) {
          return true;
        } else {
          return false;
        }
      }

    isPickUpGolden() {
        return this._isGolden;
    }
      

    set isGolden (isGolden) {
        this._isGolden = isGolden;
    }

    set xPos(xPos) {
        this._xPos = xPos;
    }

    set yPos(yPos) {
        this._yPos = yPos;
    }

    set isValid(isValid) {
        this._isValid = isValid;
    }

    get isGolden () {
        return this._isGolden;
    }

    get xPos () {
        return this._xPos;
    }

    get yPos () {
        return this._yPos;
    }

    get isValid () {
        return this._isValid;
    }


}