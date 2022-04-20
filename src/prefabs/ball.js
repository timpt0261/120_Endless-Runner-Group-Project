//Ball prefab
class Ball extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene,x,y,texture,frame);

        // add  object to sceneS
        scene.add.existing(this);
    }

    update(){
        
    }
}