// Creates enemy sprite
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
}

// Updates the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (Math.random() * (380 - 100) + 100) * dt;
    
    if (this.x > 606) {
      this.x = -150 - (Math.random() * (300 - 1) + 1);
    }
}
 
// Draws enemy sprites to the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Player class/ creates Player sprite
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
}

Player.prototype.update = function(dt) {

  // reset Players position when hits the water image
    if (this.y < 0) {
      this.reset();
      alert("You Win!");
      console.log('Win(s)');    // prints score to the console 
   }   
}

// check for enemy/Player collisions
var checkCollisions = function() {
    allEnemies.forEach(function(enemy) {
    if(enemy.x < player.x + 60 &&
       enemy.x + 60 > player.x &&
       enemy.y < player.y + 60 &&
       enemy.y + 60 > player.y) {
       alert("You Lose, Try Again.")
       player.reset();
    }
  });
}


// Resets player to start position
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 380;
}

// renders the Player image
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// character controls
// handleInput() method.
Player.prototype.handleInput = function(key) {
    switch(key) {
    case 'up':
      if (this.y > 0){
        this.y -= 83;
      }
      break;
    case 'down':
      if (this.y < 375) {
        this.y += 83;
      }
      break;
    case 'left':
      if (this.x > 0) {
        this.x -= 101;
      }
      break;
    case 'right':
      if (this.x < 404){
        this.x += 101;
      }
      break;
  }
}


// Now instantiate your objects.
var enemy1 = new Enemy(-100,60);
var enemy2 = new Enemy(-200,140);
var enemy3 = new Enemy(-50,225);
var enemy4 = new Enemy(-350,140);


// Places all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4];



// Places the player object in a variable called player
var player = new Player(202, 380);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
    };

    player.handleInput(allowedKeys[e.keyCode]);
});