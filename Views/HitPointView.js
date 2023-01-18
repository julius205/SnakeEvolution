class HitPointView {

    constructor(canvasHitPoints, snakeModel) {
        this.canvasHitPoints = canvasHitPoints;
        this.snakeModel = snakeModel;
        this.hitPointImage = document.getElementById("hitPointHeart-image");
    }

    drawHitPoints() {
        var ctx = this.canvasHitPoints.getContext('2d');
        if(this.snakeModel.hitPoints > 0) {
            let increment = 0;
            for (let index = 0; index < this.snakeModel.hitPoints; index++, increment+=60) {
                ctx.drawImage(this.hitPointImage,increment,100, 50, 50);
            }
            this.clearHitPoints(increment);
        }
        else {
            this.clearAllHitPoints();
        }
    }

    clearHitPoints(increment) {
        var ctx = this.canvasHitPoints.getContext('2d');
        ctx.clearRect(increment, 100, 50, 50);
    }

    clearAllHitPoints() {
        var ctx = this.canvasHitPoints.getContext('2d');
        ctx.clearRect(0, 0, this.canvasHitPoints.width, this.canvasHitPoints.height);
    }

}