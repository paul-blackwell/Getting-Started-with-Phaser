
class Beam extends Phaser.GameObjects.Sprite {
    constructor(scene) {

        /** 
         * Get the position of the players ship as
         * we want the beam to positioned where the ship is
         * */ 

        const x = scene.player.x;
        const y = scene.player.y;

        super(scene, x, y, 'beam');

        // Add game object to the scene
        //scene.projectiles.add(this)
        scene.add.existing(this)

        // Play Beam animation
        this.play('beam_anim');
        // Enable sprite sheet to have physics
        scene.physics.world.enableBody(this);
        // Set velocity of beam to go upwards
        this.body.velocity.y = -250;
        
    }


    update() {

        /**
         * If instance (beam) reaches the top - 32px of the screen destroy it,
         *  we need to this because if me don't it will cause performance
         * problems
         */
        if(this.y < 32 ) {
            this.destroy();
        }
    }
}