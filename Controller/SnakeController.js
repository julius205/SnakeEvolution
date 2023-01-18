var canvas = document.getElementById("gamefield");

class SnakeController {

    constructor(scoreModel, scoreView, snakeModel, snakeView, gamefieldModel, hitPointView) {
        this.snakeModel = snakeModel;
        this.snakeView = snakeView;
        this.gamefieldModel = gamefieldModel;
        this.pickUpView = new PickUpView(snakeView.canvas, gamefieldModel.pickUpList);
        this.obstacleView = new ObstacleView(snakeView.canvas, gamefieldModel.obstacleList);
        this.powerUpView = new PowerUpView(snakeView.canvas, gamefieldModel.powerUpList);
        this.scoreModel = scoreModel;
        this.scoreView = scoreView;
        this.gameStatus = new GameStatus();
        this.gameInterval = 0;
        this.obstacleSpawnInterval = 0;
        this.powerUpSpawnInterval = 0;
        this.isSpawnPaused = false;
        this.hitPointView = hitPointView;
        this.startSeconds = 4;
        this.lastTime = 0;
        this.maxFPS = 8;
        
    }

    handleKey (e) {

        if (e.keyCode == 37) {
            this.changeDirection("left");
        }
        if (e.keyCode == 38) {
            this.changeDirection("up");
        }
        if (e.keyCode == 39) {
            this.changeDirection("right");
        }
        if (e.keyCode == 40) {
            this.changeDirection("down");
        }
        if (e.keyCode == 32) {
            this.togglePause();
        }

    }


    changeDirection(newDirection) {
        // Aktuelle Richtung der Schlange
        let currentDirection = this.snakeModel.direction;
      
        // Verhindern, dass sich die Schlange in die entgegengesetzte Richtung bewegt
        if (newDirection === "up" && currentDirection === "down") {
          // Keine Änderung der Richtung
        } else if (newDirection === "down" && currentDirection === "up") {
          // Keine Änderung der Richtung
        } else if (newDirection === "left" && currentDirection === "right") {
          // Keine Änderung der Richtung
        } else if (newDirection === "right" && currentDirection === "left") {
          // Keine Änderung der Richtung
        } else {
          // Ändern der Richtung
          this.snakeModel.direction = newDirection;
        }
      }
      

    moveSnake () {
        
        this.updateSnake();
        this.shiftSnake();
 
        let currentDirection = this.snakeModel.direction;

        if(currentDirection == "right") {
            this.snakeModel.head.xPos++;
        }
        if(currentDirection =="left") {
            this.snakeModel.head.xPos--;
        }
        if(currentDirection =="up") {
            this.snakeModel.head.yPos--;
        }
        
        if(currentDirection =="down") {
            this.snakeModel.head.yPos++;
        }
        this.gameOver();

    }

    update(timestamp) {
        if (this.gameStatus.gameRunning) {
          if(timestamp - this.lastTime >= 1000 / this.maxFPS) {
            this.snakeView.clearSnakeParts();
            this.collectPickUp();
            this.moveSnake();
            this.snakeView.drawSnake();
            this.updateSnakeHitpoints();
            this.applyPowerUpToSnake();
            this.lastTime = timestamp;
          }
          this.gameInterval = requestAnimationFrame(this.update.bind(this));
        }
      
      

        // this.snakeView.clearSnakeParts();
        // this.collectPickUp();
        // this.moveSnake();
        // console.log(this.snakeModel.segments[0]);
        // this.snakeView.drawSnake();
        // this.updateSnakeHitpoints();
        // requestAnimationFrame(this.update.bind(this));
    }


    placePickUp () {

        let pickUp = new PickUpModel();
        if(!this.isPickUpIsValid(pickUp)) {
            this.placePickUp();
        } else {      
            this.gamefieldModel.pickUpList.addPickUp(pickUp);
            this.pickUpView.drawPickUp();
        }
        console.log(pickUp.isValid);
            
    }

