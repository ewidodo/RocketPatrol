//Rocket Pawtrol - a Rocket Patrol mod by Enrico Widodo
//all art (except starfield) by Enrico Widodo
//music + sfx by Enrico Widodo

//----------------
//Points breakdown

// 1. Add your own(copyright-free) background music to the Play scene (10)
// 2. Allow the player to control the Rocket after it's fired (10)
// 3. Display the time remaining (in seconds) on the screen (15) 
// 4. Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (25)
// 5. Create new artwork for all of the in-game assets (rockets, spaceships, explosion) (25)
// 6. Implement a simultaneous two-player mode (50)

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