class GameStatusView {

    constructor(gameStatus, gameStatusCanvas) {
        this.gameStatus = gameStatus;
        this.gameStatusCanvas = gameStatusCanvas;
        this.pauseImage = document.getElementById("pause-image");
    }

    drawPause() {
        var ctx = gameStatusCanvas.getContext("2d");
        ctx.drawImage(this.pauseImage, gameStatusCanvas.width/2, gameStatusCanvas.height/2, 200, 200);
    }

}