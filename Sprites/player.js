function Player( ) {
  this.height    = 16;
  this.width     = 16;
  this.speed     = {
    x: 0,
    y: 0,
  };
  this.topSpeed  = 10;
  this.accel     = 1.04;
  this.friction  = 0.97;

  this.rotation  = 0;
  this.rotationSpeed  = 0.07;

  this.keys = {
    turnLeft:  Phaser.Keyboard.LEFT,
    turnRight: Phaser.Keyboard.RIGHT,
    accel: Phaser.Keyboard.UP,
  };
}

Player.prototype.init = function(x,y){
  this.point = new Phaser.Point(x,y);

  this.sprite = game.add.sprite(this.point.x, this.point.y, "player_img");
  this.sprite.anchor.setTo(0.5,0.5);

  game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

};

Player.prototype.preload = function(){
  game.load.image('player_img', 'assets/player.png');
};


Player.prototype.update = function(){

  // Rotate
  this.sprite.body.velocity.x = this.sprite.body.velocity.x * this.friction;
  this.sprite.body.velocity.y = this.sprite.body.velocity.y * this.friction;
  if( game.input.keyboard.isDown(this.keys.turnLeft) || game.input.keyboard.isDown(this.keys.turnRight) ){
    if(game.input.keyboard.isDown(this.keys.turnLeft)){
      this.rotate('left');
    }else{
      this.rotate('right');
    }
  }
  if(game.input.keyboard.isDown(this.keys.turnLeft)){
    this.boost();
  }else{
    this.break();
  }
console.log(this.sprite.body.angularVelocity);
  this.point.x += this.speed.x;
  this.point.y += this.speed.y;

};

Player.prototype.rotate = function( dir ){
  // this.rotation += this.rotationSpeed * dir;
  this.sprite.body.angularVelocity = (dir === 'right')?200:-200;
};

Player.prototype.boost = function( ){
  game.physics.arcade.velocityFromAngle(this.sprite.angle, 300, this.sprite.body.velocity);
};

Player.prototype.break = function( ){
  this.sprite.body.angularVelocity = this.sprite.body.angularVelocity * this.friction;
};

Player.prototype.render = function(){
  game.debug.geom(this.point, 'rgb(0,255,0)');
};
