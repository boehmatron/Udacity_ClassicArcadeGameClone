// General global variables
var tileHeight = 84;
var tileWidth = 101;
var enemyMinSpeed = 200;
var enemyMaxSpeed = 300;
var numberOfEnemies = 6;
var playerScore = 0;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 200;
    this.y = Math.floor((Math.random() * 4) + 1) * tileHeight - 30;
    this.speed = Math.random() * (enemyMaxSpeed - enemyMinSpeed) + enemyMinSpeed;
    this.height = 171;
    this.width = 101;

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
	this.height = 171;
    this.width = 101;
}


Player.prototype.update = function(){
	this.checkEnemyCollisions();

}


Player.prototype.reset = function(){
	this.x= 200;
	this.y= 380;
}

Player.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

	ctx.font = "20pt Arial";
    ctx.fillText(playerScore, 20, 80);

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

	//Avoid character to fall off the canvas horizontally
	if (currentX < -10 || currentX > 420) {
		this.x = this.x;
	} else {
		this.x = currentX;
	}

	//Avoid character to fall off the canvas vertically
	if (currentY < -40 || currentY > 420) {
		this.y = this.y;
	} else {
		this.y = currentY;
	}

	if (currentY < 0) {
		playerScore++;
		this.reset();
	}

}

// Helper function for collision detection
Player.prototype.checkEnemyCollisions = function(){

	for(var i = 0; i <= numberOfEnemies-1; i++){
		if(detectCollision(this,allEnemies[i])){
		this.reset();			
		}
	}

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var createEnemies = function(numEnemies) {
	var enemyArray = [];
	var enemy;

	for (var i=0; i < numEnemies; i++) {
		enemy = new Enemy();
		enemyArray.push(enemy);
	}
	return(enemyArray);
};

var allEnemies = createEnemies(numberOfEnemies);
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

// Additional small helper function to detect collision 
// between two objects
var detectCollision = function(rect1, rect2) {
	console.log(rect1.y, rect2.x);

	if (rect1.x < rect2.x + rect2.width-20 &&
		rect1.x + rect1.width-20 > rect2.x &&
		rect1.y < rect2.y + rect2.height-100 &&
		rect1.height-100 + rect1.y > rect2.y) {
		return true;
}
};
