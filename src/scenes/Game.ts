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

    this.vault = new Vault(assets["door"], assets["handle"]);
    this.vault.scale.set(0.4);
    this.vault.x = window.innerWidth / 2 + 40;
    this.vault.y = window.innerHeight / 2 - 17;

    this.addChild(this.bg, this.vault);
  }

  update(delta: number) {
    // Update game state
  }

  async start() {
    //implement logic for game state, generating vault code, reset game and etc
  }
}
