class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images/tilesprite
        this.load.image('rocket', "./assets/rocket.png");
        this.load.image('starfield', "./assets/starfield.png");

        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9,
        });

        this.load.spritesheet('target_big1', './assets/target_big1.png', {
            frameWidth: 63,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 1,
        });

        this.load.spritesheet('target_small', './assets/target_small.png', {
            frameWidth: 41,
            frameHeight: 22,
            startFrame: 0,
            endFrame: 1,
        });
    }

    create() {
        //place tile sprites
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        //white rectangle borders
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0,0);

        //green UI background
        this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0,0);

        //add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'rocket').setScale(0.5, 0.5).setOrigin(0,0);

        //add spaceships (x3)
        this.ship01 = new Target(this, game.config.width+192, 132, 'target_big1', 0, 30, true).setOrigin(0,0);
        this.ship02 = new Target(this, game.config.width+96, 196, 'target_small', 0, 20, false).setOrigin(0,0);
        this.ship03 = new Target(this, game.config.width, 260, 'target_big1', 0, 10, true).setOrigin(0,0);

        //define keyboard keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //explosion animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0,
            }),
            frameRate: 30,
        });

        //targets animation config
        this.anims.create({
            key: 'laika',
            frames: this.anims.generateFrameNumbers('target_big1', {
                start: 0,
                end: 1,
                first: 0,
            }),
            frameRate: 4,
            repeat: -1,
        });

        this.anims.create({
            key: 'blink',
            frames: this.anims.generateFrameNumbers('target_small', {
                start: 0, 
                end: 1,
                first: 0,
            }),
            frameRate: 4,
            repeat: -1,
        })

        //animate targets
        this.ship01.anims.play('laika');
        this.ship02.anims.play('blink');
        this.ship03.anims.play('laika');

        //score configuration
        this.p1Score = 0;
        let scoreConfig = {
            fontFamily : 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100,
        }
        this.leftScore = this.add.text(69, 54, this.p1Score, scoreConfig);

        //game over flag
        this.gameOver = false;

        //timer configuration
        scoreConfig.fixedWidth = 0;
        this.timer = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press [F] to Restart\n[<-] for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        //play music
        this.bgm = game.sound.add('bgm_main');
        this.bgm.loop = true;
        this.bgm.play();
    }

    update() {
        //scroll starfield
        this.starfield.tilePositionX -= 4;

        //if game is not over, keep going
        if (!this.gameOver) {
            //update rocket
            this.p1Rocket.update();

            //update spaceships
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        //if game is over, check if restart or return to menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.bgm.stop();
            this.scene.restart(this.p1Score);
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.bgm.stop();
            this.scene.start("menuScene");
        }

        //check if rocket is colliding with spaceships
        if(this.colliding(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.spaceshipKaboom(this.ship01);
        }

        if(this.colliding(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.spaceshipKaboom(this.ship02);
        }

        if(this.colliding(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.spaceshipKaboom(this.ship03);
        }
    }

    colliding(rocket, spaceship) {
        //check if sprites are overlapping
        if (rocket.x < spaceship.x + spaceship.width &&
            rocket.x + rocket.width > spaceship.x &&
            rocket.y < spaceship.y + spaceship.height &&
            rocket.y + rocket.height > spaceship.y) {
                return true;
        } else {
            return false;
        }
    }

    spaceshipKaboom(spaceship) {
        //temporarily hide the ship
        spaceship.alpha = 0;

        let kaboom = this.add.sprite(spaceship.x, spaceship.y, 'explosion').setOrigin(0, 0);
        kaboom.anims.play('explode');

        //once animation completes
        kaboom.on('animationcomplete', () => {
            spaceship.reset(); //reset spaceship position
            spaceship.alpha = 1; //make spaceship visible
            kaboom.destroy(); //remove explosion sprite
        });

        //update score
        this.p1Score += spaceship.points;
        this.leftScore.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }
}