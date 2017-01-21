var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });


function preload(){
	
    game.load.image('waves', 'assets/waves.png')
	game.load.image('player', 'assets/captain.png')
	game.load.image('sky', 'assets/sky1.png');
	// game.load.image('hook', 'assets/hook.png');
	
	
}

var NORMAL_SPEED = -5;
var waves;
var sky;
var player;
var hook;
var fishline;
var score;
var scoreText;



function create() {
	
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  sky
    sky = game.add.tileSprite(0, 0, 800, 600,'sky');

    //  waves
    waves = game.add.tileSprite(0, game.world.centerY-50, 800, 300, 'waves');
	console.log(waves);
	game.physics.arcade.enable(waves);
	waves.body.immovable = true;

    // Player
    player = game.add.sprite(100, 50, 'player');

	console.log(player);
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
	player.body.bounce.y = 0.2;
    player.body.gravity.y = 200;
    player.body.collideWorldBounds = true;
	
	// hook 
	hook = game.add.sprite(player.x,player.y+player.height+80,'hook');
	hook.body.collideWorldBounds = true;
	
	// line
	fishline = new Phaser.Line(player.x, player.y, player.x, hook.y);

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
	waves.tilePosition.x += NORMAL_SPEED;
	sky.tilePosition.x+= NORMAL_SPEED;
	fishline.fromSprite(player,hook);
	updateHook();
	
	// Collisions
	game.physics.arcade.collide(player, waves);
	


}

function updateHook() {
	if (cursors.down.isDown) {
		hook.velocity.y += 150;
	} else if (cursors.up.isDown) {
		if (! hook.y < player.y+player.height){
			hook.velocity.y -= 150;
		}
	}
}

function render() {

    game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 32);
    game.debug.text("Next tick: " + game.time.events.next.toFixed(0), 32, 64);

}