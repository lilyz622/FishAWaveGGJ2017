var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });


function preload(){
	
    game.load.image('waves', 'assets/waves2.png')
	game.load.image('player', 'assets/captain.png')
	game.load.image('sky', 'assets/sky1.png');
	game.load.image('hook', 'assets/hook.png');
	
	// added
	game.load.image('fish', 'assets/fish.png');
	game.load.image('ammoFish', 'assets/fish.png');
	game.load.image('menu', 'assets/blackbox.png', 300, 180);
	game.load.image('pirate', 'assets/pirate-red.png');
	game.load.image('shark', 'assets/shark.png');
	// add sound
	//add sound
	game.load.audio('water', 'assets/audio/3m51s-water.mp3'); 
	game.load.audio('dramatic', 'assets/audio/18s-dramatic.mp3');
	
	
}

var NORMAL_SPEED = -5;
var HX_OFFSET =90;
var LY_OFFSET =15;
var waves;
var sky;
var player;
var hook;
var fishline;
var score = 0;
var scoreText;
var timer;
// added
var fish;
var menu;
var pirate;
var fishText;
var shark;

var ammoFish;
var fishCount = 3;

//add sound
var waterSound;
var dramaticSound;


function create() {
	
	waterSound = game.add.audio('water');
	dramaticSound = game.add.audio('dramatic', 1, true);
	waterSound.play();
	waterSound.onStop.add(playbackDramatic);
	
	
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  sky
    sky = game.add.tileSprite(0, 0, 800, 600,'sky');

    //  waves
    waves = game.add.tileSprite(0, game.world.centerY-50, 800, 350, 'waves');
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
	hook = game.add.sprite(player.x+HX_OFFSET,player.y+player.height*2,'hook');
	game.physics.arcade.enable(hook);
	hook.body.gravity.y = 1;
	hook.body.collideWorldBounds = true;
	
	// line
	//  Create a BitmapData just to plot to
	fishline = new Phaser.Line(player.x+HX_OFFSET, player.y+LY_OFFSET, hook.x, hook.y);

    //  The score
    scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
	timer = game.time.create(false);
	timer.loop(700, updateScore, this);
	timer.start();
	
	//The fish count
    fishText = game.add.text(16, 50, 'Fish:\t'+fishCount, { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

	game.time.events.repeat(Phaser.Timer.SECOND * 3, 20, createFish, this);
	game.time.events.repeat(Phaser.Timer.SECOND * 5, 20, createPirate, this);
	game.time.events.repeat(Phaser.Timer.SECOND * 7, 20, createShark, this);
	
	

    //  The first parameter is how long to wait before the event fires. In this case 5 seconds (you could pass in 2000 as the value as well.)
    //  The second parameter is how many times the event will run in total. Here we'll run it 2 times.
    //  The next two parameters are the function to call ('createBall') and the context under which that will happen.

    //  Once the event has been called 2 times it will never be called again.

}



function update() {
	//  Reset the players velocity (movement)
    player.body.velocity.x = 0;
	waves.tilePosition.x += NORMAL_SPEED;
	sky.tilePosition.x+= NORMAL_SPEED*.5;
	updateHook();
	fishline.setTo(player.x+HX_OFFSET,player.y+LY_OFFSET,hook.x,hook.y);
	
	// Collisions
	game.physics.arcade.collide(player, waves);
	
	// Added
	game.physics.arcade.collide(pirate, waves);
	if (cursors.up.isDown && player.body.touching.down)
	{
		player.body.velocity.y = -300;
	}
	// game.physics.arcade.overlap(player, fish, collectFish, null, this);
	game.physics.arcade.overlap(player, shark, endGame, null, this);
	game.physics.arcade.overlap(player, pirate, endGame, null, this);
	
	// ammoFish
	if (cursors.right.isDown && fishCount > 0) {
		shootFish();
	}
	try {
		game.physics.arcade.overlap(ammoFish, pirate, killPirate, null, this);
	} catch (err) {
		
	}
	// game.physics.arcade.overlap(ammoFish,pirate, killPirate, null, this);
	game.physics.arcade.overlap(hook, fish, collectFish, null, this);
	game.physics.arcade.overlap(fishline, shark, endGame, null, this);
	game.physics.arcade.overlap(hook, shark, endGame, null, this);
}

function render() {
	
	game.debug.geom(fishline,'black');

}

function updateHook() {
	hook.body.velocity.y = 0;
	if (cursors.down.isDown) {
		hook.body.velocity.y += 150;
	} else {
		if (! (hook.y < (player.y+player.height))){
			hook.body.velocity.y -= 150;
		} else {
			hook.body.velocity.y = 0;
		}
	}
}

// mine
function shootFish() {
	ammoFish = game.add.sprite(player.x+player.width, player.y+50, 'ammoFish');
	game.physics.arcade.enable(ammoFish);
	ammoFish.body.velocity.x = 250;
	fishCount = fishCount-1;
	fishText.text = "Fish:\t"+fishCount;
}

function killPirate(ammoFish, pirate) {
	try {
		ammoFish.kill();
		pirate.kill();
	} catch (err) {
		
	}
}

// Added
function createFish()
{	
	fish = game.add.sprite(900, 500, 'fish');
	game.physics.arcade.enable(fish);
	fish.body.velocity.x = -300;
}

function createPirate()
{
	if (waterSound.isPlaying)
	{	
		waterSound.stop();
	}
	else 
	{
		dramaticSound.resume();
	}
	pirate = game.add.sprite(800, 0, 'pirate');
	game.physics.arcade.enable(pirate);
	pirate.body.velocity.x = -200;
	game.physics.arcade.collide(pirate, waves);
	pirate.body.gravity.y = 600;
}

function createShark()
{
	shark = game.add.sprite(900, game.world.height - 200, 'shark');
	game.physics.arcade.enable(shark);
	shark.body.velocity.x = -150;
}

function updateScore()
{
	score++;
	scoreText.setText('Score: ' + score);
}

function collectFish(hook, fish) {
	try {
		fish.kill();
		fishCount++;
	} catch (err) {
		
	}	
	fishText.text = "Fish:\t"+fishCount;
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

function playbackDramatic() {
	dramaticSound.play();
}
