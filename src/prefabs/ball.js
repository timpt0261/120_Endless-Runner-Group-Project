//Ball prefab
class Ball extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture,frame){
        super(scene,x,y,texture, frame);

        // add  object to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.isMoving = true;
        this.hitSpeed = 1;
    }

    // Added physis 
    create(){       
        // this.setOrgin(0,0); 
        this.body.setSize(32,32);
        this.body.setCircle(17.5,31,30);
        this.setBounce(1);
        this.setVelocity(20,10);
        this.setGravityY(1000);
        this.setCollideWorldBounds(true);
    }

    update(){
        // this.angle++;
    }

    // reset rocket to "ground"
    reset(){
        this.x = game.config.width/2;
        this.y = game.config.height/2;
b
    }
}