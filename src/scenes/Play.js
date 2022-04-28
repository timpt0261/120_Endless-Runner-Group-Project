class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
        this.counter = 0;
        this.text = 0;
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
        
        this.paddle = new Paddle(this, game.config.width / 2, game.config.height - borderUISize,'brick',0).setOrigin(0.5,0.5);
        this.ball = new Ball(this,  this.paddle.x , 650,'basketball',0).setOrigin(0.5,0.5);  //Origin default is (0.5,0.5)
        this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);

        // initialize score:
        this.plScore;

        //initialize collision group for obstacles
        this.obstacleColGroup = this.physics.add.group();
        
        this.obstacle1 = new Obstacles(this, 80, -30, 'obstacle1-1',0,1).setOrigin();
        this.obstacle1.setScale(6,2);

        this.obstacle2 = new Obstacles(this, 240, -160, 'obstacle1-1',0,1).setOrigin();
        this.obstacle2.setScale(5,3);

        this.obstacle3 = new Obstacles(this, 380, -30, 'obstacle1-1',0,1).setOrigin();
        this.obstacle3.setScale(7,1);

        this.obstacle4 = new Obstacles(this, 500, -400, 'obstacle1-1',0,1).setOrigin();
        this.obstacle4.setScale(7,3);

        this.obstacle5 = new Obstacles(this, 60, -400, 'obstacle1-1',0,1).setOrigin();
        this.obstacle5.setScale(7,3);

        this.obstacleColGroup.add(this.obstacle1); //see if this needs to be moved into the for loop
        this.obstacleColGroup.add(this.obstacle2);
        this.obstacleColGroup.add(this.obstacle3);
        this.obstacleColGroup.add(this.obstacle4); 
        this.obstacleColGroup.add(this.obstacle5); 
        
        //define obstacle collision behavior (with paddle --> should delete it)
        this.physics.add.collider(this.paddle, this.obstacleColGroup, this.paddle.deleteSelf, null, this.paddle);
        //define obstacle collision behavior (with ball--> should be deleted)

        this.physics.add.collider(this.ball, this.obstacle1, this.bounce, null, this);
        this.physics.add.collider(this.ball, this.obstacle2, this.bounce, null, this);
        this.physics.add.collider(this.ball, this.obstacle3, this.bounce, null, this);
        this.physics.add.collider(this.ball, this.obstacle4, this.bounce, null, this);
        this.physics.add.collider(this.ball, this.obstacle5, this.bounce, null, this);


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
        this.obstacle1.update();
        this.obstacle2.update();
        this.obstacle3.update();
        this.obstacle4.update();
        this.obstacle5.update();

        //check that ball is past floor
        if(this.ball.y > game.config.height){
            this.ball.reset(this.paddle);
            this.paddle.reset();
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

    bounce(ball, obstacle){
        if(obstacle.y > ball.y){
        ball.setVelocityY(-ball.maxSpeed);
        }
        
        obstacle.reset();
    }
}