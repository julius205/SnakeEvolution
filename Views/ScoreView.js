class ScoreView{

    constructor(canvasHighscore ,canvasScore, scoreModel){
        this.canvasHighscore = canvasHighscore;
        this.canvasScore = canvasScore;
        this.scoreModel = scoreModel;
    }

    drawScore() {
        var ctx = canvasScore.getContext("2d");
        ctx.fillStyle = "yellow";
        ctx.font = "50px NeonLedLight";
        ctx.fillText(this.scoreModel.score, 40, 60); 
        
    }

    clearScore() {
        var ctx = canvasScore.getContext("2d");
        ctx.clearRect(0, 0, canvasScore.height, canvasScore.width); 
    }

    drawHighscore(score) {
        var ctx = this.canvasHighscore.getContext("2d");
        ctx.fillStyle = "yellow";
        ctx.font = "50px NeonLedLight";
        ctx.clearRect(0,0,200,200);
        ctx.fillText(score, 0, 60); 
    }
    
}