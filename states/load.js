var loadState = {
  timeInState: 2,             // Time until next state - in seconds
  loadingText: "LOADING... ", // Text to animate while loading
  loadingLabel: '',           // Text Object holding the loadingtext
  loadingTextSpeed: 0.3,      // Animationspeed - in seconds
  // PreLoad Function
  preload: function(){
    // Set background color
    game.stage.backgroundColor = gamevars.colors.splashBackground;
  },

  create: function(){
    // Define empty label object
    this.loadingLabel = game.add.text(80, game.world.height-80, "", {font: gamevars.fonts.default, fill: gamevars.colors.text} );
    // Start timer until state switching
    game.time.events.repeat( Phaser.Timer.SECOND * this.timeInState, 1, this.startMenu, this);
    // Start repeating timer for animation function
    game.time.events.repeat( Phaser.Timer.SECOND * this.loadingTextSpeed, 999, this.updateLoadingText, this);
  },
  // Method for animation and updating loadingtext
  updateLoadingText: function(){
    // New String
    var str = this.loadingText.substr(0, ( this.loadingLabel.text.length+1) % this.loadingText.length );
    // Update object
    this.loadingLabel.setText(str);
  },
  // Start game state
  startMenu: function(){
    game.state.start('menu');
  }
};
