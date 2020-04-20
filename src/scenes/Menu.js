class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //-----------
        //load images
        this.load.image('a', './assets/key_a.png');
        this.load.image('d', './assets/key_d.png');
        this.load.image('w', './assets/key_w.png');
        this.load.image('left', './assets/key_left.png');
        this.load.image('right', './assets/key_right.png');
        this.load.image('up', './assets/key_up.png');
        this.load.image('y', './assets/key_y.png');
        this.load.image('u', './assets/key_u.png');
        this.load.image('h', './assets/key_h.png');
        this.load.image('j', './assets/key_j.png');
        this.load.image('y_sel', './assets/key_y_selected.png');
        this.load.image('u_sel', './assets/key_u_selected.png');

        this.load.image('starfield', './assets/starfield.png');
        this.load.image('logo', './assets/logo.png');

        //-----------
        //load sounds
        this.load.audio('sfx_select1', './assets/blip_select1.wav');
        this.load.audio('sfx_select2', './assets/blip_select2.wav');
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

        this.load.spritesheet('target_big1', './assets/target_big1.png', {
            frameWidth: 63,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 1,
        });

        this.load.spritesheet('target_big2', './assets/target_big2.png', {
            frameWidth: 63,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 1,
        });

        this.load.spritesheet('target_big3', './assets/target_big3.png', {
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
        //place background and logo
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        this.logo = this.add.image(game.config.width/2, 104, 'logo').setOrigin(0.5);

        //----------------
        //animation config
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

        this.anims.create({
            key: 'mason',
            frames: this.anims.generateFrameNumbers('target_big1', {
                start: 0,
                end: 1,
                first: 0,
            }),
            frameRate: 4,
            repeat: -1,
        });

        this.anims.create({
            key: 'laika',
            frames: this.anims.generateFrameNumbers('target_big2', {
                start: 0,
                end: 1,
                first: 0,
            }),
            frameRate: 4,
            repeat: -1,
        });

        this.anims.create({
            key: 'hachi',
            frames: this.anims.generateFrameNumbers('target_big3', {
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
        });

        //--------------------------
        //start building menu screen

        //-------
        //divider
        this.add.rectangle(112, 308, 416, 2, 0xEEEEEE).setOrigin(0, 0);

        //--------------------
        //instructional images
        this.p1 = this.add.sprite(112, 320, 'pod1').setOrigin(0, 0);
        this.tile_a = this.add.image(112, 344, 'a').setOrigin(0, 0);
        this.tile_d = this.add.image(112, 384, 'd').setOrigin(0, 0);
        this.tile_w = this.add.image(112, 424, 'w').setOrigin(0, 0);
        this.p2 = this.add.sprite(156, 320, 'pod2').setOrigin(0, 0);
        this.tile_left = this.add.image(156, 344, 'left').setOrigin(0, 0);
        this.tile_right = this.add.image(156, 384, 'right').setOrigin(0, 0);
        this.tile_up = this.add.image(156, 424, 'up').setOrigin(0, 0);

        //------------
        //menu buttons
        this.tile_y = this.add.image(112, 198, 'y').setOrigin(0, 0);
        this.tile_u = this.add.image(112, 238, 'u').setOrigin(0, 0);
        this.tile_y_sel = this.add.image(112, 198, 'y_sel').setOrigin(0, 0);
        this.tile_u_sel = this.add.image(112, 238, 'u_sel').setOrigin(0, 0);
        this.tile_h = this.add.image(308, 198, 'h').setOrigin(0, 0);
        this.tile_j = this.add.image(308, 238, 'j').setOrigin(0, 0);

        //------------
        //targets list
        this.hachi = this.add.sprite(312, 332, 'target_big3').setOrigin(0, 0);
        this.laika = this.add.sprite(312, 372, 'target_big2').setOrigin(0, 0);
        this.mason = this.add.sprite(312, 412, 'target_big1').setOrigin(0, 0);
        this.blink = this.add.sprite(441, 337, 'target_small').setOrigin(0, 0);

        //---------------
        //play animations
        this.p1.anims.play('player1');
        this.p2.anims.play('player2');
        this.hachi.anims.play('hachi');
        this.laika.anims.play('laika');
        this.mason.anims.play('mason');
        this.blink.anims.play('blink');

        let instructionConfig = {
            fontFamily: 'Courier',
            fontSize: '16px',
            backgroundColor: null,
            color: '#CFA93E',
            align: 'left',
        }

        //-----------------
        //instructions text
        this.add.text(this.tile_left.x + this.tile_left.width + 12, this.tile_left.y + 8, 'Move left', instructionConfig).setOrigin(0, 0);
        this.add.text(this.tile_right.x + this.tile_right.width + 12, this.tile_right.y + 8, 'Move right', instructionConfig).setOrigin(0, 0);
        this.add.text(this.tile_up.x + this.tile_up.width + 12, this.tile_up.y + 8, 'Fire pod', instructionConfig).setOrigin(0, 0);

        instructionConfig.fontSize = '12px'

        this.add.text(this.mason.x + this.mason.width + 7, this.mason.y + 11, '= 10pt', instructionConfig).setOrigin(0, 0);
        this.add.text(this.laika.x + this.laika.width + 7, this.laika.y + 11, '= 20pt', instructionConfig).setOrigin(0, 0);
        this.add.text(this.hachi.x + this.hachi.width + 7, this.hachi.y + 11, '= 30pt', instructionConfig).setOrigin(0, 0);
        this.add.text(this.blink.x + this.blink.width + 5, this.blink.y + 6, '= 50pt', instructionConfig).setOrigin(0, 0);

        instructionConfig.fontSize = '14px';
        instructionConfig.color = '#EEEEEE';

        this.add.text(112, 290, 'Guide', instructionConfig).setOrigin (0, 0);

        //---------
        //menu text
        instructionConfig.color = '#6ED93D';
        instructionConfig.fontSize = '18px';

        this.add.text(this.tile_y.x + this.tile_y.width + 12, this.tile_y.y + 8, '1 Player', instructionConfig).setOrigin(0, 0);
        this.add.text(this.tile_u.x + this.tile_u.width + 12, this.tile_u.y + 8, '2 Player', instructionConfig).setOrigin(0, 0);
        this.add.rectangle(this.tile_y.x + this.tile_y.width + 104, this.tile_y.y + 10, 12, 12, 0xD9A066).setOrigin(0, 0);
        this.add.rectangle(this.tile_u.x + this.tile_u.width + 104, this.tile_u.y + 10, 12, 12, 0xD9A066).setOrigin(0, 0);
        this.add.rectangle(this.tile_u.x + this.tile_u.width + 122, this.tile_u.y + 10, 12, 12, 0x88A9D0).setOrigin(0, 0);

        this.add.text(this.tile_h.x + this.tile_h.width + 12, this.tile_h.y + 8, 'Start game (EASY)', instructionConfig).setOrigin(0, 0);
        this.add.text(this.tile_j.x + this.tile_j.width + 12, this.tile_j.y + 8, 'Start game (HARD)', instructionConfig).setOrigin(0, 0);

        //----------------------------------------------------------
        //start out on singleplayer by default, hide selected u tile
        this.tile_u_sel.alpha = 0;
        game.singleplayer = true;

        //-------------------
        //set up key bindings
        keyY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
        keyU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    }
    update() {
        //scroll starfield
        this.starfield.tilePositionX -= 4;
    
        if (Phaser.Input.Keyboard.JustDown(keyY)) {
            //singleplayer
            this.sound.play('sfx_select1');
            game.singleplayer = true;
            this.tile_y_sel.alpha = 1;
            this.tile_u_sel.alpha = 0;
        }

        if (Phaser.Input.Keyboard.JustDown(keyU)) {
            //multiplayer
            this.sound.play('sfx_select1');
            game.singleplayer = false;
            this.tile_y_sel.alpha = 0;
            this.tile_u_sel.alpha = 1;
        }

        if (Phaser.Input.Keyboard.JustDown(keyH)) {
            //easy mode
            game.settings = {
                targetSpeed: 3,
                smallTargetSpeed: 4,
                gameTimer: 60000,
            }
            this.sound.play('sfx_select2');
            this.scene.start("playScene");
        }

        if (Phaser.Input.Keyboard.JustDown(keyJ)) {
            //hard mode
            game.settings = {
                targetSpeed: 4,
                smallTargetSpeed: 5,
                gameTimer: 45000,
            }
            this.sound.play('sfx_select2');
            this.scene.start("playScene");
        }
    }
}