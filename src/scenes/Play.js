class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
        this.isPaused = false;
    }

    
    // added assets here
    preload(){

        this.load.image('background', './assets/full_background.png');
        this.load.image('basketball', './assets/basketball.png');
        this.load.image('brick', './assets/brick.png');
        this.load.image('background', './assets/background.jpg');
        this.load.image('obstacle1-1', './assets/obstacle1-1.png');
        this.load.image('pause', './assets/pause.png');
        this.load.image('boombox', './assets/obstacle1-2.png');
        // this.load.image('vhs', './assets/obstacle2-1.png');
        this.load.image('gameOverText','./assets/gameOverText.png');

        // load spritesheet()
        this.load.spritesheet('skate_board', './assets/skateboard.png',{
            frameWidth: 80,
            frameHeight: 26
        });

        this.load.spritesheet('floppy_disk', './assets/FloppyDisk.png', {
            frameWidth: 100,
            frameHeight: 100
        });

        this.load.spritesheet('br_bepper', './assets/Br.Bepper.png', {
            frameWidth: 100,
            frameHeight: 48,
        });

        this.load.spritesheet('b_up','./assets/b_up.png',{
            frameWidth: 100,
            frameHeight: 55
        });

        this.load.spritesheet('vhs', './assets/vhs.png',{
            frameWidth : 71,
            frameHeight : 37
        });

        this.load.audio('bounce','./assets/bounce.wav');


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
        this.bounceSFX = this.sound.add("bounce");

        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0);
        //this.background.alpha = 0.8;

        // Declaring animations
        this.anims.create({
            key: "skate_roll",
            frames: this.anims.generateFrameNumbers('skate_board', { start: 0, end: -1 }),
            frameRate: 12,

        });

        // Animation fo Floppy Disk
        this.anims.create({
            key: "fd_spin",
            frames: this.anims.generateFrameNumbers('floppy_disk',{start: 0, end: 7}),
            frameRate: 30,
            repeat:-1

        });
        // Animation for br.bepper can
        this.anims.create({
            key: "can_roll_1",
            frames: this.anims.generateFrameNumbers('br_bepper', { start: 0, end: -1 }),
            frameRate: 12,
            repeat: -1

        });
        // Animations for b-up can
        this.anims.create({
            key: "can_roll_2",
            frames: this.anims.generateFrameNumbers('b_up', { start: 0, end: -1 }),
            frameRate: 12,
            repeat: -1

        });
        
        // Animations for vhs tape
        this.anims.create({
            key: "vhs_roll",
            frames: this.anims.generateFrameNumbers('vhs', { start: 0, end: -1 }),
            frameRate: 6,
            repeat: -1

        });

        // initialize score:
        let scoreConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '40px',
            //backgroundColor: '#f6d265', //BAD
            stroke: '#000000',
            strokeThickness: '4',
            color: '#5FCDE4',
            align: 'center',
            padding: {
                top: 3,
                bottom: 3,
            },
            fixedWidth: 0
        }

        // Adding UI
        this.points = 0;
        this.score = this.add.text(game.config.width /2 - borderPadding/2, borderUISize, 0, scoreConfig).setOrigin(0,0);
        this.score.alpha = 1;
        // add pause and menu sprite
        this.pause = this.add.sprite(game.config.width - 40,60, 'pause').setOrigin(.5,.5);
        this.pause.setInteractive().on('pointerdown',()=>{
            this.isPaused ? this.isPaused = false : this.isPaused = true; 
        }, this);


        //Add collision to sides, but disable floor
        this.physics.world.setBoundsCollision(true, true, true, false);       
        
        // create paddle
        this.paddle = new Paddle(this, game.config.width / 2, game.config.height - borderUISize,'skate_board',0).setOrigin(0.5,0.5);
        // create ball
        this.ball = new Ball(this,  this.paddle.x , 650,'basketball',0).setOrigin(0.5,0.5);  //Origin default is (0.5,0.5)
        this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);


        //initialize collision group for obstacles
        this.obstacleColGroup = this.physics.add.group();
        
        this.obstacle1 = new Obstacles(this, 80, -30, 'floppy_disk',0,1).setOrigin();
        this.obstacle1.setScale(.5);
        this.obstacle1.body.setSize(100,100);
        this.obstacle1.play("fd_spin");
        

        this.obstacle2 = new Obstacles(this, 240, -160, 'br_bepper',0,1).setOrigin();
        this.obstacle2.body.setSize(100,48);
        this.obstacle2.play("can_roll_1");

        this.obstacle3 = new Obstacles(this, 380, -30, 'b_up',0,1).setOrigin();
        this.obstacle3.body.setSize(100,55);
        this.obstacle3.play("can_roll_2");

        this.obstacle4 = new Obstacles(this, 500, -400, 'boombox',0,1).setOrigin();
        // this.obstacle4.setScale(7,3);
        this.obstacle4.setScale(.3);
        this.obstacle4.body.setSize(396,234);

        this.obstacle5 = new Obstacles(this, 60, -400, 'vhs',0,1).setOrigin();
        this.obstacle5.setScale(1);
        this.obstacle5.body.setSize(71,37);
        this.obstacle5.play("vhs_roll");

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

        this.gameOverText = this.add.image(game.config.width/2, 150,'gameOverText').setScale(.4);
        this.finale_score = this.add.text(game.config.width /2 - borderPadding/2 +20, borderUISize + 80, 0, scoreConfig).setOrigin(0,0);
        this.gameOverText.alpha = 0;
        this.finale_score.alpha = 0;

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }


    // update things in scene
    update(){
        this.background.tilePositionX -= 0.5;
        this.background.tilePositionY -= 0.5;

        this.counter += 1;
        // This is literally just to get the music to play once.
        if (this.counter == 1){
            this.techno.play(this.musicConfig);
        }

        // pauses game
        this.isPaused ? this.physics.pause(): this.physics.resume();

        // gameOver conditions
        //check that ball is past floor  OR check that paddle is not deleted
        this.gameIsOver = this.ball.y > game.config.height || this.paddle.deleted;

        if(this.gameIsOver){
            this.gameOver();
        }

        if(!this.gameIsOver){
            this.score.text = this.points;
            this.finale_score.text = this.points;
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
        this.paddle.play("skate_roll");
        this.bounceSFX.play(this.musicConfig);

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
            //  Add a little random X to pause it bouncing straight up!
            ball.setVelocityX(2 + Math.random() * 8 + power); 
        }
        
    }

    bounce(ball, obstacle){
        if(obstacle.y > ball.y){
        ball.setVelocityY(-ball.maxSpeed);
        }

        this.bounceSFX.play(this.musicConfig);
        this.points += 1;
        this.ball.maxSpeed += 5;
        obstacle.speed += 10;
        // this.obstacle1.speed += 5;
        // this.obstacle2.speed += 5;
        // this.obstacle3.speed += 5;
        // this.obstacle4.speed += 5;
        // this.obstacle5.speed += 5;
        obstacle.reset();        
        console.log("Ball:  ",this.ball.maxSpeed,"\n1:  ",this.obstacle1.speed,"\n2:  ",this.obstacle2.speed,"\n3:  ",this.obstacle3.speed,"\n4:  ",this.obstacle4.speed,"\n5:  ",this.obstacle5.speed);
    }

    gameOver(){
        this.physics.pause();
        this.techno.pause();

        this.gameOverText.alpha = 1;
        this.finale_score.alpha = 1;
        
        if(keySPACE.isDown){
            this.scene.start('menuScene');
            
        }else if(keyR.isDown){
            this.scene.restart();
        }

        
    }

}