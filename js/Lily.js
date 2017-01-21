var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });


function preload(){
	
    game.load.image('ocean', 'assets/waves.png')
	game.load.image('player', 'assets/boat.png', 64,96,16)
	
	
}

var NORMAL_SPEED = 150;

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
	
    ////add sound
    //game.input.touch.preventDefault = false;
    //sound = game.add.audio('music');
    //sound.play();
    //game.input.onDown.add(restartMusic, this);
	
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    ////  sky for our game
    //game.add.sprite(0, 0, 'sky');

    //  ocean 
    ocean = game.add.tileSprite(0, game.world.centerY, 800, 300, 'ocean');
	ocean.body.immovable = true;

    // //  The platforms group contains the ground and waves we are sailing on
    // platforms = game.add.group();

    // //  We will enable physics for any object that is created in this group
    // platforms.enableBody = true;

    // // Here we create the ground.
    // var ground = platforms.create(0, game.world.height - 64, 'ground');

    // //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    // ground.scale.setTo(2, 2);

    // //  This stops it from falling away when you jump on it
    // ground.body.immovable = true;

    //  The wave form
    //***Playing with beizer curves

    // The player and its settings
    player = game.add.sprite(0, 0, 'player');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. No bounce for the ship.
    player.body.bounce.y = 0;
    player.body.gravity.y = 400;
    player.body.collideWorldBounds = true;

    //  Our two animations, sailing left and right.
    player.animations.add('left', [0, 1, 2, 3], 16, true);
    player.animations.add('right', [4, 5, 6, 7], 16, true);

   

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

    // if (cursors.left.isDown)
    // {
        // //  Move to the left
        // player.body.velocity.x = ;

        // player.animations.play('left');
		// ocean.tilePosition.x+= NORMAL_SPEED;
    // }
    // else if (cursors.right.isDown)
    // {
        // //  Move to the right
        // player.body.velocity.x = 150;

        // player.animations.play('right');
		// ocean.tilePosition.x-= NORMAL_SPEED;
    // }
    // else
    // {
        // //  Stand still
        // player.animations.stop();

        // player.frame = 4;
    // }



}

function render() {

    game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 32);
    game.debug.text("Next tick: " + game.time.events.next.toFixed(0), 32, 64);

}