class ObstacleView {

    constructor(canvas, obstacleList) {
        this.canvas = canvas;
        this.obstacleList = obstacleList;
        this.obstacleFireImage = document.getElementById("obstacleFire-image");
    }

    drawObstacle() {
        var ctx = canvas.getContext('2d');
        this.obstacleList.obstacles.forEach(obstacle => {
            ctx.drawImage(this.obstacleFireImage, obstacle.xPos*40, obstacle.yPos*40, 40, 40);
        });
    }


    clearObstacle(obstacle) {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(obstacle.xPos*40, obstacle.yPos*40, 40, 40);
    }
}