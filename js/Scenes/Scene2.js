

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



        // Unsure what this does??
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
        this.input.on('gameobjectdown', this.destroyShip, this);



        // Add player
        this.player= this.physics.add.sprite(config.width / 2 - 8, config.height - 64, 'player');
        this.player.play('thrust');

        // Make variable to listen for cursor keys
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        // Stop player from going off the screen
        this.player.setCollideWorldBounds(true)


        //  Make variable to listen for space bar key so player can shoot
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.projectiles = this.add.group();


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

        // This function will control the players ship
        this.movePlayerManager();

        // Shoot beam when spacebar is pressed
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.shootBeam();
        }

        for(let i = 0; i < this.projectiles.getChildren().length; i++){
            const beam = this.projectiles.getChildren()[i];
            beam.update();
        }
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


    movePlayerManager() {

        /**
         * So every time the left arrow key is pressed we adjust
         * the speed of the players with a negative value, so they move
         * to the left
         * 
         * else if the right key is pressed move to the right
         * 
         * else set the X velocity to 0 to stop the ship from moving
         */
        if(this.cursorKeys.left.isDown){
            this.player.setVelocityX(-gameSettings.playerSpeed);
        } else if (this.cursorKeys.right.isDown) {
            this.player.setVelocityX(gameSettings.playerSpeed)
        } else {
            this.player.setVelocityX(0)
        }


        /**
         * This is the same as the above but for the up down keys,
         * setting the Y axis
         */
        if(this.cursorKeys.up.isDown){
            this.player.setVelocityY(-gameSettings.playerSpeed);
        } else if (this.cursorKeys.down.isDown) {
            this.player.setVelocityY(gameSettings.playerSpeed)
        } else {
            this.player.setVelocityY(0)
        }
    }


    shootBeam() {
        const beam = new Beam(this);
    }

}