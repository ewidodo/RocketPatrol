//Target prefab

class Target extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, isBig) {
        super (scene, x, y, texture, frame);

        //add to existing scene, displayList, updateList
        scene.add.existing(this);
        
        this.points = pointValue;
        this.big = isBig;

        //add more points for small target
        if (!isBig) {
            this.points += 15;
        }
    }

    update() {
        //move spaceship left
        if (this.big) {
            this.x -= game.settings.targetSpeed;
        } else {
            this.x -= game.settings.smallTargetSpeed;
        }

        //wraparound screen bounds
        if (this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width;
    }
}