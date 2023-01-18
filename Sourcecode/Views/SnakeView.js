class SnakeView {

    constructor(canvas, snake, score) {
        this.snake = snake;
        this.canvas = canvas;
        this.score = score;
        this.headUpImage = document.getElementById("snakeHeadUp-image");
        this.headDownImage = document.getElementById("snakeHeadDown-image");
        this.headLeftImage = document.getElementById("snakeHeadLeft-image");
        this.headRightImage = document.getElementById("snakeHeadRight-image");
        this.bodyImage = document.getElementById("snakeBody-image");
        this.bodyImageHorizontal = document.getElementById("snakeBodyHorizontal-image");
        this.bodyCornerTRImage = document.getElementById("bodyCornerTR-image");
        this.bodyCornerTLImage = document.getElementById("bodyCornerTL-image");
        this.bodyCornerBRImage = document.getElementById("bodyCornerBR-image");
        this.bodyCornerBLImage = document.getElementById("bodyCornerBL-image");
        this.tailUpImage = document.getElementById("tailUp-image");
        this.tailRightImage = document.getElementById("tailRight-image");
        this.tailDownImage = document.getElementById("tailDown-image");
        this.tailLeftImage = document.getElementById("tailLeft-image");
        this.restartButton = document.getElementById("restart");
    }

    drawSnake() {
        let image;
        let tail = this.snake.segments[this.snake.segments.length - 1];
        var ctx = canvas.getContext("2d");
        if(this.snake.segments.length<2){
            ctx.clearRect(this.canvas.width/2, this.canvas.height/2,45,-45);
        }
        this.snake.segments.forEach((part, index) => {
    
            //Zeichne den Kopf
            if(part == this.snake.head) {
                 switch(this.snake.direction) {
                     case "up": image = this.headUpImage; break;
                     case "right": image = this.headRightImage; break;
                     case "down": image = this.headDownImage; break;
                     case "left": image = this.headLeftImage;
                 }

            } 
            else {
                //Zeichne den Körper wie gewohnt
                let prevPart = this.snake.segments[index - 1];
                if(part.xPos > prevPart.xPos) {
                        //Teil bewegt sich nach rechts
                    image = this.bodyImageHorizontal;
                } 
                else if(part.xPos < prevPart.xPos) {
                    //Teil bewegt sich nach links
                    image = this.bodyImageHorizontal;
                }
                else if(part.yPos > prevPart.yPos) {
                    //Teil bewegt sich nach unten
                    image = this.bodyImage;
                }
                else if(part.yPos < prevPart.yPos) {
                    // Teil bewegt sich nach oben
                    image = this.bodyImage;
                }

                //Zeichne die Ecken der Schlange
                if (this.snake.isSegmentInCorner(part)) {
                    // Teil befindet sich in einer Ecke
                    let cornerDirection = this.snake.getCornerDirection(part);
                    switch(cornerDirection) {
                        case "top-right": image = this.bodyCornerTLImage; break;
                        case "top-left": image = this.bodyCornerTRImage; break;
                        case "bottom-right": image = this.bodyCornerBLImage; break;
                        case "bottom-left": image = this.bodyCornerBRImage;
                    }
                }

                //Zeichne den Schwanz der Schlange
                if(part == tail) {
                    let tailDirection = this.snake.getTailDirection();
                    if (tailDirection) {
                      // Zeichne den Schwanz mit dem richtigen Bild
                      switch(tailDirection) {
                        case "up": image = this.tailUpImage; break;
                        case "right": image = this.tailRightImage; break;
                        case "down": image = this.tailDownImage; break;
                        case "left": image = this.tailLeftImage;
                      }
                    }
                }
            }   
            ctx.drawImage(image,part.xPos*40, part.yPos*40,40,40);
        });
        
        
    }

    drawGameOver () {
        this.clearCanvas();
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "blue";
        ctx.font = "45px Arial";
        ctx.fillText("Game Over", this.canvas.width/2-100, this.canvas.height/2-100);
        //console.log(this.score.score)
        ctx.fillText("Score: " + this.score.score, this.canvas.width/2-100, this.canvas.height/2-45);
        this.restartButton.style.display = "block";
    }

    drawStartGame (second) {
        var ctx = canvas.getContext("2d");
        ctx.clearRect(this.canvas.width/2, this.canvas.height/2,45,-45);
        ctx.fillStyle = "blue";
        ctx.font = "45px Arial";
        if(second >= 0){
            ctx.fillText(second, this.canvas.width/2, this.canvas.height/2);
        } 
    }

    clearSnakeParts () {
        var ctx = canvas.getContext("2d");
        this.snake.segments.forEach(part => {
            ctx.clearRect(part.xPos*40, part.yPos*40, 40, 40);
        });
    }

    clearCanvas() {
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    }

}