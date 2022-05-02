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
        this.load.image('pause', './assets/pause.png');
        this.load.image('restart', './assets/restart.png');

        // load spritesheet()
        this.load.spritesheet('floppy_disk', './assets/FloppyDisk.png', {
            frameWidth: 100,
            frameHeight: 100
        });

        this.load.spritesheet('br_bepper', './assets/Br.Bepper.png', {
            frameWidth: 100,
            frameHeight: 48,
        });

        this.load.audio('techno', './assets/TestTechno1.mp3');
        //this.load.audio('techno', './assets/TestTechno2.mp3');



    }

    
    // initialize gameObjects , and add assets as textures
    create(){
        this.counter = 0;
        this.techno = this.sound.add("techno");
        this.musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }

        // Declaring animations
        // Animation fo Floppy Disk
        this.anims.create({
            key: "fd_spin",
            frames: this.anims.generateFrameNumbers('floppy_disk',{start: 0, end: 7}),
            frameRate: 10,
            repeat:-1

        });
        // Animation for soda can
        this.anims.create({
            key: "can_roll",
            frames: this.anims.generateFrameNumbers('br_bepper', { start: 0, end: -1 }),
            frameRate: 12,
            repeat: -1

        });


        //Add collision to sides, but disable floor
        this.physics.world.setBoundsCollision(true, true, true, false);

        // this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0);
        
        

        this.paddle = new Paddle(this, game.config.width / 2, game.config.height - borderUISize,'brick',0).setOrigin(0.5,0.5);
        this.ball = new Ball(this,  this.paddle.x , 650,'basketball',0).setOrigin(0.5,0.5);  //Origin default is (0.5,0.5)
        this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);


        //initialize collision group for obstacles
        this.obstacleColGroup = this.physics.add.group();
        
        this.obstacle1 = new Obstacles(this, 80, -30, 'floppy_disk',0,1).setOrigin();
        // this.obstacle1.setScale(2,2);
        this.obstacle1.play("fd_spin");
        

        this.obstacle2 = new Obstacles(this, 240, -160, 'br_bepper',0,1).setOrigin();
        // this.obstacle2.setScale(5,3);
        this.obstacle2.play("can_roll");

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

        // // add particle skin here
        // this.


        // //Creating emitter for soda cans
        // this.movingEmiter = this.particleManager.createEmitter({
        //     speed: 80,
        //     quantity : 50, 
        //     scale: {start: 0.1, end: 1},
        //     alpha: { start: 1, end: 0},
        //     lifespan:{min: 10, max: 40}
        // });


        // //Creating emitter for basketball
        // this.movingEmiter = this.particleManager.createEmitter({
        //     speed: 80,
        //     quantity: 50,
        //     scale: { start: 0.1, end: 1 },
        //     alpha: { start: 1, end: 0 },
        //     radial: true,
        //     angle: { min: 255, max: 285 },
        //     lifespan: { min: 10, max: 40 },
        //     follow: scene.this
        // });

        //GameOver Flag
        

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


        // initialize score:
        let scoreConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '33px',
            //backgroundColor: '#f6d265',
            stroke: '#000000',
            strokeThickness: '2',
            color: '#132A8F',
            align: 'center',
            padding: {
                top: 3,
                bottom: 3,
            },
            fixedWidth: 0
        }

        // Adding UI
        this.points = 0;
        this.score = this.add.text(game.config.width /2, borderUISize, 0, scoreConfig);

        // add pause and menu sprite
        this.pause = this.physics.add.staticSprite(game.config.width - 40,60, 'pause').setOrigin(.5,.5);
        this.restart = this.physics.add.staticSprite(game.config.width - 40,100, 'restart').setOrigin(.5,.5);
    }


    // update things in scene
    update(time){
        // This is literally just to get the music to play once.
        this.counter += 1;
        
        if (this.counter == 1){
            this.techno.play(this.musicConfig);
        }

        // gameOver conditions
        //check that ball is past floor  OR check that paddle is not deleted
        this.game_over = this.gameOver(this.ball.y > game.config.height || this.paddle.deleted);

        if(this.game_over){
            this.scene.restart();
            this.techno.stop();
        }

        if(!this.game_over){

            this.points = Math.floor(time/1000);
            this.score.text = this.points;
            this.ball.update();
            this.paddle.update();
            this.obstacle1.update();
            this.obstacle2.update();
            this.obstacle3.update();
            this.obstacle4.update();
            this.obstacle5.update();


        }
        

    }

    // Reference from Phaser BreakOut Model
    hitPaddle(ball, paddle) {
        var diff = 0;
        var power = 0;
        //keySPACE.isDown? power =  Math.random(10, 50): power = 0;

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
    gameOver(conditions1 , conditions2){
        return conditions1 == true || conditions2 == true;
    }
    
}