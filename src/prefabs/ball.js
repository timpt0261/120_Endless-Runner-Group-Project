//Ball prefab
class Ball extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture,frame){
        super(scene,x,y,texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.isMoving = true;
        this.hitSpeed = 1;
        this.maxSpeed = 300;

        this.addPhysics();
    }

    addPhysics(){
        this.currVelX = this.body.velocity.x;
        this.currVelY = this.body.velocity.y;

        // set collider to fit image
        this.body.setSize(32,32);
        this.body.setCircle(16);

        // Added physics 
        this.setMaxVelocity(this.maxSpeed);
        this.setBounce(1,1);
        this.setVelocity(0,-this.maxSpeed);
        this.setGravityY(0);
        this.setCollideWorldBounds(true);
        this.refreshBody();
    }



    update(){
        this.currVelX = this.body.velocity.x; //updates the current velocity
        this.currVelY = this.body.velocity.y; //updates the current velocity
        //console.log("Ball X : ", this.currVelX,"\nBall Y : ", this.currVelY); //returns the velocity of the paddle

        this.angle++;     
        this.setVelocityY(this.currVelY*2);



    }

    reset(paddle){
        this.setVelocityX(0);
        this.x  = paddle.x;
        this.y =  650;
    }

    
}