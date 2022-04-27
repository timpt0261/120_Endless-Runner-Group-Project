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

        this.addPhysics();
    }

        // set collider to fit image

    addPhysics(){
        this.currVelX = this.body.velocity.x;

        //Added collision box
        this.body.setSize(32,32);
        this.body.setCircle(16);

        // Added physics 
        this.setBounce(1,1);
        this.setMaxVelocity(this.maxSpeed);
        this.setVelocity(10,-200);
        this.setGravity(0);
        this.setCollideWorldBounds(true);
        this.refreshBody();
    }



    update(){
        this.currVelX = this.body.velocity.x; //updates the current velocity
        console.log("Ball Velocity    : ", this.currVelX); //returns the velocity of the paddle

        this.angle++;

    }

    reset(){
        this.x  = game.config.width / 2;
        this.y =  game.config.height /2;

    }

    
}