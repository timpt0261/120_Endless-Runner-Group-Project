class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    // added assets here
    preload(){
        this.load.image('basketball', './assets/basketball.png');
    }
    // initialize gameObjects , and add assets as textures
    create(){
        
        this.basketBall = new Ball(this, game.config.width/2, game.config.height/2, 'basketball',0);

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