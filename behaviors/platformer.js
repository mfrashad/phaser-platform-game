var DEFAULT_CONTROLS = 0; // arrows
var HEIGHT = 570;
var WIDTH = 800;
var BUTTON = { x1: WIDTH - 200, y1: HEIGHT - 150, x2: WIDTH - 120, y2: HEIGHT - 70}

var Platformer = {

    // defaults settings
    options: {
        gravity: 600,
        velocity: 200,
        jumpStrength: 250,
        controls: [DEFAULT_CONTROLS]
    },

    create: function (object, options) {
        var gravity = options.gravity;
        var controls = options.controls;

        if (gravity > 0 && object.body) {
            object.body.gravity.y = gravity;
        }

        if (controls === false) return; // skip controls setup

        if (Array.isArray(controls) === false) {
            controls = [controls]
        }

    },

    preUpdate: function (object, options) {
        if(!object || !object.game) return;
    
        //debugger
        var velocity = options.velocity;
        var center = object.game.world.centerX;
        var pointer = object.game.input.activePointer;
        var px = pointer.worldX;
        var py = pointer.worldY;
        if(pointer.isDown){
            if(px > BUTTON.x1 && px <  BUTTON.x2 && py > BUTTON.y1 && py < BUTTON.y2){
                if(object.body.touching.down) object.body.velocity.y = -options.jumpStrength;
            }
            else if (px < center) {
                object.body.velocity.x = -velocity;
                
            } else if (px > center) {
                object.body.velocity.x = velocity;
                
            }
        } else {
            object.body.velocity.x = 0;
        }
        // var cursor = options._cursor_arrows;
        

        // // if (cursor.left.isDown) {
        // //     object.body.velocity.x = -velocity;
        // // } else if (cursor.right.isDown) {
        // //     object.body.velocity.x = velocity;
        // // } else {
        // //     object.body.velocity.x = 0;
        // // }

        // if (cursor.up.isDown && object.body.touching.down) {
        //     object.body.velocity.y = -options.jumpStrength;
        // }
    }
};

if (window.Phaser) {
  Phaser.Behavior = Phaser.Behavior || {};
  Phaser.Behavior.Platformer = Platformer;
}
