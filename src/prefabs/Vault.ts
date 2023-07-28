import { Container, Sprite, Texture } from "pixi.js";
import Handle from "./Handle";

export default class Vault extends Container {
  private door: Sprite;
  private handle: Handle;

  constructor(
    doorTexture: Texture,
    handleTexture: Texture,
    handleShadowTexture: Texture
  ) {
    super();

    this.door = new Sprite(doorTexture);
    this.handle = new Handle(handleShadowTexture, handleTexture);

    this.door.anchor.set(0.5);
    this.handle.anchor.set(0.5);
    this.handle.position.set(-80, 0);

    this.addChild(this.door, this.handle);

    //open , close stages + animation
  }
}
