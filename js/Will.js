var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Fish A Wave', { preload: preload, create: create, update: update });


function preload(){
	
	game.load.image('sky', 'assets/sky.png');
	game.load.image('pirate', 'assets/pirate-red.png');
	//game.load.image('purplePirate', 'assets/pirate-purple.png');
	game.load.image('waves', 'assets/waves2.png');
	game.load.spritesheet('captain', 'assets/captain.png');
	game.load.image('fish', 'assets/fish.png');
	game.load.image('shark', 'assets/shark.png');
	game.load.image('menu', 'assets/blackbox.png', 300, 180);
	game.load.image('ammoFish', 'assets/ammoFish.png');
 
 
	//add sound
	//game.load.audio('music', 'assets/sound/Waves_Crashing_on_Rock_Beach.mp3'); 
	
}
var hook;
var waves;
var player;
var cursors;
var fish;
var timer;
var score = 0;
var scoreText;
var sound;
var pirate;
var shark;
var fishText;
var NORMAL_SPEED = 5;
var ammoFish;
//var fishes;

//add sound
var sound;

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
	
	 //  waves
    waves = game.add.tileSprite(0, game.world.height - 200, 800, 200, 'waves');
	
	game.physics.arcade.enable(waves);
	waves.body.immovable = true;
   
    //fishes = game.add.group();

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 600, 'captain');
	//player.scale.setTo(64,64);

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. No bounce for the ship.
      player.body.bounce.y = 0.1;
      player.body.gravity.y = 600;
      player.body.collideWorldBounds = true;

    //  The score
    scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
	timer = game.time.create(false);
	timer.loop(700, updateScore, this);
	timer.start();
	//The fish count
	fishText = game.add.text(16, 40, 'Fish:   0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
	
	game.time.events.repeat(Phaser.Timer.SECOND * 2, createFish, this);
	game.time.events.repeat(Phaser.Timer.SECOND * 4, createPirate, this);
	game.time.events.repeat(Phaser.Timer.SECOND * 7, createShark, this);
	
	
	
	//  The first parameter is how long to wait before the event fires. In this case 5 seconds (you could pass in 2000 as the value as well.)
    //  The second parameter is how many times the event will run in total. Here we'll run it 2 times.
    //  The next two parameters are the function to call ('createBall') and the context under which that will happen.

    //  Once the event has been called 2 times it will never be called again.

}



function update() {
	
		// Collide 
	game.physics.arcade.collide(player, waves);
	game.physics.arcade.collide(pirate, waves);
	
	
	//Check if player overlaps with fishes
	//game.physics.arcade.overlap(player, fish, collectFish, null, this);
	
	//  Reset the players velocity (movement)
    player.body.velocity.x = 0;

	waves.tilePosition.x += NORMAL_SPEED;
	
	if (cursors.up.isDown && player.body.touching.down)
	{
		player.body.velocity.y = -300;
	}
	//if (cursors.right.isDown)
	//{
	//	fireFish();
	//}

	game.physics.arcade.overlap(hook, fish, collectFish, null, this);
	game.physics.arcade.overlap(player, shark, endGame, null, this);
	game.physics.arcade.overlap(player, pirate, endGame, null, this);
	game.physics.arcade.overlap(ammoFish, pirate, killPirate, null, this);
	game.physics.arcade.overlap(fishline, shark, endGame, null, this);
	game.physics.arcade.overlap(hook, shark, endGame, null, this);
		
	
	
}
//function restartMusic() {
	
//	sound.restart();
	
//}

function createFish()
{
	
	fish = game.add.sprite(900, 500, 'fish');
	game.physics.arcade.enable(fish);
	fish.body.velocity.x = -150;
	
}

function createPirate()
{
	pirate = game.add.sprite(1000, 100, 'pirate');
	game.physics.arcade.enable(pirate);
	pirate.body.velocity.x = -200;
	game.physics.arcade.collide(pirate, waves);
	pirate.body.gravity.y = 600;
}

function collectFish() {
	
	//todo
}

function killPirate()
{
	
	
	try {
		pirate.kill();
	}
	catch (err)
	{
		
	}
	
}

function fireFish()
{
	ammoFish = game.add.sprite(player.x + 148, player.y + 71, 'ammoFish');
	game.physics.arcade.enable(ammoFish);
	ammoFish.velocity.x = 400;
	game.physics.arcade.collide(ammoFish, pirate);
}

function createShark()
{
	shark = game.add.sprite(900, game.world.height - 230, 'shark');
	game.physics.arcade.enable(shark);
	shark.body.velocity.x = -150;
}

function updateScore()
{
	score++;
	scoreText.setText('Score: ' + score);
}

function endGame() {
	
	game.paused = true;
	var w = game.world.width;
	var h = game.world.height;

	// Then add the menu
	var menu = game.add.sprite(w/2, h/2, 'menu');
	menu.anchor.setTo(0.5, 0.5);
	
	var endMessage = "GAME OVER\nYOUR SCORE: " + score;
	var endText = game.add.text(game.world.centerX, game.world.centerY, endMessage,{fill: '#fff' });
	endText.anchor.setTo(0.5,0.5);

	// And a label to illustrate which menu item was chosen. (This is not necessary)
	var choiseLabel = game.add.text(game.world.centerX, game.world.centerY + menu.height/2+30, 'Click here to restart', {fill: '#000000' });
	choiseLabel.anchor.setTo(0.5, 0.5);

	
	// Add a input listener that can help us return from being paused
    game.input.onDown.add(restart, self);
	function restart(event){
		location.reload();
	}
	
}

function render() {
	
	//game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 32);
    //game.debug.text("Next tick: " + game.time.events.next.toFixed(0), 32, 64);
	
	//sound-related
	//game.debug.soundInfo(sound, 20, 32);
}