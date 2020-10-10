
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
        scene.add.existing(this)

        /**
         * Play Beam animation
         * Enable sprite sheet to have physics
         * Set velocity of beam to go upwards
         */
        this.play('beam_anim');
        scene.physics.world.enableBody(this);
        this.body.velocity.y = -250;

        /**
         * Add the beam to the projectiles group, 
         * we will use this to later remove the beam from the scene
         */
        scene.projectiles.add(this);
        
    }


    /**
     * Note:
     * For performance reasons Phaser won't run the objects 
     * update automatically so, we need to call the update 
     * for each 'beam in the main update in the 'Scene 2'
     */
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