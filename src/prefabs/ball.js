// ball prefabs
class Ball extends Phaser.GameObject.Sprite{
    constructor(scene, x, y, texture,frame){
        super(scene,x,y,texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        
    }

    // create(){
    //     this.setVelocity(0,0);
    //     this.setBounce(1,1);
    //     this.setCollideWorldBounds(true);

    // }



    update(){

        
    }
    // reset rocket to "ground"
    reset(){
        this.x = game.config.width/2;
        this.y = game.config.height/2;
    }
}