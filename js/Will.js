var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });


function preload(){
	
	
	
}

var stuff;



function create() {
	
	
	
	
	
}



function update() {
	
	
	
	
}

function render() {
	
	game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 32);
    game.debug.text("Next tick: " + game.time.events.next.toFixed(0), 32, 64);
	
}