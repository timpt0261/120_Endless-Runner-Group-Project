//Obstacle prefab & spawner? 
class Obstacles extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture,frame, ob_type){
        super(scene,x,y,texture, frame);
        // add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.addPhysics(ob_type);
    }

    addPhysics(ob_type){
        this.setBounce(1);
        //this.setAcceleration(10);
        this.setGravity(0); //isn't actually being affected by gravity

        this.setCollideWorldBounds(true); //is there a function so I can delete it when it collides with world bounds?
        this.body.onWorldBounds = false;

        //random number between 1 and 3 determines the hitbox size and type
        if(ob_type == 1){
            this.body.setSize(25,10);
            this.body.setCircle();
            //idk why "set circle" works, but it creates a square hitbox of perfect size, no matter how it's scaled;
            //this probably means we don't need the ob_type setup? since it'll always be perfect-- the object maker can randomize scale in Play.js
        }
        /*else if (ob_type == 2){
            this.body.setSize(32,32);
            this.body.setCircle(16);
        }
        else if (ob_type == 3){
            this.body.setSize(32,32);
            this.body.setCircle(16);
        }*/
    }
    update(){
        if(this.y > game.config.height + 15){
            this.destroy();
        }
        //If it exists, continue. This is to solve a problem with this.destroy()
        if(this.body){
            //All obstacle update code is to be written down here, else destroy() error
            this.setVelocity(0,110); //constantly moves it down
            
        }
    }    
}
