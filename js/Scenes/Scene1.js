
/**
 * Notes:
 * 
 * init() - is used to prepare data
 * 
 * preload() - preload function used to 
 * load the music and images into memory
 * 
 * create() - used to add the objects to the game
 * 
 * update() - which is a loop that runs constantly 
 * ie you could use it to make a character run infinitely
 * 
 */




class Scene1 extends Phaser.Scene {
    constructor() {
        super('bootGame')
    }

    preload() {
        this.load.image('background', 'assets/images/background.png')
        this.load.image('ship', 'assets/images/ship.png')
        this.load.image('ship2', 'assets/images/ship2.png')
        this.load.image('ship3', 'assets/images/ship3.png')
    }

    create(){
        this.add.text(20,20, "Loading game... ");
        this.scene.start('playGame')
    }
}