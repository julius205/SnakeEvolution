class PowerUpView {

    constructor(canvas, powerUpList) {
        this.canvas = canvas;
        this.powerUpList = powerUpList;
        this.powerUpImage = document.getElementById("powerUpFlash-image");
    }

    drawPowerUp () {
        var ctx = canvas.getContext("2d");
        this.powerUpList.powerUps.forEach(powerUp => {
            ctx.drawImage(this.powerUpImage, powerUp.xPos*40, powerUp.yPos*40, 40, 40);
        });
    }

    clearPowerUp(powerUp) {
        var ctx = canvas.getContext("2d");
        ctx.clearRect(powerUp.xPos*40, powerUp.yPos*40, 40, 40);
    }

}