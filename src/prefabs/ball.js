//Ball prefab
class Ball extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture,frame){
        super(scene,x,y,texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.isMoving = true;
        this.hitSpeed = 1;

        this.addPhysics();
    }

        // set collider to fit image

    addPhysics(){
        this.body.setSize(32,32);
        this.body.setCircle(16);

        // Added physics 
        this.setBounce(1,1);
        this.setVelocity(30,0);
        this.setGravityY(20);
        this.setCollideWorldBounds(true);
        this.refreshBody();
    }

    update(){
        this.angle++;

    }

    reset(){
        this.x  = game.config.width / 2;
        this.y =  game.config.height /2;

    }

    
}