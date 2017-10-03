//       :::::::::  :::            :::   :::   ::: :::::::::: :::::::::    ::: :::
//      :+:    :+: :+:          :+: :+: :+:   :+: :+:        :+:    :+:  :+:   :+:
//     +:+    +:+ +:+         +:+   +:+ +:+ +:+  +:+        +:+    +:+ +:+     +:+
//    +#++:++#+  +#+        +#++:++#++: +#++:   +#++:++#   +#++:++#:  +#+     +#+
//   +#+        +#+        +#+     +#+  +#+    +#+        +#+    +#+ +#+     +#+
//  #+#        #+#        #+#     #+#  #+#    #+#        #+#    #+#  #+#   #+#
// ###        ########## ###     ###  ###    ########## ###    ###   ### ###
function Player( ) {
  this.deltaTime = 0;
  this.height    = 32;
  this.width     = 32;

  this.force     = 8;
  this.drag      = 0.4;

  this.air          = 100;
  this.airMax          = 100;
  this.airCooldown  = 1.2;
  this.canBlow      = true;
  this.isCharging   = false;
  this.chargeRate   = 20;
  this.blowRate     = 60;
  this.cooldownTimer = false;
}

//       ::::::::::: ::::    ::: ::::::::::: :::::::::::
//          :+:     :+:+:   :+:     :+:         :+:
//         +:+     :+:+:+  +:+     +:+         +:+
//        +#+     +#+ +:+ +#+     +#+         +#+
//       +#+     +#+  +#+#+#     +#+         +#+
//      #+#     #+#   #+#+#     #+#         #+#
// ########### ###    #### ###########     ###
Player.prototype.init = function(x,y){
  this.point = new Phaser.Point(x,y);
  this.createAirMeter();

  this.sprite = game.add.sprite(this.point.x, this.point.y, "player_img");
  this.sprite.anchor.setTo(0.5,0.5);

  game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
  this.sprite.body.collideWorldBounds = true;
  this.sprite.body.worldBounce = {x:1,y:1};
};

Player.prototype.preload = function(){
  game.load.image('player_img', 'assets/player.png');
  // game.load.image('blowParticle', 'assets/particles/blow.png');
};

//      :::    ::: :::::::::  :::::::::      ::: ::::::::::: ::::::::::
//     :+:    :+: :+:    :+: :+:    :+:   :+: :+:   :+:     :+:
//    +:+    +:+ +:+    +:+ +:+    +:+  +:+   +:+  +:+     +:+
//   +#+    +:+ +#++:++#+  +#+    +:+ +#++:++#++: +#+     +#++:++#
//  +#+    +#+ +#+        +#+    +#+ +#+     +#+ +#+     +#+
// #+#    #+# #+#        #+#    #+# #+#     #+# #+#     #+#
// ########  ###        #########  ###     ### ###     ##########
Player.prototype.update = function(){
  this.deltaTime = game.time.elapsed/1000;
  this.canBlow = this.air > 0;

  if( this.canBlow && game.input.activePointer.isDown ){
    this.boost();
  }else{
    this.break();
    this.charge();
  }
}; // update()

Player.prototype.boost = function( ){
  if(this.air > 0){
    this.isCharging = false;
    var angle = Math.atan2(this.sprite.body.position.y - game.input.y, this.sprite.body.position.x - game.input.x);
    var angleX = Math.sin(angle);
    var angleY = Math.cos(angle);
    this.sprite.body.velocity.y += angleX * this.force;
    this.sprite.body.velocity.x += angleY * this.force;

    this.air -= this.blowRate * this.deltaTime;
  }else{
    this.air = 0;
  }
  // this.emitBlow(angleX, angleY);
}; // boost()

Player.prototype.break = function( ){
  this.sprite.body.drag.x = Math.abs( this.sprite.body.velocity.x ) * this.drag;
  this.sprite.body.drag.y = Math.abs( this.sprite.body.velocity.y ) * this.drag;
  if( !this.cooldownTimer && this.air < this.airMax && !this.isCharging ){
    this.cooldownTimer = game.time.events.add(Phaser.Timer.SECOND * this.airCooldown, this.startCharging, this);
  }
  // Make sure the sprite stops moving completely when speed is minimal.
  // If speedvector is less than 1. Stop. Using simple pythagoras
  if( ( Math.pow( Math.abs( this.sprite.body.velocity.x ),2 ) + Math.pow( Math.abs( this.sprite.body.velocity.y ),2 ) ) < 1 ){
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
  }
}; // break()

