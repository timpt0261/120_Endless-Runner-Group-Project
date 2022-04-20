<<<<<<< HEAD
//Ball prefab
class Ball extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene,x,y,texture,frame);
=======
// ball prefabs
class Ball extends Phaser.GameObject.Sprite{
    constructor(scene, x, y, texture,frame){
        super(scene,x,y,texture, frame);
>>>>>>> 03f776f8f5437a9f79d59928fa6162ece4b6409b

        // add  object to sceneS
        scene.add.existing(this);
<<<<<<< HEAD
=======
        
>>>>>>> 03f776f8f5437a9f79d59928fa6162ece4b6409b
    }

    // create(){
    //     this.setVelocity(0,0);
    //     this.setBounce(1,1);
    //     this.setCollideWorldBounds(true);

    // }



    update(){
<<<<<<< HEAD
        
=======

        
    }
    // reset rocket to "ground"
    reset(){
        this.x = game.config.width/2;
        this.y = game.config.height/2;
>>>>>>> 03f776f8f5437a9f79d59928fa6162ece4b6409b
    }
}