let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 780,
    scene: [Menu,Play],
    title: 'Endless Running in the 90s',
    
    physics:{
        default: 'arcade',
        arcade: {
            gravity: { y : 0 },
            debug : false
        }
    }
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keySPACE, keyR, keyLEFT, keyRIGHT;

