class GamefieldView {

    constructor(canvas, gamefield) {
        this.canvas = canvas;
        this.gamefield = gamefield;

    }

    drawGamefield() {
        var ctx = this.canvas.getContext("2d");
        this.canvas.height = this.gamefield.height;
        this.canvas.width = this.gamefield.width;
        // for (var i = 0; i<this.canvas.width; i+=this.gamefield.cellHeight) {
        //     ctx.moveTo(i, 0);
        //     ctx.lineTo(i, this.canvas.width);
        //     ctx.stroke();
        //     ctx.moveTo(0, i);
        //     ctx.lineTo(this.canvas.height, i);
        //     ctx.stroke();
        // }
    }



}