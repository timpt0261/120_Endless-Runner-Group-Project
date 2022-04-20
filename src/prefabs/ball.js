// ball prefabs
class Ball extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture,frame){
        super(scene,x,y,texture, frame);

        // add object to existing scene
        scene.add.existing(this);
    }

    update(){

        
    }
    // reset rocket to "ground"
    reset(){
        
        this.y = game.config.height - borderUISize - borderPadding;
    }
}