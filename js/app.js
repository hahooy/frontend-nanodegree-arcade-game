// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;    
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
	// the bug is moving
	this.x = (this.x + this.speed * dt);
    } else {
	// reset the enemy when the it is off the board
	this.x = -101;
	this.y = (1 + Math.trunc(Math.random() * 3)) * 83 - 20;
	this.speed = 200 + Math.random() * 300;
    }
    if (this.isCollided()) {
	player.reset();
	score.n -= 10;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.isCollided = function() {
    if (this.x + 60 > player.x && this.x < player.x + 60
	&& this.y + 20 > player.y && this.y < player.y + 20) {
	return true;
    }	
    return false;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(dt) {
    if (this.y < 20) {
	player.reset();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (key === 'up' && this.y > 0) {
	this.y -= 83;
    } else if (key === 'down' && this.y + 200 < 586) {
	this.y += 83;
    } else if (key === 'left' && this.x > 0) {
	this.x -= 101;
    } else if (key === 'right' && this.x + 101 < 505) {
	this.x += 101;
    }
};

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 395;
};

var Gem = function(row, col) {
    this.x = col * 101;
    this.y = row * 83 - 20;
    this.colliding = true;
};

Gem.prototype.render = function() {
    if (this.colliding) {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

Gem.prototype.update = function() {
    this.collide();
    if (!this.colliding) {

    }
/*    
    allGems = allGems.filter(function(gem) {

	if(gem.isCollided()) {
	    return false;
	} else {
	    return true;
	}
    });
*/
};		      		      

Gem.prototype.collide = function() {
    if (this.x + 60 > player.x && this.x < player.x + 60
	&& this.y + 60 > player.y && this.y < player.y + 60 && this.colliding) {
	this.colliding = false;
	score.n += this.point;
    }
};

var GemBlue = function(row, col) {
    Gem.call(this, row, col);
    this.sprite = 'images/Gem Blue.png';
    this.point = 200;
};
GemBlue.prototype = Object.create(Gem.prototype);
GemBlue.prototype.constructor = GemBlue;

var GemGreen = function(row, col) {
    Gem.call(this, row, col);
    this.sprite = 'images/Gem Green.png';
    this.point = 100;
};
GemGreen.prototype = Object.create(Gem.prototype);
GemGreen.prototype.constructor = GemGreen;

var Score = function(n) {
    this.n = n;
}

Score.prototype.render = function() {
    ctx.font = "26px sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score.n.toString(), 10, 83);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(-101, 83 - 20, 50), new Enemy(-101, 2 * 83 - 20, 100), new Enemy(-101, 83 - 20, 200)];
var allGems = [new GemBlue(2, 3), new GemGreen(1, 1)];
var player = new Player(202, 395);
var score = new Score(0);

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

