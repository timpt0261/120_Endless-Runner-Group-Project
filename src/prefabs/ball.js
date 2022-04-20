//Ball prefab
class Ball extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture,frame){
        super(scene,x,y,texture, frame);


        // add  object to sceneS
        scene.add.existing(this);
        this.isMoving = true;

    }

    // reset rocket to "ground"
    reset(){
        this.x = game.config.width/2;
        this.y = game.config.height/2;
b
    }
}