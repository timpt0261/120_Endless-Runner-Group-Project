//Obstacle prefab & spawner? 
class Obstacles extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture,frame, ob_type){
        super(scene,x,y,texture, frame);
        // add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.speed = 110;

        this.addPhysics(ob_type);
    }

    addPhysics(ob_type){
        this.setBounce(1);
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
    }

    reset(){
        //console.log("reset is called");
        //randomize value
        this.x  = Phaser.Math.Between(30, game.config.width-30);
        this.y =  Phaser.Math.Between(-50, -500);
    }

    update(){
        if(this.y > game.config.height + 15){
            this.reset();
        }
    
        this.setVelocity(0,this.speed); //constantly moves it down
    }    
}
