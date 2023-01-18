class PickUpList {

    constructor() {
        this._pickUps = [];
    }

    addPickUp() {
        this._pickUps.push(new PickUpModel());
    }

    addPickUp(pickUp) {
        this._pickUps.push(pickUp);
    }

    removePickUp(pickUp) {
        const index = this._pickUps.indexOf(pickUp);
        if (index !== -1) {
          this._pickUps.splice(index, 1);
        }
    }

    getPickUp(xPos, yPos) {
        for(const pickUp of this._pickUps) {
            if(pickUp.xPos === xPos &&  pickUp.yPos === yPos) {
                return pickUp;
            }
        }
        return null;
    }

    set pickUps (pickUps) {
        this._pickUps = pickUps;
    }

    get pickUps () {
        return this._pickUps;
    }

}