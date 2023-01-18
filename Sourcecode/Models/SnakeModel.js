class SnakeModel {

    constructor(xPos, yPos, direction) {
        this._segments = [new SnakePart(xPos,yPos)];
        this._direction = direction;
        this._previousDirection = null;
        this._length = this._segments.length;
        this._xPos = xPos;
        this._yPos = yPos;
        this._foodCollected = false;
        this._hitPoints = 3;
        this._isDamagedByObstacle = false;
        this._isUsingPowerUp = false;
    }

    set segments(segments) {
        this._segments = segments;
    }

    get segments() {
        return this._segments;
    }

    set foodCollected(foodCollected) {
        this._foodCollected = foodCollected;
    }

    set direction(direction) {
        this._direction = direction;
    }

    set previousDirection(pDirection) {
        this._previousDirection = pDirection;
    }

    set yPos(yPos) {
        this._yPos = yPos;
    }
    
    set xPos(xPos) {
        this._xPos = xPos;
    }

    set hitPoints(hitPoints) {
        this._hitPoints = hitPoints;
    } 

    set isDamagedByObstacle(isDamagedByObstacle) {
        this._isDamagedByObstacle = isDamagedByObstacle;
    }

    set isUsingPowerUp(isUsingPowerUp) {
        this._isUsingPowerUp = isUsingPowerUp;
    }

    get foodCollected() {
        return this._foodCollected;
    }

    get direction() {
        return this._direction;
    }
    
    get previousDirection() {
        return this._previousDirection;
    }

    get length() {
        return this._length;
    }

    get head() {
        return this._segments[0]; 
    }

    get xPos () {
        return this._xPos;
    }
    
    get yPos () {
        return this._yPos;
    }

    get hitPoints() {
        return this._hitPoints;
    }

    get isDamagedByObstacle() {
        return this._isDamagedByObstacle;
    }

    get isUsingPowerUp() {
        return this._isUsingPowerUp;
    }

    isSegmentInCorner(segment) {
        let prevSegment = this.segments[this.segments.indexOf(segment) - 1];
        let nextSegment = this.segments[this.segments.indexOf(segment) + 1];
      
        // Überprüfe, ob segment Kopf oder Schwanz ist (keine Ecke)
        if (!prevSegment || !nextSegment) return false;
      
        // Überprüfe, ob segment sich in einer horizontalen oder vertikalen Linie befindet (keine Ecke)
        if (prevSegment.xPos === segment.xPos && nextSegment.xPos === segment.xPos) return false; // Horizontale Linie
        if (prevSegment.yPos === segment.yPos && nextSegment.yPos === segment.yPos) return false; // Vertikale Linie
      
        // Wenn keine der Bedingungen zutrifft, befindet sich segment in einer Ecke
        return true;
      }
      

    getCornerDirection(segment) {
        // prevSegment ist das vorherige Segment der Schlange
        let prevSegment = this.segments[this.segments.indexOf(segment) - 1];
        // nextSegment ist das nächste Segment der Schlange
        let nextSegment = this.segments[this.segments.indexOf(segment) + 1];
        
        // Wenn es kein prevSegment oder kein nextSegment gibt, ist das Segment entweder der Kopf oder der Schwanz, also keine Ecke
        if (!prevSegment || !nextSegment) return null;
        
        // Wenn das Segment sich in der horizontalen Linie befindet (x-Position gleich bei prevSegment und nextSegment), ist es keine Ecke
        if (prevSegment.xPos === nextSegment.xPos) return null;
        // Wenn das Segment sich in der vertikalen Linie befindet (y-Position gleich bei prevSegment und nextSegment), ist es keine Ecke
        if (prevSegment.yPos === nextSegment.yPos) return null;
        
        // Wenn das Segment sich in einer Ecke befindet, gib die Richtung als String zurück
        if ((prevSegment.yPos > segment.yPos && nextSegment.xPos > segment.xPos) || (prevSegment.xPos > segment.xPos && nextSegment.yPos > segment.yPos)) return "top-right";
        if ((prevSegment.yPos > segment.yPos && nextSegment.xPos < segment.xPos) || (prevSegment.xPos < segment.xPos && nextSegment.yPos > segment.yPos)) return "top-left";
        if ((prevSegment.yPos < segment.yPos && nextSegment.xPos < segment.xPos) || (prevSegment.xPos < segment.xPos && nextSegment.yPos < segment.yPos)) return "bottom-left";
        if ((prevSegment.yPos < segment.yPos && nextSegment.xPos > segment.xPos) || (prevSegment.xPos > segment.xPos && nextSegment.yPos < segment.yPos)) return "bottom-right";

        
        // Wenn keine der Bedingungen zutrifft, ist das Segment null
        else return null;
    }
      
    getTailDirection() {
        if (this.segments.length < 2) {
          return null;
        }
        let secondToLastSegment = this.segments[this.segments.length - 2];
        let lastSegment = this.segments[this.segments.length - 1];
        if (secondToLastSegment.xPos > lastSegment.xPos) {
          return "right";
        } else if (secondToLastSegment.xPos < lastSegment.xPos) {
          return "left";
        } else if (secondToLastSegment.yPos > lastSegment.yPos) {
          return "down";
        } else if (secondToLastSegment.yPos < lastSegment.yPos) {
          return "up";
        }
    }

    getHitpointsSubstracted() {
        this.hitPoints = this.hitPoints - 1;
    }

    resetSnake() {
        
    }
      
      
      
      
      

}