    isPickUpIsValid(pickUp) {
        pickUp.isValid = true;
        this.checkIfPickUpCollidesWithSnakeBeforeSpawn(pickUp);
        this.checkIfPickUpCollidesWithObstacleOrPowerUp(pickUp);
        return pickUp.isValid;
    }

    checkIfPickUpCollidesWithSnakeBeforeSpawn(pickUp) {
        this.snakeModel.segments.forEach(segment => {
            if(this.collides(pickUp, segment) && segment !== this.snakeModel.head) {
                pickUp.isValid = false;
            }
        });
    }

    checkIfPickUpCollidesWithObstacleOrPowerUp(pickUp) {
        this.gamefieldModel.obstacleList.obstacles.forEach(obstacle => {
            this.gamefieldModel.powerUpList.powerUps.forEach(powerUp => {
                if(obstacle || powerUp) {
                    if(this.collides(pickUp, obstacle) || this.collides(pickUp, powerUp)) {
                        pickUp.isValid = false;
                    }
                }
            });
        });
    }

    
    collectPickUp() {
        let pickUp = this.pickUpThatCollidesWithSnakeHead();
        if (pickUp) {
          this.gamefieldModel.pickUpList.removePickUp(pickUp);
          this.snakeModel.foodCollected = true;
          this.scoreView.clearScore();
          if (pickUp.isPickUpGolden()) {
            this.updateScore(3);
          } 
          else {
            this.updateScore(1);
          }
          this.placePickUp();
        }
      }

    collides(obj1, obj2) {
        return obj1.xPos == obj2.xPos && obj1.yPos == obj2.yPos;
    }

    pickUpThatCollidesWithSnakeHead() {
        let output;
        this.gamefieldModel.pickUpList.pickUps.forEach(pickUp => {
            if(this.collides(this.snakeModel.head, pickUp)) {
                output = pickUp;
            }
        });
        return output;
        
    }
     
    placeObstacle(obstacle) {
        this.gamefieldModel.obstacleList.addObstacle(obstacle);
    }

    obstacleThatIsValid() {
        let obstacle = new ObstacleModel();
        while (this.doesObstacleCollideWithSnakeOrPickUp(obstacle)) {
            obstacle = new ObstacleModel();
        }
        return obstacle;
    }

    doesObstacleCollideWithSnakeOrPickUp(obstacle) {
        let collides = false;
        this.snakeModel.segments.forEach(segment => {
            this.gamefieldModel.pickUpList.pickUps.forEach(pickUp => {
                if(this.collides(obstacle, segment) || this.collides(obstacle, pickUp)) {
                    collides = true;
                }
            }); 
        });
        return collides;
    }

    snakeHitsObstacle() {
        this.gamefieldModel.obstacleList.obstacles.forEach(obstacle => {
            if(this.collides(obstacle, this.snakeModel.head)) {
                this.snakeModel.isDamagedByObstacle = true;
            }
        });
    }

    updateSnakeHitpoints() {
        this.snakeHitsObstacle();
        this.hitPointView.drawHitPoints();
        if(this.snakeModel.isDamagedByObstacle) {
            this.snakeModel.getHitpointsSubstracted();
        }
        this.snakeModel.isDamagedByObstacle = false;
    }

