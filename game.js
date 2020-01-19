// based on http://www.lessmilk.com/tutorial/2d-platformer-phaser
var HEIGHT = 570;
var WIDTH = 800;

var mainState = {
    preload: function () {
        game.load.crossOrigin = 'anonymous';

        game.load.image('player', 'assets/player-big.png');
        game.load.image('wall', 'assets/wall.png');
        game.load.image('coin', 'assets/coin.png');
        game.load.image('enemy', 'assets/enemy.png');
    },

    create: function () {
        game.stage.backgroundColor = '#ffffff';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;

        

        // Map Builder
        this.walls = game.add.group();
        this.coins = game.add.group();
        this.enemies = game.add.group();

        

        var mapData = data.mapdata;
        for (var i = 0; i < mapData.length; i++) {
            for (var j = 0; j < mapData[i].length; j++) {
                if (mapData[i][j] === 1) {
                    var wall = game.add.sprite(j,  i, 'wall');
                    this.walls.add(wall);
                    wall.body.immovable = true;
                } else if (mapData[i][j] === 5) {
                    var coin = game.add.sprite(j,  i, 'coin');
                    this.coins.add(coin);
                } else if (mapData[i][j] === 3) {
                    var enemy = game.add.sprite(j,  i, 'enemy');
                    this.enemies.add(enemy);
                } else if (mapData[i][j] === 6) {
                    if(!this.player){
                        this.player = game.add.sprite(130 + j, i, 'player');
                    }
                }
            }
        }

        behaviorPlugin = game.plugins.add(Phaser.Plugin.Behavior); // init the Behavior plugin
        behaviorPlugin.enable(this.player); // enable the plugin on the player
        this.player.behaviors.set('platformer', Phaser.Behavior.Platformer, {
            velocity: 300,
            jumpStrength: 450,
            gravity: 1300
        });


        this.rightButton = game.add.button(WIDTH-200, HEIGHT - 100, 'button', function(){
            console.log('')
        }, this, 2, 1, 0);

        // this.rightButton.alpha = 100;
        this.rightButton.width = 100;
        this.rightButton.height = 50;
        this.tinth = '#CCC';
        // // game.input.on('pointerdown', function(pointer){
        // //     var sx = pointer.x;
        // //     var world_center = 400;
        // //     if (sx < world_center) {
        // //         this.plyaer.body.velocity.x = -velocity;
        // //     } else if (sx > world_center) {
        // //         this.plyaer.body.velocity.x = velocity;
        // //     } else {
        // //         this.plyaer.body.velocity.x = 0;
        // //     }
        // // })

        

        // collision handlers
        this.player.behaviors.set('collide-on-wall', Phaser.Behavior.CollisionHandler, {
            targets: this.walls
        });

        this.player.behaviors.set('collide-on-enemy', Phaser.Behavior.CollisionHandler, {
            method: 'overlap',
            targets: this.enemies,
            collideCallback: this.restart
        });

        this.player.behaviors.set('collect-coin', Phaser.Behavior.CollisionHandler, {
            method: 'overlap',
            targets: this.coins,
            collideCallback: this.takeCoin
        });
    },

    takeCoin: function (player, coin) {
        coin.kill();
    },

    restart: function () {
        game.state.start('main');
    }
};

var game = new Phaser.Game(WIDTH, HEIGHT), behaviorPlugin;
game.state.add('main', mainState);
game.state.start('main');
