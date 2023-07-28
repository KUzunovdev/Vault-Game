import { Sprite } from "pixi.js";
import Scene from "../core/Scene";
import Handle from "../prefabs/Handle";
import Vault from "../prefabs/Vault";
import config from "../config";

export default class Game extends Scene {
  name = "Game";

  private bg!: Sprite;
  private vault!: Vault;

  async load() {
    const assets = await this.utils.assetLoader.loadAssetsGroup("Game");

    this.bg = Sprite.from(assets["bg"]);
    this.bg.scale.set(0.4);
    this.bg.anchor.set(0.5);
    this.bg.x = window.innerWidth / 2;
    this.bg.y = window.innerHeight / 2;

    this.vault = new Vault(
      assets["door"],
      assets["handle"],
      assets["handleShadow"]
    );
    this.vault.scale.set(0.4);
    this.vault.x = window.innerWidth / 2 + 40;
    this.vault.y = window.innerHeight / 2 - 17;

    this.addChild(this.bg, this.vault);
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

  update(delta: number) {
    // Update game state
  }

  async start() {
    //implement logic for game state, generating vault code, reset game and etc

    const code = this.generateCode();
    console.log(code);
  }
}
