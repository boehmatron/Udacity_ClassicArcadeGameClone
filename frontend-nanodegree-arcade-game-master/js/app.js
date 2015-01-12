// General global variables
var tileHeight = 84;
var tileWidth = 101;
var enemyMinSpeed = 200;
var enemyMaxSpeed = 300;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 200;
    this.y = Math.floor((Math.random() * 4) + 1) * tileHeight - 30;
    this.speed = Math.random() * (enemyMaxSpeed - enemyMinSpeed) + enemyMinSpeed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt * this.speed;

    if (this.x > ctx.canvas.width){
    	this.x = - 80;
    	this.speed = Math.random() * (enemyMaxSpeed - enemyMinSpeed) + enemyMinSpeed;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){

	this.sprite = 'images/char-boy.png';
	this.x= 200;
	this.y= 380;
}


Player.prototype.update = function(){

}

Player.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

Player.prototype.handleInput = function(direction){
	var currentX = this.x;
	var currentY = this.y;

	switch(direction){
		case "left":
			currentX = this.x - tileWidth;
			break;

		case "right":
			currentX = this.x + tileWidth;
			break;

		case "up":
			currentY = this.y - tileHeight;
			break;

		case "down":
			currentY = this.y + tileHeight;
			break;
	}

	this.x = currentX;
	this.y = currentY;

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy01 = new Enemy();
var enemy02 = new Enemy();
var enemy03 = new Enemy();

var allEnemies = [enemy01, enemy02, enemy03];

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
