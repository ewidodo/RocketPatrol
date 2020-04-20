class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9,
        });
    }

    create() {
        //place tile sprites
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        //rectangle borders
        this.add.rectangle(5, 5, 630, 32, 0x717171).setOrigin(0,0);
        this.add.rectangle(5, 443, 630, 32, 0x717171).setOrigin(0,0);
        this.add.rectangle(5, 5, 32, 101, 0x717171).setOrigin(0,0);
        this.add.rectangle(603, 5, 32, 101, 0x717171).setOrigin(0,0);
        this.add.rectangle(5, 400, 32, 60, 0x717171).setOrigin(0,0);
        this.add.rectangle(603, 400, 32, 60, 0x717171).setOrigin(0,0);
        this.add.rectangle(5, 106, 32, 296, 0x3C3C3C).setOrigin(0,0);
        this.add.rectangle(603, 106, 32, 296, 0x3C3C3C).setOrigin(0,0);

        //green UI background
        this.add.rectangle(37, 37, 566, 69, 0xC7C7C7).setOrigin(0,0);

        //add pods
        if (!game.singleplayer) {
            this.p1Rocket = new Rocket(this, game.config.width/3, 431, 'pod1', 0, 1).setScale(0.5, 0.5).setOrigin(0,0);
            this.p2Rocket = new Rocket(this, (2*game.config.width)/3, 431, 'pod2', 0, 2).setScale(0.5, 0.5).setOrigin(0,0);
        } else {
            this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'pod1', 0, 1).setScale(0.5, 0.5).setOrigin(0,0);
        }

        //add targets (x4)
        this.ship01 = new Target(this, game.config.width, 260, 'target_big1', 0, 10, true).setOrigin(0,0);
        this.ship02 = new Target(this, game.config.width+96, 196, 'target_big2', 0, 20, true).setOrigin(0, 0);
        this.ship03 = new Target(this, game.config.width+192, 132, 'target_big3', 0, 30, true).setOrigin(0,0);
        this.ship04 = new Target(this, game.config.width+400, 169, 'target_small', 0, 35, false).setOrigin(0,0);

        //define keyboard keys
        //player1 controls
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); //player 1 move left
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); //player 1 move right
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); //player 1 shoot

        //player 2 controls
        if (!game.singleplayer) {
            keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); //player 2 move left
            keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); //player 2 move right
            keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP); //player 2 shoot
        }

        //misc. controls
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J); //replay game
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); //return to menu

        //--------------------------
        //explosion animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0,
            }),
            frameRate: 24,
        });

        //-------------------------
        //animate targets & players
        this.p1Rocket.anims.play('player1');
        if (!game.singleplayer) {
            this.p2Rocket.anims.play('player2');
        }

        this.ship01.anims.play('mason');
        this.ship02.anims.play('laika');
        this.ship03.anims.play('hachi');
        this.ship04.anims.play('blink');

        //---------------------------
        //score & clock configuration
        this.p1Score = 0;
        if (!game.singeplayer) {
            this.p2Score = 0;
        }
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
        this.leftScore = this.add.text(69, 51, this.p1Score, scoreConfig);
        if (!game.singleplayer) {
            scoreConfig.backgroundColor = '#78B9F4';
            scoreConfig.color = '#13416B';
            this.rightScore = this.add.text(471, 51, this.p2Score, scoreConfig);
        }

        scoreConfig.backgroundColor = null;
        scoreConfig.color = '#717171';
        scoreConfig.align = 'center';
        this.timer = this.add.text(game.config.width/2, 64, '', scoreConfig).setOrigin(0.5);

        //--------------
        //game over flag
        this.gameOver = false;

        //timer configuration
        scoreConfig.fixedWidth = 0;
        this.countdown = this.time.delayedCall(game.settings.gameTimer, () => {
            scoreConfig.backgroundColor = '#717171';
            scoreConfig.color = '#B7B7B7';
            scoreConfig.align = 'center';

            this.add.text(game.config.width/2, game.config.height/2 - 50, 'GAME OVER', scoreConfig).setOrigin(0.5);

            if (!game.singleplayer) {
                if (this.p1Score > this.p2Score) {
                    scoreConfig.color = '#F3B141';
                    this.add.text(game.config.width/2, game.config.height/2, 'PLAYER 1 WINS!', scoreConfig).setOrigin(0.5);
                    scoreConfig.color = '#B7B7B7';
                }

                if (this.p1Score == this.p2Score) {
                    this.add.text(game.config.width/2, game.config.height/2, 'IT\'S A DRAW!', scoreConfig).setOrigin(0.5);
                }

                if (this.p1Score < this.p2Score) {
                    scoreConfig.color = '#78B9F4';
                    this.add.text(game.config.width/2, game.config.height/2, 'PLAYER 2 WINS!', scoreConfig).setOrigin(0.5);
                    scoreConfig.color = '#B7B7B7';
                }
            }

            this.add.text(game.config.width/2, game.config.height/2 + 64, '[J] RESTART\n[SPACE] MENU ', scoreConfig).setOrigin(0.5);

            this.gameOver = true;
        }, null, this);

        //----------
        //play music
        this.bgm = game.sound.add('bgm_main');
        this.bgm.loop = true;
        this.bgm.play();
    }

    update() {
        //----------------
        //scroll starfield
        this.starfield.tilePositionX -= 4;

        //-------------------------------
        //if game is not over, keep going
        if (!this.gameOver) {
            //update rocket
            this.p1Rocket.update();
            if (!game.singleplayer) {
                this.p2Rocket.update();
            }

            //update spaceships
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();

            //update clock
            this.timer.setText((game.settings.gameTimer/1000)-Math.floor(this.countdown.getElapsedSeconds()));
        }

        //---------------------------------------------------
        //if game is over, check if restart or return to menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyJ)) {
            this.bgm.stop();
            this.scene.restart(this.p1Score, this.p2Score);
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.bgm.stop();
            this.scene.start("menuScene");
        }

        //--------------------------------------------
        //check if rocket is colliding with spaceships
        if (this.colliding(this.p1Rocket, this.ship01) && !this.ship01.isHit) {
            this.p1Rocket.reset();
            this.spaceshipKaboom(this.ship01, 1);
        }

        if (this.colliding(this.p1Rocket, this.ship02) && !this.ship02.isHit) {
            this.p1Rocket.reset();
            this.spaceshipKaboom(this.ship02, 1);
        }

        if (this.colliding(this.p1Rocket, this.ship03) && !this.ship03.isHit) {
            this.p1Rocket.reset();
            this.spaceshipKaboom(this.ship03, 1);
        }

        if (this.colliding(this.p1Rocket, this.ship04) && !this.ship04.isHit) {
            this.p1Rocket.reset();
            this.spaceshipKaboom(this.ship04, 1);
        }

        if (!game.singleplayer) {
            if (this.colliding(this.p2Rocket, this.ship01) && !this.ship01.isHit) {
                this.p2Rocket.reset();
                this.spaceshipKaboom(this.ship01, 2);
            }

            if (this.colliding(this.p2Rocket, this.ship02) && !this.ship02.isHit) {
                this.p2Rocket.reset();
                this.spaceshipKaboom(this.ship02, 2);
            }

            if (this.colliding(this.p2Rocket, this.ship03) && !this.ship03.isHit) {
                this.p2Rocket.reset();
                this.spaceshipKaboom(this.ship03, 2);
            }

            if (this.colliding(this.p2Rocket, this.ship04) && !this.ship04.isHit) {
                this.p2Rocket.reset();
                this.spaceshipKaboom(this.ship04, 2);
            }
        }
    }

    //check if player collides with targets
    colliding(player, target) {
        //check if sprites are overlapping
        if (player.x < target.x + target.width &&
            player.x + player.width > target.x &&
            player.y < target.y + target.height &&
            player.y + player.height > target.y) {
                return true;
        } else {
            return false;
        }
    }

    spaceshipKaboom(spaceship, playerNum) {
        //temporarily hide the ship
        spaceship.alpha = 0;
        spaceship.isHit = true; //prevent ship from being hit so that players can't hit same ship

        let kaboom = this.add.sprite(spaceship.x, spaceship.y, 'explosion').setOrigin(0, 0);
        kaboom.anims.play('explode');

        //once animation completes
        kaboom.on('animationcomplete', () => {
            spaceship.reset(); //reset spaceship position
            spaceship.alpha = 1; //make spaceship visible
            kaboom.destroy(); //remove explosion sprite
            spaceship.isHit = false; //allow ship to be hit again
        });

        //update score
        if (playerNum == 1) {
            this.p1Score += spaceship.points;
            this.leftScore.text = this.p1Score;
            this.sound.play('sfx_explosion');
        } else {
            this.p2Score += spaceship.points;
            this.rightScore.text = this.p2Score;
            this.sound.play('sfx_explosion');
        }
    }
}