class ScoreModel{

    constructor(score){
        this._score = score;
        this._highscore = localStorage.getItem("highscore");
    }

    set score(score){
        this._score = score;
    }

    set highscore(highscore){
        this._highscore = highscore;
    }

    get score(){
        return this._score;
    }

    get highscore(){
        return this._highscore;
    }

    isNewHighscore(){
        if (this.score > this._highscore){
            return true;
        }
        else{
            return false;
        }
    }

    resetScore() {
        this._score = 0;
    }

}