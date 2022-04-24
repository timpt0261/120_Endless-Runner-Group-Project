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


    create(){       
        // set collider to fit image
        this.body.setSize(32,32);
        this.body.setCircle(16);

        // Added physics 
        this.setBounce(1,1);
        this.setVelocity(300,300);
        this.setGravity(100);
        this.setCollideWorldBounds(true);
        this.refreshBody();
    }

    update(){
        this.angle++;
    }

    // reset rocket to "ground"
    reset(){
        this.x = game.config.width/2;
        this.y = game.config.height/2;

    }
}