    startObstacleSpawner() {
        // prüfe, ob bereits ein Hindernis platziert wurde
        if (!this.gamefieldModel.obstaclePlaced) {
            if(!this.isSpawnPaused) {   
                // generiere zufällige Zeit für Hinderniserstellung
                this.obstacleSpawnInterval = setTimeout(() => {
                    // erstelle neues Hindernis
                    let obstacle = this.obstacleThatIsValid();
                    this.placeObstacle(obstacle);
                    // zeichne Hindernis
                    this.obstacleView.drawObstacle();
                    // setze flag obstaclePlaced auf true
                    this.gamefieldModel.obstaclePlaced = true;
                    // setze timer für Entfernen des Hindernisses
                    this.obstacleSpawnInterval = setTimeout(() => {
                    this.gamefieldModel.obstacleList.removeObstacle(obstacle);
                    this.obstacleView.clearObstacle(obstacle);
                    //this.obstacleView.clearObstacle(obstacle);
                    // setze flag obstaclePlaced auf false
                    this.gamefieldModel.obstaclePlaced = false;
                    // rufe Methode erneut auf
                    this.startObstacleSpawner();
                    }, obstacle.duration);
                }, this.getRandomObstacleDelay());
            }
        }
    }

    snakeGetsInContactWithPowerUp() {
        this.gamefieldModel.powerUpList.powerUps.forEach(powerUp => {
            if(this.collides(this.snakeModel.head, powerUp)) {
                this.snakeModel.isUsingPowerUp = true;
            }
        });
    }

    applyPowerUpToSnake() {
        this.snakeGetsInContactWithPowerUp();
        const originalMaxFPS = this.maxFPS;
        if(this.snakeModel.isUsingPowerUp) {
            console.log("PowerUp: Boost");
            this.maxFPS = 15;
            setTimeout(() => {
                this.maxFPS = originalMaxFPS;
            }, 3000);
        }
        this.snakeModel.isUsingPowerUp = false;
    }

    


    

    getRandomObstacleDelay() {
        return Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
    }

    placePowerUp(powerUp) {
        this.gamefieldModel.powerUpList.addPowerUp(powerUp);
    }

    powerUpThatIsValid() {
        let powerUp = new PowerUpModel();
        while (this.doesPowerUpCollideWithSnakeOrPickUpOrObstacle(powerUp)) {
            powerUp = PowerUpModel();
        }
        return powerUp;
    }

    doesPowerUpCollideWithSnakeOrPickUpOrObstacle(powerUp) {
        let collides = false;
        this.snakeModel.segments.forEach(segment => {
            this.gamefieldModel.pickUpList.pickUps.forEach(pickUp => {
                this.gamefieldModel.obstacleList.obstacles.forEach(obstacle => {
                    if(this.collides(powerUp, segment) || 
                       this.collides(powerUp, pickUp) || 
                       this.collides(powerUp, obstacle)) {
                        collides = true;
                    }
                });
            }); 
        });
        return collides;
    }

    startPowerUpSpawner() {
        // prüfe, ob bereits ein PowerUp platziert wurde
        if (!this.gamefieldModel.powerUpPlaced) {
            if (!this.isSpawnPaused) {
                // generiere zufällige Zeit für PowerUp-Erstellung
                this.powerUpSpawnInterval = setTimeout(() => {
                    // erstelle neues PowerUp
                    let powerUp = this.powerUpThatIsValid();
                    this.placePowerUp(powerUp);
                    // zeichne PowerUp
                    console.log("Neuer Blitz");
                    this.powerUpView.drawPowerUp();
                    // setze flag powerUpPlaced auf true
                    this.gamefieldModel.powerUpPlaced = true;
                    // setze timer für Entfernen des PowerUps
                    this.powerUpSpawnInterval = setTimeout(() => {
                    this.gamefieldModel.powerUpList.removePowerUp(powerUp);
                    this.powerUpView.clearPowerUp(powerUp);
                    // setze flag powerUpPlaced auf false
                    this.gamefieldModel.powerUpPlaced = false;
                    // rufe Methode erneut auf
                    this.startPowerUpSpawner();
                    }, powerUp.duration);
                }, this.getRandomPowerUpDelay());
            }
        }
    }
    
    getRandomPowerUpDelay() {
        return Math.floor(Math.random() * (30000 - 20000 + 1) + 20000);
    }

