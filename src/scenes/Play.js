class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    
    // added assets here
    preload(){
        this.load.image('basketball', './assets/basketball.png');
        this.load.image('brick', './assets/brick.png');
        this.load.image('background', './assets/background.jpg');
    }

    
    // initialize gameObjects , and add assets as textures
    create(){
        console.log("(BorderUISize, BorderPadding):\n", borderUISize, borderPadding);
        //Add collision to sides, but disable floor
        this.physics.world.setBoundsCollision(true, true, true, false);

        // this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0);
        
        this.ball = new Ball(this,  game.config.width / 2 ,  game.config.height /2,'basketball',0).setOrigin();  //Origin default is (0.5,0.5)
        this.paddle = new Paddle(this, game.config.width / 2, game.config.height - borderUISize,'brick',0).setOrigin();
        this.physics.world.enable([ this.ball, this.paddle]);

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
        this.ball.update();
        this.paddle.update();
        this.physics.world.collide(this.ball, this.paddle);

        //check that ball is past floor
        if(this.ball.y > game.config.height){
            this.ball.reset();
            this.paddle.reset();

        }

        // check that obstacle and paddle are touching

    }

}