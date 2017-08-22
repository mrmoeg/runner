var game = new Phaser.Game(gamevars.width, gamevars.height, Phaser.AUTO, '');

game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('game', gameState);

game.state.start('load');
