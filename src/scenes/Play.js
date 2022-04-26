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
        //Add collision to sides, but disable floor
        this.physics.world.setBoundsCollision(true, true, true, false);

        // this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0);
        
        this.ball = new Ball(this,  game.config.width / 2 ,  game.config.height /2,'basketball',0).setOrigin(0.5,0.5);  //Origin default is (0.5,0.5)
        this.paddle = new Paddle(this, game.config.width / 2, game.config.height - borderUISize,'brick',0).setOrigin(0,0);
        this.physics.world.enable([ this.ball, this.paddle]);

        // initialize score:
        this.plScore;

        //initialize collision group for obstacles
        this.obstacleColGroup = this.physics.add.group();

        //[SPAWNER CODE]
        //randomize between 4 sprites
        //randomize x position of spawn
        //randomize x and y scaling of obj

        //[TEST PURPOSES ONLY]
        this.obstacle = new Obstacles(this, 30, 30, 'obstacle1-1',0,1).setOrigin();
        this.obstacle.setScale(2,1);
        this.obstacleColGroup.add(this.obstacle); //add test obstacle to collision group
        
        //define obstacle collision behavior (with paddle --> should delete it)
        this.physics.add.collider(this.paddle, this.obstacleColGroup, this.paddle.deleteSelf, null, this.paddle);
        //define obstacle collision behavior (with ball--> should be deleted)
        this.physics.add.collider(this.ball, this.obstacleColGroup, this.obstacle.deleteSelf, null, this.obstacle); //for some reason, this line just adds collision to the obstacle-- doesn't delete it?? Obstacles.deleteSelf isn't being called, I think.


        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }


    // update things in scene
    update(){
        this.ball.update();
        this.paddle.update();
        this.obstacle.update();
        this.physics.world.collide(this.ball, this.paddle);
        //check that ball is past floor
        if(this.ball.y > game.config.height){
            this.ball.reset();
            this.paddle.reset();
            this.hitPaddle(this.ball,this.paddle);
            // this.obstacle.reset();

        }

        // check that obstacle and paddle are touching

    }
    // Reference from Phaser BreakOut Model
    hitPaddle(ball, paddle) {
        var diff = 0;
        var power;
        keySPACE.isDown? power =  Math.random(10, 50): power = 0;

        if (ball.x < paddle.x)
        {
            //  Ball is on the left-hand side of the paddle
            diff = paddle.x - ball.x;
            ball.setVelocityX(-10 * diff + power);
        }
        else if (ball.x > paddle.x)
        {
            //  Ball is on the right-hand side of the paddle
            diff = ball.x -paddle.x;
            ball.setVelocityX(10 * diff + power);
        }
        else
        {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            ball.setVelocityX(2 + Math.random() * 8 + power);
        }
    }

}