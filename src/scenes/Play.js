class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
        
    }

    
    // added assets here
    preload(){
        this.load.image('basketball', './assets/basketball.png');
        this.load.image('background', './assets/background.jpg');
    }

    // initialize gameObjects , and add assets as textures
    create(){
        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0);
        this.basketball = new Ball(this, game.config.width/2, game.config.height/4 ,'basketball');
        this.physics.arcade.enable(this.basketball,Phaser.Physics.ARCADE);
        this.basketball.body.velocity.setTo(200,200);
        this.basketball.body.collideWorldBounds = true;
        this.basketball.body.bounce.set(1);

        // initialize score:
        this.plScore;

        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }
    // update things in scene
    update(){
        

    }

}