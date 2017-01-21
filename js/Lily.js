var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });


function preload(){
	
    game.load.image('waves', 'assets/waves.png')
	game.load.image('player', 'assets/fish.png')
	
	
}

var NORMAL_SPEED = 150;

var waves;
var player;
var score;
var scoreText;



function create() {
	
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  sky for our game
    game.add.sprite(0, 0, 'sky');

    //  ocean 
    waves = game.add.tileSprite(0, game.world.centerY-50, 800, 300, 'ocean');
	console.log(waves);
	game.physics.arcade.enable(waves);
	waves.body.immovable = true;

    // The player and its settings
    player = game.add.sprite(100, game.world.height - 150, 'player');
	console.log(player);

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
	player.body.bounce.y = 0.2;
    player.body.gravity.y = 400;
    player.body.collideWorldBounds = true;

    //  The score
    scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    //The fish count
    fishText = game.add.text(16, 32, 'Fish: 0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();


    //  The first parameter is how long to wait before the event fires. In this case 5 seconds (you could pass in 2000 as the value as well.)
    //  The second parameter is how many times the event will run in total. Here we'll run it 2 times.
    //  The next two parameters are the function to call ('createBall') and the context under which that will happen.

    //  Once the event has been called 2 times it will never be called again.

}



function update() {
	//  Reset the players velocity (movement)
    player.body.velocity.x = 0;
	ocean.tilePosition.x += NORMAL_SPEED


}

function render() {

    game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 32);
    game.debug.text("Next tick: " + game.time.events.next.toFixed(0), 32, 64);

}