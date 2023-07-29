import { Sprite } from "pixi.js";
import Scene from "../core/Scene";
import Handle from "../prefabs/Handle";
import Vault from "../prefabs/Vault";
import config from "../config";

export default class Game extends Scene {
  name = "Game";

  private bg!: Sprite;
  private vault!: Vault;
  private currentDirection: "clockwise" | "counterclockwise" | null = null;
  private currentCount = 0;
  private rotations: {
    number: number;
    direction: "clockwise" | "counterclockwise";
  }[] = [];
  private generatedCode!: Array<{
    number: number;
    direction: "clockwise" | "counterclockwise";
  }>;

  async load() {
    const assets = await this.utils.assetLoader.loadAssetsGroup("Game");

    this.bg = Sprite.from(assets["bg"]);
    this.bg.scale.set(0.4);
    this.bg.anchor.set(0.5);
    this.bg.x = window.innerWidth / 2;
    this.bg.y = window.innerHeight / 2;

    this.vault = new Vault(
      assets["door"],
      assets["doorOpen"],
      assets["doorOpenShadow"],
      assets["handle"],
      assets["handleShadow"],
      this.handleRotation.bind(this)
    );
    this.vault.scale.set(0.4);
    this.vault.x = window.innerWidth / 2 + 30;
    this.vault.y = window.innerHeight / 2 - 10;

    this.addChild(this.bg, this.vault);

    window.addEventListener("resize", this.handleResize.bind(this));
    this.handleResize();
  }

  //generating vault code in format 1-9 clockwise/counterclockwise
  generateCode(): Array<{
    number: number;
    direction: "clockwise" | "counterclockwise";
  }> {
    const code = [];
    for (let i = 0; i < 3; i++) {
      const direction = Math.random() < 0.5 ? "clockwise" : "counterclockwise";
      const number = Math.floor(Math.random() * 9) + 1;
      code.push({ number, direction } as {
        number: number;
        direction: "clockwise" | "counterclockwise";
      });
    }
    return code;
  }

  private rotationTimeout: any;

  handleRotation(direction: "clockwise" | "counterclockwise"): void {
    clearTimeout(this.rotationTimeout);

    if (this.currentDirection === direction) {
      this.currentCount++;
    } else {
      if (this.currentDirection && this.currentCount > 0) {
        this.rotations.push({
          number: this.currentCount,
          direction: this.currentDirection,
        });
      }
      this.currentDirection = direction;
      this.currentCount = 1;
    }

    this.rotationTimeout = setTimeout(() => {
      if (this.currentDirection && this.currentCount > 0) {
        this.rotations.push({
          number: this.currentCount,
          direction: this.currentDirection,
        });
        this.currentCount = 0;
        this.currentDirection = null;

        if (this.rotations.length === 3) {
          this.checkCode();
        }
      }
    }, 5000);

    console.log("Current count:", this.currentCount); //test if the logic for registering player activity works
    console.log("Current rotations array:", this.rotations);

    if (this.currentCount === 9) {
      // Reset count after a full rotation
      this.currentCount = 0;
      this.rotations.push({ number: 9, direction: this.currentDirection });
      this.currentDirection = null;
    }
  }

  private checkCode() {
    const isMatch =
      JSON.stringify(this.rotations) === JSON.stringify(this.generatedCode);

    if (isMatch) {
      console.log("Correct code entered!");
      // opening the vault, etc.
    } else {
      console.log("Incorrect code. Try again!");
      this.resetGame(); //reset the game state
    }
  }

  private resetGame() {
    this.currentDirection = null;
    this.currentCount = 0;
    this.rotations = [];
    // Any other necessary reset logic
  }

  update(delta: number) {
    // Update game state
  }

  async start() {
    //implement logic for game state, generating vault code, reset game and etc

    this.generatedCode = this.generateCode();
    console.log(this.generatedCode);
  }

  private handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.onResize(width, height);
  }

  onResize(width: number, height: number) {
    this.bg.x = width / 2;
    this.bg.y = height / 2;

    this.vault.x = width / 2 + 30;
    this.vault.y = height / 2 - 10;
  }
}
