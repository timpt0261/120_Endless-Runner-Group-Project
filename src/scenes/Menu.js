class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");

    }

    preload(){        
        this.load.image('background', './assets/full_background.png');
        this.load.image('logo', './assets/logo.png');
        this.load.image('intro_screen', './assets/introScenetext.png');


    }

    create(){
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0);

        this.add.image(game.config.width/2,100,'logo').setScale(.5);
        this.add.image(game.config.width/2,600,'intro_screen').setScale(.36);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        this.background.tilePositionX -= 0.5;
        this.background.tilePositionY -= 0.5;

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            //this.sound.play('sfx_select');
            this.scene.start('playScene');    
        }
    }
}