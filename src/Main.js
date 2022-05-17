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

// Creative Tilt

// Something interesting about our game is that when the ball hits the paddle a function determines weather
// the ball is closer to the left side, right side, or directly in the middle of the skateboard.
// As well, that the ball's velocity is changed by the difference. An artistic choice we is that when the function runs it plays
// a small animation of the skateboard rolling over whenever it hits, to suggest the ball and skateboard has collided.