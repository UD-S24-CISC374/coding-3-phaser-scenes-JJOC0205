import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private player: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private stars?: Phaser.Physics.Arcade.Group;

    private keyText: Phaser.GameObjects.Text;
    private gameOver = false;

    constructor() {
        super({ key: "MainScene" });
    }

    create(key: boolean[]) {
        this.add.image(650, 390, "background");

        this.platforms = this.physics.add.staticGroup();
        const ground = this.platforms.create(
            100,
            810,
            "ground"
        ) as Phaser.Physics.Arcade.Sprite;
        ground.setScale(6).refreshBody();
        this.platforms.create(550, 600, "ground").setScale(0.5).refreshBody();
        this.platforms.create(750, 450, "ground").setScale(0.5).refreshBody();
        this.platforms.create(550, 300, "ground").setScale(0.5).refreshBody();

        this.player = this.physics.add.sprite(100, 650, "dude");
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: 20,
        });
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.physics.add.collider(this.player, this.platforms);
        this.cursors = this.input.keyboard?.createCursorKeys();

        /* this.stars = this.physics.add.group({
            key: "star",
            repeat: 1,
            setXY: { x: 12, y: 0, stepX: 70 },
        });
        this.stars.children.iterate((child) => {
            const star = child as Phaser.Physics.Arcade.Image;
            star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            return true;
        }); */
        //this.physics.add.collider(this.stars, this.platforms);
        /* this.physics.add.overlap(
            this.player,
            this.stars,
            this.handleCollectStar,
            undefined,
            this
        ); */
        if(key[0] == false){
            this.keyText = this.add.text(16, 16, "key: not found", {
                fontSize: "32px",
                color: "#000",
            });
        } 
        else {
            this.keyText = this.add.text(16, 16, "key: found", {
                fontSize: "32px",
                color: "#000",
            });
        }
        const bedroom_door = this.add
            .image(200, 450, "door")
            .setScale(1.4)
            .setName("bedroom_door")
            .setInteractive().on("pointerdown", () => {
                this.scene.stop("MainScene").launch(bedroom_door.name, key);
            });
        const living_room_door = this.add
            .image(1080, 480, "door")
            .setScale(1.4)
            .setName("living_room_door")
            .setInteractive().on("pointerdown", () => {
                this.scene.stop("MainScene").launch(living_room_door.name, key);
            });
        const attic_door = this.add
            .image(660, 120, "door")
            .setScale(.5)
            .setName("attic_door")
            .setInteractive().on("pointerdown", () => {
                if(key[0] == true){
                this.scene.stop("MainScene").launch(attic_door.name, key);
                }
                else{
                    this.add.text(506, 16, "You need to find the key first", {
                        fontSize: "32px",
                        color: "#000",
                    });
                }
            });
        /* this.physics.add.collider(
            this.player,
            this.bombs,
            this.handleHitBomb,
            undefined,
            this
        ); */
    }
    /* private handleHitBomb() {
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.player.anims.play("turn");
        this.gameOver = true;
    }
    private handleCollectStar(
        player:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile,
        star:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile
    ) {
        const s = star as Phaser.Physics.Arcade.Image;
        s.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);
        if (this.stars?.countActive(true) === 0) {
            this.stars.children.iterate((child) => {
                const c = child as Phaser.Physics.Arcade.Image;
                c.enableBody(true, c.x, 0, true, true);
                return true;
            });
            const x =
                this.player.x < 400
                    ? Phaser.Math.Between(400, 800)
                    : Phaser.Math.Between(0, 400);
            const bomb = this.bombs.create(x, 16, "bomb");
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
        }
    } */

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
        if (this.cursors.up.isDown && this.player.body?.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}
