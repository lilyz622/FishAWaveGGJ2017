var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Fish A Wave', { preload: preload, create: create, update: update });


function preload(){
	
 game.load.image('sky', 'assets/sky1.png');
 game.load.image('redPirate', 'assets/pirate-red.png');
 game.load.image('purplePirate', 'assets/pirate-purple.png');
 game.load.image('waves', 'assets/waves.png');
 game.load.image('captain', 'assets/captain.png');
 
	
	
}

var waves;
var player;
var cursors;
var fish;
var score;
var scoreText;
var sound;
var pirateShip;
var shark;
var fishText;


function create() {
	
	  //add sound
	//game.input.touch.preventDefault = false;
	//sound = game.add.audio('music');
	//sound.play();
	//game.input.onDown.add(restartMusic, this);
	
	//  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');
	//school = game.add.tileSprite(0, 0, 800, 600, 'clouds');

    //  The platforms group contains the waves we are sailing on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the waves
    waves = platforms.create(0, game.world.height - 200, 'waves');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    waves.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
   waves.body.immovable = true;

   

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'captain');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. No bounce for the ship.
      player.body.bounce.y = 0;
      player.body.gravity.y = 400;
      player.body.collideWorldBounds = true;

    //  Our two animations, sailing left and right.
  //  player.animations.add('left', [1, 5, 9, 13], 16, true);
	//player.animations.add('right', [3, 7, 11, 15], 16, true);

   

    //  The score
    //scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
	//The fish count
	//fishText = game.add.text(16, 32, 'Fish: 0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    //cursors = game.input.keyboard.createCursorKeys();
	
	
	//  The first parameter is how long to wait before the event fires. In this case 5 seconds (you could pass in 2000 as the value as well.)
    //  The second parameter is how many times the event will run in total. Here we'll run it 2 times.
    //  The next two parameters are the function to call ('createBall') and the context under which that will happen.

    //  Once the event has been called 2 times it will never be called again.

}



function update() {
	
	
	
	
}

function render() {
	
	//game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 32);
    //game.debug.text("Next tick: " + game.time.events.next.toFixed(0), 32, 64);
	
}