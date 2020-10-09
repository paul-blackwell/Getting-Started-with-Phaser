

class Scene2 extends Phaser.Scene {
    constructor() {
        super('playGame')
    }

    create() {

        // Add background
        //this.background = this.add.image(0,0,'background');
        this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background')
        this.background.setOrigin(0, 0)

        // Add ships
        // this.ship1 = this.add.image(config.width/ 2 - 50, config.height/ 2, 'ship');
        // this.ship2 = this.add.image(config.width/ 2, config.height/ 2, 'ship2');
        // this.ship3 = this.add.image(config.width/ 2 + 50, config.height/ 2, 'ship3');

        // Add ships
        this.ship1 = this.add.sprite(config.width / 2 - 50, config.height / 2, 'ship');
        this.ship2 = this.add.sprite(config.width / 2, config.height / 2, 'ship2');
        this.ship3 = this.add.sprite(config.width / 2 + 50, config.height / 2, 'ship3');


        // Basic 2 frame looping animation 
        this.anims.create({
            key: 'ship1_anim',
            frames: this.anims.generateFrameNumbers('ship'), // using the frames from the ship sprite sheet
            frameRate: 20,
            repeat: -1
        })
        this.anims.create({
            key: 'ship2_anim',
            frames: this.anims.generateFrameNumbers('ship2'),
            frameRate: 20,
            repeat: -1
        })
        this.anims.create({
            key: 'ship3_anim',
            frames: this.anims.generateFrameNumbers('ship3'),
            frameRate: 20,
            repeat: -1
        })

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion'),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        })


        this.anims.create({
            key: 'red',
            frames: this.anims.generateFrameNumbers('power-up', {
                start: 0,
                end: 1
            }),
            frameRate: 20,
            repeat: -1,
        })

        this.anims.create({
            key: 'gray',
            frames: this.anims.generateFrameNumbers('power-up', {
                start: 2,
                end: 3
            }),
            frameRate: 20,
            repeat: -1,
        })


        // This will stop power ups from  colliding with each other
        //this.physics.world.setBoundsCollision();


        // Create power ups
        this.powerUps = this.physics.add.group();
        const maxObjects = 4;
        for (let i = 0; i <= maxObjects; i++) {
            const powerUp = this.physics.add.sprite(16, 16, 'power-up');
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);

            // Set power up to be red or gray (50%) chance
            if (Math.random() > 0.5) {
                powerUp.play('red');
            } else {
                powerUp.play('gray');
            }

            // Set velocity (instead of changing the speed)
            powerUp.setVelocity(100, 100)

            // Set boundaries, this will stop them going out of view
            powerUp.setCollideWorldBounds(true);

            /**
             * This will make them bounce off each other when the, 
             * power ups hit one another
             */
            this.physics.add.collider(this.powerUps, this.powerUps)

            /**
             * This will make the power ups bounce around on the screen  
             * like if they were rubber bulls
             */
            powerUp.setBounce(1);
        }






        // Play animations
        this.ship1.play('ship1_anim');
        this.ship2.play('ship2_anim');
        this.ship3.play('ship3_anim');


        // Make each ship interactive
        this.ship1.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();


        /**
         * Add an event that listens whenever an interactive object
         * is clicked
         * - gameobjectdown defines that the event trigger when
         * the object is clicked and it automatically scopes the callback 
         * function to the object itself, in this case the ship
         *
         * - Then we pass the this.destroyShip callback function.
         * 
         * - "this" is to pass the scope to the callback function
         */
        this.input.on('gameobjectdown', this.destroyShip, this)


        this.add.text(20, 20, 'Playing game', { font: '25px Arial', fill: 'yellow' })
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
        if (ship.y > config.height) {
            this.restShipPos(ship)
        }
    }


    restShipPos(ship) {
        ship.y = 0;
        const randomX = Phaser.Math.Between(0, config.width);
        ship.x = randomX;
    }

    destroyShip(pointer, gameObject) {
        gameObject.setTexture('explosion');
        gameObject.play('explode')
    }

}