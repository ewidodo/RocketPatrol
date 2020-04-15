class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //load images
        this.load.image('a', './assets/key_a.png');
        this.load.image('d', './assets/key_d.png');
        this.load.image('w', './assets/key_w.png');
        this.load.image('left', './assets/key_left.png');
        this.load.image('right', './assets/key_right.png');
        this.load.image('up', './assets/key_up.png');

        this.load.image('starfield', './assets/starfield.png');

        //-----------
        //load sounds
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');

        this.load.audio('bgm_main', './assets/bgm.wav');

        //------------
        //load sprites
        this.load.spritesheet('pod1', './assets/pod1.png', {
            frameWidth: 32,
            frameHeight: 16,
            startFrame: 0,
            endFrame: 1,
        });

        this.load.spritesheet('pod2', './assets/pod2.png', {
            frameWidth: 32,
            frameHeight: 16,
            startFrame: 0,
            endFrame: 1,
        });
    }

    create() {
        /*
        //menu display
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
        }

        //show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpace = 64;

        this.add.text(centerX, centerY - textSpace, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, '[<-] [->] to move\n[F] to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000000';
        this.add.text(centerX, centerY + textSpace, 'Press [<-] for Easy, [->] for Hard', menuConfig).setOrigin(0.5);
        */

        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        //------------------------
        //players animation config
        this.anims.create({
            key: 'player1',
            frames: this.anims.generateFrameNumbers('pod1', {
                start: 0,
                end: 1,
                first: 0,
            }),
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: 'player2',
            frames: this.anims.generateFrameNumbers('pod2', {
                start: 0,
                end: 1,
                first: 0,
            }),
            frameRate: 8,
            repeat: -1,
        });

        //load instructions
        this.p1 = this.add.sprite(16, 32, 'pod1').setOrigin(0, 0);
        this.tile_a = this.add.image(16, 60, 'a').setOrigin(0, 0);
        this.tile_d = this.add.image(16, 104, 'd').setOrigin(0, 0);
        this.tile_w = this.add.image(16, 148, 'w').setOrigin(0, 0);

        this.p2 = this.add.sprite(60, 32, 'pod2').setOrigin(0, 0);
        this.tile_left = this.add.image(60, 60, 'left').setOrigin(0, 0);
        this.tile_right = this.add.image(60, 104, 'right').setOrigin(0, 0);
        this.tile_up = this.add.image(60, 148, 'up').setOrigin(0, 0);

        this.p1.anims.play('player1');
        this.p2.anims.play('player2');

        let instructionConfig = {
            fontFamily: 'Courier',
            fontSize: '18px',
            backgroundColor: null,
            color: '#00FF00',
            align: 'left',
        }

        this.add.text(this.tile_left.x + this.tile_left.width + 12, this.tile_left.y + 7, 'Move left', instructionConfig).setOrigin(0, 0);
        this.add.text(this.tile_right.x + this.tile_right.width + 12, this.tile_right.y + 7, 'Move right', instructionConfig).setOrigin(0, 0);
        this.add.text(this.tile_up.x + this.tile_up.width + 12, this.tile_up.y + 7, 'Fire capture pod', instructionConfig).setOrigin(0, 0);

        this.add.text(game.config.width/2, game.config.height/2, 'Press [Y] for 1-Player, [U] for 2-Player', instructionConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press [H] for Easy, [J] for Hard', instructionConfig).setOrigin(0.5);

        keyY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
        keyU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    }
    update() {
        //scroll starfield
        this.starfield.tilePositionX -= 4;
    
        if (Phaser.Input.Keyboard.JustDown(keyY)) {
            this.sound.play('sfx_select');
            game.singleplayer = true;
        }

        if (Phaser.Input.Keyboard.JustDown(keyU)) {
            this.sound.play('sfx_select');
            game.singleplayer = false;
        }

        if (Phaser.Input.Keyboard.JustDown(keyH)) {
            //easy mode
            game.settings = {
                targetSpeed: 3,
                smallTargetSpeed: 4,
                gameTimer: 60000,
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }

        if (Phaser.Input.Keyboard.JustDown(keyJ)) {
            //hard mode
            game.settings = {
                targetSpeed: 4,
                smallTargetSpeed: 5,
                gameTimer: 45000,
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
    }
}