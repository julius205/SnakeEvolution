class ObstacleList {

    constructor() {
        this._obstacles = [];
    }

    addObstacle(obstacle) {
        this._obstacles.push(obstacle);
    }

    removeObstacle(obstacle) {
        const index = this._obstacles.indexOf(obstacle);
        if (index !== -1) {
          this._obstacles.splice(index, 1);
        }
    }

    get obstacles() {
        return this._obstacles;
    }

    set obstacles(obstacles) {
        this._obstacles = obstacles;
    }

}