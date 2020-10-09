

class Scene2 extends Phaser.Scene {
    constructor() {
        super('playGame')
    }


    create(){

        // Add background
        this.background = this.add.image(0,0,'background');
        this.background.setOrigin(0,0)

        // Add ships
        this.ship1 = this.add.image(config.width/ 2 - 50, config.height/ 2, 'ship');
        this.ship2 = this.add.image(config.width/ 2, config.height/ 2, 'ship2');
        this.ship3 = this.add.image(config.width/ 2 + 50, config.height/ 2, 'ship3');

        this.add.text(20,20, 'Playing game', {font: '25px Arial', fill: 'yellow'})
    }
}