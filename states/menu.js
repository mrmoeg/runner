var menuState = {
  preload: function(){
    game.stage.backgroundColor = gamevars.colors.menuBackground;
  },
  create: function(){
    var startkey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    startkey.onDown.addOnce(this.startGame, this);

    var startLabel = game.add.text(80, game.world.height-80, "PRESS SPACE TO BEGIN", {font: gamevars.fonts.default, fill: gamevars.colors.text} );
  },

  startGame: function(){
    game.state.start('game');
  }
};
