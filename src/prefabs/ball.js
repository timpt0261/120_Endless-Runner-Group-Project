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

    addPhysics(){
        this.body.setSize(32,32);
        this.body.setCircle(16);
        this.setBounce(1);
        // this.setAcceleration(10);
        this.setVelocity(200,100);
        this.setGravity(0);
        this.setCollideWorldBounds(true);
        this.refreshBody();
    }

    update(){
        this.angle++;
    }
}