let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ],
};

let game = new Phaser.Game(config);

game.settings = {
    targetSpeed: 3,
    smallTargetSpeed: 4,
    gameTimer: 60000,
}

game.singleplayer = true;

//reserve some keyboard variables
let keyA, keyW, keyD, keyY, keyU, keyH, keyJ, keyLEFT, keyUP, keyRIGHT, keySPACE;