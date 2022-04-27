//Ball prefab
class Ball extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture,frame){
        super(scene,x,y,texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.isMoving = true;

        this.hitSpeed = 1;
        this.maxSpeed = 500;

        this.velX = -12.5;
        this.velY = -50
        this.addPhysics();
    }

    addPhysics(){
         // set collider to fit image

        this.body.setSize(32,32);
        this.body.setCircle(16);

        // Added physics 
        this.setBounce(1);
        this.setVelocity(this.velX,this.velY);
        this.setCollideWorldBounds(true);
        this.refreshBody();
    }



    update(){
        this.currVelX = this.body.velocity.x; //updates the current velocity
        console.log("Ball Velocity    : ", this.currVelX); //returns the velocity of the paddle

        this.angle++;
        

    }

    reset(paddle){

        this.x  = paddle.x;
        this.y =  650;

    }

    
}