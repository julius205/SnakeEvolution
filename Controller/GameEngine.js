var canvas = document.getElementById("gamefield");
var canvasScore = document.getElementById("canvasScore");
var canvasHitPoints = document.getElementById("canvasHitPoints");
var canvasHighscore = document.getElementById("canvasHighscore");
var canvasGameStatus = document.getElementById("canvasGameStatus");
var startButton = document.getElementById("start");
var restartButton = document.getElementById("restart");
var startAudio = new Audio("Audio/startButtonSound.mp3");


canvasScore.height = 100;
canvasScore.width = 100;

canvasHitPoints.height = 200;
canvasHitPoints.width = 200;

canvasHighscore.height = 200;
canvasHighscore.width = 200;

// canvasGameStatus.height = 800;
// canvasGameStatus.width = 800;


let appField = new GamefieldController(
    gModel = new GamefieldModel(800, 800, 20, 20),
    gView = new GamefieldView(canvas,gModel)

);

let appSnake = new SnakeController(
    scoreModel = new ScoreModel(0),
    scoreView = new ScoreView(canvasHighscore, canvasScore, scoreModel),
    snakeModel = new SnakeModel(5,5,"right"),
    sView = new SnakeView(canvas, snakeModel, scoreModel),
    gModel,
    hitPointView = new HitPointView(canvasHitPoints, snakeModel)
);

// function resizeCanvas() {
//     canvas.width = window.innerWidth;
//     canvas.hidden = window.innerHeight;
// }

// window.addEventListener("resize", resizeCanvas);
// resizeCanvas();

// appField.initGamefield();
// appSnake.placePickUp();
// appSnake.gameloop();

canvasHighscore.addEventListener('load', this.scoreView.drawHighscore(this.scoreModel.highscore));

restartButton.addEventListener('click', () => {
    startAudio.play();
    restartButton.style.display = 'none';
});

startButton.addEventListener('click', () => {

    startAudio.play();
    startButton.style.display = 'none';
});

restartButton.onclick = function() {
    window.location.reload();
}
  
startButton.onclick = function() {
    appSnake.placePickUp();
    appSnake.startGame();
};

appField.initGamefield();

