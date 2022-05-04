// Paddle prefab
class Paddle extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture,frame){
        super(scene,x,y,texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.paddleSpeed = 1000;
        this.deleted = false; // not deleted

        this.addPhysics();
    }

    addPhysics(){
        this.currVelX = this.body.velocity.x;
        this.currAccelX = this.body.acceleration.x;
        this.setImmovable(true);
        this.body.setSize(75,10);
        this.setMaxVelocity(700);
        this.setCollideWorldBounds(true);
        this.refreshBody();
    }

    update(){
        this.currVelX = this.body.velocity.x; //updates the current velocity
        this.currAccelX = this.body.acceleration.x; // updates the current acceleration
        // console.log("Paddle Velocity    : ", this.currVelX); //returns the velocity of the paddle
        // console.log("Paddle Acceleration: ", this.currAccelX); //returns the acceleration of the paddle

        // left movement
        if(keyLEFT.isDown){
            if(this.currVelX > 0){
                this.setAccelerationX(-this.paddleSpeed *3);
            }
            else{
                this.setAccelerationX(-this.paddleSpeed);
            }
        } // right movement
        else if(keyRIGHT.isDown){
            if(this.currVelX < 0){
                this.setAccelerationX(this.paddleSpeed*3);
            }
            else{
                this.setAccelerationX(this.paddleSpeed);
            }
        }
        else{  // Stopping movement
            if(this.currVelX < 5 && this.currVelX > -5){
                this.setVelocityX(0);
                this.setAccelerationX(0);
            }
            else if(this.currVelX > 0 || this.currVelX < 0){
                this.setAccelerationX(-this.currVelX *5);
            } 
        }
    }


    reset(){
        this.x =  game.config.width / 2;
        this.y = game.config.height - borderUISize;
    }

    deleteSelf(){
        console.log("Paddle is destroyed because YOU messed up BRO");
        //this.disableBody(true, true);  // Commented out so that the player can see where they messed up
        this.deleted = true; // is deleted
    }

}