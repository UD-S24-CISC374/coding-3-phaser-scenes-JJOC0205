import Phaser from "phaser";

export default class thirdScene extends Phaser.Scene {
    private player: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private points: Phaser.GameObjects.Text;
    exit: Phaser.GameObjects.Rectangle;

    constructor() {
        super({ key: "living_room_door" });
    }

    preload() {
        this.load.image("living_room", "assets/img/living-room.jpeg");
        this.load.image("key", "assets/img/key.png");
        this.load.spritesheet("player", "assets/img/dude.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
    }
    create(key:boolean[]){
        const background = this.add.image(640, 390, "living_room");
        background.setScale(4.5);


        this.platforms = this.physics.add.staticGroup();
        const ground = this.platforms.create(
            500,
            700,
            "ground"
        ) as Phaser.Physics.Arcade.Sprite;
        ground.setScale(2).refreshBody();
        this.player = this.physics.add.sprite(200, 200, "player").setScale(1.5);
        this.player.setCollideWorldBounds(true);
        const key_image = this.add.image(210, 490, "key").setScale(.1).setInteractive().on("pointerdown", () => {
            if(key[0]){
                key[0] = true;
                key_image.setVisible(false);
            }
        });
        
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("player", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "player", frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("player", {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });
        
        this.cursors = this.input.keyboard?.createCursorKeys();

        this.exit = this.add.rectangle(50, 50, 50, 50, 0x000000);
        this.exit.setInteractive().on("pointerdown", () => {
            this.exit.setVisible(false);
            this.scene.stop("living_room_door").launch("MainScene", key);
        });

    }
    update() {
        if (!this.cursors) {
            return;
        }
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play("left", true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play("right", true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play("turn");
        }
    }
}