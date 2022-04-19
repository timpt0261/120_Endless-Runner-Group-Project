// SkateBoard prefab
class SkateBoard extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture,frame){
        super(scene,x,y,texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        this.moving = true;
        this.moveSpeed = 5;
    }

    update(){

        // left/right movement
        if(keyLEFT.isDown && this.x  >= borderUISize + this.width){
            this.x -= this.moveSpeed;
        } else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
            this.x += this.moveSpeed;
        }
    }
    // reset rocket to "ground"
    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}