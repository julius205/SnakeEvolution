class GamefieldController {

    constructor (gameFieldModel, gameFieldView) {
        this.gameFieldModel = gameFieldModel;
        this.gameFieldView = gameFieldView;
    }

    initGamefield () {
        this.gameFieldView.drawGamefield();
    }

}