Player.prototype.startCharging = function(){
  this.cooldownTimer = false;
  this.isCharging = true;
}; // startCharging()
Player.prototype.charge = function(){
  if(this.isCharging && this.air < this.airMax){
    this.air += this.chargeRate * this.deltaTime;
  }else if ( this.air > this.airMax ){
    this.air = this.airMax;
  }
}; // charge()
//           :::     ::::::::::: :::::::::    :::   :::   :::::::::: ::::::::::: :::::::::: :::::::::
//        :+: :+:       :+:     :+:    :+:  :+:+: :+:+:  :+:            :+:     :+:        :+:    :+:
//      +:+   +:+      +:+     +:+    +:+ +:+ +:+:+ +:+ +:+            +:+     +:+        +:+    +:+
//    +#++:++#++:     +#+     +#++:++#:  +#+  +:+  +#+ +#++:++#       +#+     +#++:++#   +#++:++#:
//   +#+     +#+     +#+     +#+    +#+ +#+       +#+ +#+            +#+     +#+        +#+    +#+
//  #+#     #+#     #+#     #+#    #+# #+#       #+# #+#            #+#     #+#        #+#    #+#
// ###     ### ########### ###    ### ###       ### ##########     ###     ########## ###    ###
Player.prototype.createAirMeter = function(){
  this.airMeterRect = new Phaser.Rectangle( 0, 0, this.width, this.width/5 ) ;
  this.airMeterBackRect = new Phaser.Rectangle( 0, 0, this.width, this.width/5 ) ;
}; // createAirMeter()
Player.prototype.drawAirMeter = function(){
  var airMeterColor = "rgba(255,0,0,1)";
  if(this.air > this.airMax / 2){
    airMeterColor = "rgba(0,255,0,1)";
  }else if(this.air > this.airMax / 5){
    airMeterColor = "rgba(255,155,0,1)";
  }
  this.airMeterRect.x = this.sprite.body.x;
  this.airMeterRect.y = this.sprite.body.y-this.height/2 - this.width/5;
  this.airMeterRect.width = this.width * ( this.air/this.airMax);
  this.airMeterBackRect.x = this.airMeterRect.x;
  this.airMeterBackRect.y = this.airMeterRect.y;
  game.debug.geom( this.airMeterBackRect, "rgba(160,160,160,1)" ) ;
  game.debug.geom( this.airMeterRect, airMeterColor ) ;
}; // drawAirMeter()

//       :::::::::  :::        ::::::::  :::       ::: ::::::::::   :::   :::   ::::::::::: ::::::::::: ::::::::::: :::::::::: :::::::::
//      :+:    :+: :+:       :+:    :+: :+:       :+: :+:         :+:+: :+:+:      :+:         :+:         :+:     :+:        :+:    :+:
//     +:+    +:+ +:+       +:+    +:+ +:+       +:+ +:+        +:+ +:+:+ +:+     +:+         +:+         +:+     +:+        +:+    +:+
//    +#++:++#+  +#+       +#+    +:+ +#+  +:+  +#+ +#++:++#   +#+  +:+  +#+     +#+         +#+         +#+     +#++:++#   +#++:++#:
//   +#+    +#+ +#+       +#+    +#+ +#+ +#+#+ +#+ +#+        +#+       +#+     +#+         +#+         +#+     +#+        +#+    +#+
//  #+#    #+# #+#       #+#    #+#  #+#+# #+#+#  #+#        #+#       #+#     #+#         #+#         #+#     #+#        #+#    #+#
// #########  ########## ########    ###   ###   ########## ###       ### ###########     ###         ###     ########## ###    ###
Player.prototype.createBlowEmitter = function(){
  this.blowEmitter = game.add.emitter(this.sprite.body.x, this.sprite.body.y, this.height, this.width);
  return this.blowEmitter;
};
Player.prototype.emitBlow = function(angleX, angleY){
  this.blowEmitter = ( typeof this.blowEmitter === "undefined")?this.createBlowEmitter():this.blowEmitter;
  this.blowEmitter.centerX = this.sprite.body.x + this.width/2;
  this.blowEmitter.centerY = this.sprite.body.y + this.height/2;
};

//       :::::::::  :::::::::: ::::    ::: :::::::::  :::::::::: :::::::::
//      :+:    :+: :+:        :+:+:   :+: :+:    :+: :+:        :+:    :+:
//     +:+    +:+ +:+        :+:+:+  +:+ +:+    +:+ +:+        +:+    +:+
//    +#++:++#:  +#++:++#   +#+ +:+ +#+ +#+    +:+ +#++:++#   +#++:++#:
//   +#+    +#+ +#+        +#+  +#+#+# +#+    +#+ +#+        +#+    +#+
//  #+#    #+# #+#        #+#   #+#+# #+#    #+# #+#        #+#    #+#
// ###    ### ########## ###    #### #########  ########## ###    ###
Player.prototype.render = function(){
  this.drawAirMeter();

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
}; // render()
