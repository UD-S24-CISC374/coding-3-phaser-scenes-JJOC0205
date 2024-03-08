import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    public key: boolean[];

    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("background", "assets/img/main-hallway.jpeg");
        this.load.image("ground", "assets/img/platform.png");
        this.load.image("key", "assets/img/key.png");
        this.load.image("door", "assets/img/door.png");
        this.load.spritesheet("dude", "assets/img/dude.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
    }

    create() {
        this.key = [false];
        this.scene.start("MainScene", this.key);
    }
}
