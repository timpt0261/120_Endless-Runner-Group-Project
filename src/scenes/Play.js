class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    // added assets here
    preload(){

    }
    // initialize gameObjects , and add assets as textures
    create(){
        
        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }
    // update things in scene
    update(){

    }
    // implement in prefabs(maybe)
    collisionCheck(player, object){



    }

    destroyObstacle(obstacle){
        
    }

}