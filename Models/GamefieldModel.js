class GamefieldModel {
    
    constructor(height, width, rows, cols) {
        this.height = height;
        this.width = width;
        this._rows = rows;
        this._cols = cols;
        this._cellHeight = height/rows;
        this._cellWidth = width/cols;
        this.pickUpList = new PickUpList();
        this.obstacleList = new ObstacleList();
        this.powerUpList = new PowerUpList();
        this._obstaclePlaced = false;
        this._powerUpPlaced = false;
    }

    get cellHeight() {
        return this._cellHeight;
    }

    get cellWidth () {
        return this._cellWidth;
    }

    get rows() {
        return this._rows;
    }

    get cols() {
        return this._cols;
    }

    get obstaclePlaced() {
        return this._obstaclePlaced;
    }

    set obstaclePlaced(obstaclePlaced) {
        this._obstaclePlaced = obstaclePlaced;
    }

    get powerUpPlaced() {
        return this._powerUpPlaced;
    }
    
    set powerUpPlaced (powerUpPlaces) {
        this._powerUpPlaced = powerUpPlaces;
    } 



} 