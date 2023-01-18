class SnakePart {

    constructor(xPos, yPos) {

        this._xPos = xPos;
        this._yPos = yPos;
    }

    set xPos(xPos) {
        this._xPos = xPos;
    }

    set yPos(yPos) {
        this._yPos = yPos;
    }

    get xPos () {
        return this._xPos;
    }

    get yPos () {
        return this._yPos;
    }
}
