import Phaser from "phaser";

export default class thirdScene extends Phaser.Scene {
    private player: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private keyText: Phaser.GameObjects.Text;
    exit: Phaser.GameObjects.Rectangle;

    constructor() {
        super({ key: "attic_door" });
    }

    preload() {
        this.load.image("attic", "assets/img/attic.jpeg");
        this.load.spritesheet("player", "assets/img/dude.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
    }
    create(key:boolean[]){
        const background = this.add.image(640, 390, "attic");
        background.setScale(4.5);

        this.platforms = this.physics.add.staticGroup();
        const ground = this.platforms.create(
            400,
            700,
            "ground"
        ) as Phaser.Physics.Arcade.Sprite;
        ground.setScale(2).refreshBody();
        this.player = this.physics.add.sprite(200, 200, "player").setScale(1.5);
        this.player.setCollideWorldBounds(true);

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
            this.scene.stop("attic_door").launch("MainScene", key);
        });
        this.keyText = this.add.text(106, 16, "Congrats on entering the attic!", {
            fontSize: "32px",
            color: "#000",
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