    shiftSnake() {
        for (let i = this.snakeModel.segments.length - 1; i > 0; i--) {
            const part = this.snakeModel.segments[i];
            const lastPart = this.snakeModel.segments[i - 1];
            part.xPos = lastPart.xPos;
            part.yPos = lastPart.yPos;
            
        }
    }

    updateSnake () {
        if(this.snakeModel.foodCollected) {
            this.snakeModel.segments.push(new SnakePart(this.snakeModel.head.xPos, this.snakeModel.head.yPos));
            
        }
        this.snakeModel.foodCollected = false;

    }


    snakeCollidesWithItself () {
        return this.snakeModel.segments.some((segment, index) => {
            return index > 0 && this.collides(this.snakeModel.segments[0], segment);
        });
    }

    snakeCollidesWithGameFieldBorder() {
        //console.log(this.snakeModel.head.xPos);
        if(this.snakeModel.head.xPos < 0 ||
           this.snakeModel.head.xPos > this.gamefieldModel.cols-1 ||
           this.snakeModel.head.yPos < 0 ||
           this.snakeModel.head.yPos > this.gamefieldModel.rows-1) {
            return true;
        }
        return false;

    }

    gameOver () {
        if(this.snakeCollidesWithItself() || this.snakeCollidesWithGameFieldBorder() || this.snakeModel.hitPoints == 0) {
            this.endGame();
        }
    }

    endGame () {
        this.gameStatus.stopGame();
        cancelAnimationFrame(this.gameInterval);
        clearInterval(this.obstacleSpawnInterval);
        clearInterval(this.powerUpSpawnInterval);
        this.snakeView.drawGameOver();
    }

    togglePause() {
        if (this.gameStatus.gameRunning && !this.gameStatus.gamePaused) {
            this.gameStatus.pauseGame();
            cancelAnimationFrame(this.gameInterval);
            this.pauseSpawn();
        } else if (this.gameStatus.gamePaused) {
            this.gameStatus.resumeGame();
            this.gameInterval = requestAnimationFrame(this.update.bind(this));
            this.resumeSpawn();
        }
    }

    pauseSpawn() {
        this.isSpawnPaused = true;
        clearInterval(this.obstacleSpawnInterval);
        clearInterval(this.powerUpSpawnInterval);
    }
    
    resumeSpawn() {
        this.isSpawnPaused = false;
        this.startObstacleSpawner();
        this.startPowerUpSpawner();
    }

    resetGame() {
        this.scoreModel = new ScoreModel(0);
        this.scoreView = new ScoreView(canvasHighscore, canvasScore, this.scoreModel);
        this.snakeModel = new SnakeModel(5,5,"right");
        this.sView = new SnakeView(canvas, this.snakeModel, this.scoreModel);
        this.gModel = new GamefieldModel();
        this.hitPointView = new HitPointView(canvasHitPoints, this.snakeModel);
        this.startGame();
        }

    
    gameloop() {
        if (this.gameStatus.gameRunning) {
            document.addEventListener("keydown", (e) => this.handleKey(e));
            this.startPowerUpSpawner();
            this.startObstacleSpawner();
            this.update();
        }
    }
    
    saveHighscore(){
        //localStorage.removeItem("highscore");
        if(this.scoreModel.isNewHighscore()){
            localStorage.setItem("highscore", this.scoreModel.score);
            this.scoreView.drawHighscore(this.scoreModel.score);
        }else
        {
            localStorage.setItem("highscore", this.scoreModel.highscore);
        }
    }

    updateScore(zaehler) {
        this.scoreModel.score = this.scoreModel.score + zaehler; 
        this.scoreView.drawScore();
        this.saveHighscore();
    }

    startGame() {
        console.log("Game Start");
         setTimeout(() => {
            this.startSeconds--;
            this.snakeView.drawStartGame(this.startSeconds);
            if (this.startSeconds > 0) {
                this.startGame();
            }
            else{
                this.gameloop();
            }
          }, 1000)
    
    }

}
