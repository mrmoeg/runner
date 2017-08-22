var gameState = {
   // Object to hold the player object
  player: new Player(),
  preload: function(){
    game.stage.backgroundColor = gamevars.colors.gameBackground;
    this.player.preload();
  },
  create: function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.player.init(100,100);
  },
  update: function(){
    this.player.update();
  },
  render: function(){
    this.player.render();
  },
};
