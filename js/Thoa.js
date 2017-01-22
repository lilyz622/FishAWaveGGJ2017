var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Fish A Wave', { preload: preload, create: create, update: update, render: render });


function preload(){
	
	game.load.image('sky', 'assets/sky.png');
	game.load.image('pirate', 'assets/pirate-red.png');
	//game.load.image('purplePirate', 'assets/pirate-purple.png');
	game.load.image('waves', 'assets/waves.png');
	game.load.spritesheet('captain', 'assets/captain.png', 259, 185, 1);
	game.load.image('fish', 'assets/fish.png');
	game.load.image('shark', 'assets/shark.png');
	game.load.image('menu', 'assets/blackbox.png', 300, 180);
 
 
	//add sound
	game.load.audio('water', 'assets/audio/3m51s-water.mp3'); 
	game.load.audio('dramatic', 'assets/audio/18s-dramatic.mp3');
}

var waves;
var player;
var cursors;
var fish;
var score;
var scoreText;
var pirate;
var shark;
var fishText;
var NORMAL_SPEED = 5;

//add sound
var waterSound;
var dramaticSound;

function create() {
	
	waterSound = game.add.audio('water');
	dramaticSound = game.add.audio('dramatic', true);
	waterSound.duration = 5;
	waterSound.play();
	waterSound.onStop.add(playbackDramatic);
	
	/* waterSound = game.add.audio('water');
	waterSound.addMarker('endPeace', 0, 5, 1, false);
	waterSound.play('endPeace');
	
	dramaticSound = game.add.audio('dramatic');
	dramaticSound.play();
	dramaticSound.loopFull(); */
			/* //add sound
			game.input.touch.preventDefault = false;
			sound = game.add.audio('music');
			sound.play();
			game.input.onDown.add(restartMusic, this);
			
			//create a SoundManager managing the 3 sound files
			sounds = new SoundManager(game);
			//all sounds are muted the game pauses (such as at loss of focus),
			//to keep they playing regardless of the game pause state, set muteOnPause to false.
			sounds.touchLocked = true;
			sounds.play('music');
			sounds.add('overture');
			sounds.add('dramatic'); */
			
			
			/* secondOverture = game.add.audio('overture');
			secondOverture.play();
			thirdDramatic = game.add.audio('dramatic', 1, true);
			thirdDramatic.play(); */

			/* sounds = [ firstWater, secondOverture, thirdDramatic ];

			//  Being mp3 files these take time to decode, so we can't play them instantly
			//  Using setDecodedCallback we can be notified when they're ALL ready for use.
			//  The audio files could decode in ANY order, we can never be sure which it'll be.

			game.sound.setDecodedCallback(sounds, start, this); */
	
	//  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');
	//school = game.add.tileSprite(0, 0, 800, 600, 'clouds');
	
	 //  waves
    waves = game.add.tileSprite(0, game.world.height - 200, 800, 300, 'waves');
	
	game.physics.arcade.enable(waves);
	waves.body.immovable = true;
   

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
	//The fish count
	fishText = game.add.text(16, 40, 'Fish:   0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
	
	game.time.events.add(Phaser.Timer.SECOND * 2, createFish, this);
	game.time.events.add(Phaser.Timer.SECOND * 5, createPirate, this);
	
	
	//  The first parameter is how long to wait before the event fires. In this case 5 seconds (you could pass in 2000 as the value as well.)
    //  The second parameter is how many times the event will run in total. Here we'll run it 2 times.
    //  The next two parameters are the function to call ('createBall') and the context under which that will happen.

    //  Once the event has been called 2 times it will never be called again.

}



function update() {
	
		// Collide 
	game.physics.arcade.collide(player, waves);
	
	//Check if player overlaps with fishes
	//game.physics.arcade.overlap(player, fish, collectFish, null, this);
	
	//  Reset the players velocity (movement)
    player.body.velocity.x = 0;

	waves.tilePosition.x += NORMAL_SPEED;
	
	if (cursors.up.isDown && player.body.touching.down)
	{
		player.body.velocity.y = -300;
	}

	game.physics.arcade.overlap(player, fish, collectFish, null, this);
	game.physics.arcade.overlap(player, shark, endGame, null, this);
	game.physics.arcade.overlap(player, pirate, endGame, null, this);
	
	
	
}
/* function restartMusic() {
	
	sound.restart();
	
} */
/* function start() {

    sounds.shift();

	firstWater.loopFull(1);
    firstWater.onLoop.add(hasLooped, this);
}
function hasLooped(sound) {

    loopCount++;

    if (loopCount === 1)
    {
        sounds.shift();
        secondOverture.loopFull(1);
    }
    else if (loopCount > 1)
    {
        sounds.shift();
		thirdDramatic.loopFull();
    }
    /* else if (loopCount > 2)
    {
        current.stop();
        current = game.rnd.pick(sounds);
        current.loopFull();
    } */


function createFish()
{
	try {
		fish.kill();
	} catch (err){
		
	}
	
	
	fish = game.add.sprite(900, 500, 'fish');
	game.physics.arcade.enable(fish);
	fish.body.velocity.x = -150;
	
}

function createPirate()
{
	pirate = game.add.sprite(900, 0, 'pirate');
	game.physics.arcade.enable(pirate);
	pirate.body.velocity.x = -200;
	game.physics.arcade.collide(pirate, waves);
	pirate.body.gravity.y = 400;
}

function collectFish() {
	
	//todo
}

function endGame() {
	
	game.paused = true;
	var w = game.world.width;
	var h = game.world.height;

	// Then add the menu
	var menu = game.add.sprite(w/2, h/2, 'menu');
	menu.anchor.setTo(0.5, 0.5);
	
	var endMessage = "GAME OVER";
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

function playbackDramatic() {
	dramaticSound.play();
}
function render() {
	
	//game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 32);
    //game.debug.text("Next tick: " + game.time.events.next.toFixed(0), 32, 64);
	
	//sound-related
	game.debug.soundInfo(waterSound, 20, 32);
	game.debug.soundInfo(dramaticSound, 20, 140);
}