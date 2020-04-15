//Rocket prefab

class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, playerNumber) {
        super(scene, x, y, texture, frame);

            //add object to existing scene, displayList, updateList
            scene.add.existing(this);

            this.isFiring = false; //track rocket's firing status
            this.sfxRocket = scene.sound.add('sfx_rocket'); //add rocket sfx
            this.pNum = playerNumber;
    }

    update() {
        if (this.pNum == 1) {
            //player 1
            //left and right movement
            if (!this.isFiring) {
                if (keyA.isDown && this.x >= 47) {
                    this.x -= 2;
                } else if (keyD.isDown && this.x <= 578) {
                    this.x += 2;
                }
            }

            //fire button
            if (Phaser.Input.Keyboard.JustDown(keyW) && !this.isFiring) {
                this.isFiring = true;
                this.sfxRocket.play(); //play sfx
            }

            //if fired, move up
            if (this.isFiring && this.y >= 108) {
                this.y -= 2;
            }

            //reset on miss
            if (this.y <= 108) {
                this.isFiring = false;
                this.y = 431;
            }
        } else {
            //player 2
            //left and right movement
            if (!this.isFiring) {
                if (keyLEFT.isDown && this.x >= 47) {
                    this.x -= 2;
                } else if (keyRIGHT.isDown && this.x <= 578) {
                    this.x += 2;
                }
            }

            //fire button
            if (Phaser.Input.Keyboard.JustDown(keyUP) && !this.isFiring) {
                this.isFiring = true;
                this.sfxRocket.play(); //play sfx
            }

            //if fired, move up
            if (this.isFiring && this.y >= 108) {
                this.y -= 2;
            }

                //reset on miss
            if (this.y <= 108) {
                this.isFiring = false;
                this.y = 431;
            }
        }
    }

    reset() {
        this.isFiring = false;
        this.y = 431;
    }
}