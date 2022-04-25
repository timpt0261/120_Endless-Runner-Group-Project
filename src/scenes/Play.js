class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    
    // added assets here
    preload(){
        this.load.image('basketball', './assets/basketball.png');
        this.load.image('brick', './assets/brick.png');
        this.load.image('background', './assets/background.jpg');

        this.load.image('obstacle1-1', './assets/obstacle1-1.png');
    }

    
    // initialize gameObjects , and add assets as textures
    create(){
        console.log("(BorderUISize, BorderPadding):\n", borderUISize, borderPadding);

        // this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0);
        
        this.ball = new Ball(this, 100, 100,'basketball',0).setOrigin();  //Origin default is (0.5,0.5)
        this.paddle = new Paddle(this, game.config.width / 2, game.config.height - borderUISize,'brick',0).setOrigin();

        // initialize score:
        this.plScore;

        //initialize collision group for obstacles
        this.obstacleColGroup = this.physics.add.group();

        //[TEST PURPOSES ONLY]
        this.obstacle = new Obstacles(this, 30, 30, 'obstacle1-1',0,1).setOrigin();
        this.obstacle.setScale(2,1);
        this.obstacleColGroup.add(this.obstacle); //add test obstacle to collision group
        
        //define obstacle collision behavior (with paddle --> should delete it)
        //define obstacle collision behavior (with ball--> should be deleted)
        this.physics.add.collider(this.ball, this.obstacleColGroup, Obstacles.deleteSelf, null, this); //for some reason, this line just adds collision to the obstacle-- doesn't delete it?? Obstacles.deleteSelf isn't being called, I think.


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
        this.obstacle.update();

    }

}