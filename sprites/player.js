function Player( ) {
  this.deltaTime = 0;
  this.height    = 16;
  this.width     = 16;

  this.force     = 8;
  this.drag      = 0.4;

  this.air          = 100;
  this.airCooldown  = 1.2;
  this.canBlow      = true;
  this.isCharging   = true;
  this.chargeRate   = 5;
  this.blowRate     = 2;
}

Player.prototype.init = function(x,y){
  this.point = new Phaser.Point(x,y);

  this.sprite = game.add.sprite(this.point.x, this.point.y, "player_img");
  this.sprite.anchor.setTo(0.5,0.5);

  game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
  this.sprite.body.collideWorldBounds = true;
  this.sprite.body.worldBounce = {x:1,y:1};
};

Player.prototype.preload = function(){
  game.load.image('player_img', 'assets/player.png');
};


Player.prototype.update = function(){
  this.deltaTime = game.time.elapsed/1000;
  this.canBlow = this.air > this.blowRate;

  if( this.canBlow && game.input.activePointer.isDown ){
    this.boost();
  }else{
    this.break();
    this.charge();
  }
};

Player.prototype.boost = function( ){
  var angle = Math.atan2(this.sprite.body.position.y - game.input.y, this.sprite.body.position.x - game.input.x);
  this.sprite.body.velocity.y += Math.sin(angle) * this.force;
  this.sprite.body.velocity.x += Math.cos(angle) * this.force;

  this.air -= this.blowRate * this.deltaTime;
};

Player.prototype.break = function( ){
  this.sprite.body.drag.x = Math.abs( this.sprite.body.velocity.x ) * this.drag;
  this.sprite.body.drag.y = Math.abs( this.sprite.body.velocity.y ) * this.drag;
};

Player.prototype.render = function(){
  // game.debug.geom(this.point, 'rgb(0,255,0)');
  var debugstr = "Air: "+this.air;
  game.debug.text(debugstr, 10, 12, 'rgb(255,0,255)');

  debugstr = "canBlow: "+this.canBlow;
  game.debug.text(debugstr, 10, 24, 'rgb(255,0,255)');

  debugstr = "isCharging: "+this.isCharging;
  game.debug.text(debugstr, 10, 36, 'rgb(255,0,255)');

  debugstr = "airCooldown: "+this.airCooldown;
  game.debug.text(debugstr, 10, 48, 'rgb(255,0,255)');

  debugstr = "chargeRate: "+this.chargeRate;
  game.debug.text(debugstr, 10, 60, 'rgb(255,0,255)');

  debugstr = "blowRate: "+this.blowRate;
  game.debug.text(debugstr, 10, 72, 'rgb(255,0,255)');
};
