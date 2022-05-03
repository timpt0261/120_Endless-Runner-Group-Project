class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");

    }

    preload(){
        this.load.image('logo', './assets/logo.png');
        this.load.image('intro_screen', './assets/introScenetext.png');

    }

    create(){
        this.add.image(game.config.width/2,100,'logo').setScale(.5);
        this.add.image(game.config.width/2,600,'intro_screen').setScale(.36);
    }
}