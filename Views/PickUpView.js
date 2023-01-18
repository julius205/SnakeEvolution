class PickUpView {

    constructor (canvas, pickUpList) {
        this.canvas = canvas;
        this.pickUpList = pickUpList;
        this.pickUpGoldenImage = document.getElementById('pickUpGolden-image');
        this.pickUpImage = document.getElementById('pickUp-image');
    }

    drawPickUp() {
        var ctx = canvas.getContext("2d");
        this.pickUpList.pickUps.forEach(pickUp => {
          //console.log("In der Liste:" + this.pickUpList.pickUps[0].xPos + " " +this.pickUpList.pickUps[0].yPos);
          let image;
          if (pickUp.isPickUpGolden()) {
            image = this.pickUpGoldenImage;
          } else {
            image = this.pickUpImage;
          }
      
          if (image.complete) {
            // Das Bild ist vollständig geladen, also kann es gezeichnet werden
            ctx.drawImage(image, pickUp.xPos * 40, pickUp.yPos * 40, 40, 40);
          } else {
            // Das Bild ist noch nicht vollständig geladen, also muss der Aufruf von drawImage wiederholt werden, bis das Bild geladen wurde
            requestAnimationFrame(() => {
              this.drawPickUp();
            });
          }
        });
      }
      


}