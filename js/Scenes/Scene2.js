

class Scene2 extends Phaser.Scene {
    constructor() {
        super('playGame')
    }

    create(){

        // Add background
        //this.background = this.add.image(0,0,'background');
        this.background = this.add.tileSprite(0,0, config.width, config.height, 'background')
        this.background.setOrigin(0,0)

        // Add ships
        this.ship1 = this.add.image(config.width/ 2 - 50, config.height/ 2, 'ship');
        this.ship2 = this.add.image(config.width/ 2, config.height/ 2, 'ship2');
        this.ship3 = this.add.image(config.width/ 2 + 50, config.height/ 2, 'ship3');

        this.add.text(20,20, 'Playing game', {font: '25px Arial', fill: 'yellow'})
    }


    update() {
        // Move ships
        this.moveShip(this.ship1, 1)
        this.moveShip(this.ship2, 2)
        this.moveShip(this.ship3, 3)

        /**
         * Move background by
         * decreasing the position of the texture of the background 
         * from the update function 
         */
        this.background.tilePositionY -= 0.5;
    }



    moveShip(ship, speed) {
        ship.y += speed;

        /**
         * reset position if ship moves out of the height of our game
         */
         if(ship.y > config.height) {
             this.restShipPos(ship)
         }
    }


    restShipPos(ship) {
        ship.y = 0;
        const randomX = Phaser.Math.Between(0, config.width);
        ship.x = randomX;
    }

}