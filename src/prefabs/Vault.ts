import { Container, Sprite, Texture } from "pixi.js";
import Handle from "./Handle";

export default class Vault extends Container {
  private door: Sprite;
  private doorOpen: Sprite;
  private doorOpenShadow: Sprite;
  private handle: Handle;

  constructor(
    doorTexture: Texture,
    doorOpenTexture: Texture,
    doorOpenShadowTexture: Texture,
    handleTexture: Texture,
    handleShadowTexture: Texture
  ) {
    super();

    this.door = new Sprite(doorTexture);
    this.doorOpen = new Sprite(doorOpenTexture);
    this.doorOpenShadow = new Sprite(doorOpenShadowTexture);
    this.handle = new Handle(handleShadowTexture, handleTexture);

    this.door.anchor.set(0.5);
    this.doorOpen.anchor.set(0.5);
    this.doorOpenShadow.anchor.set(0.5);
    this.handle.anchor.set(0.5);

    this.handle.position.set(-80, 0);

    this.doorOpen.position.set(1358, 20);
    this.doorOpenShadow.position.set(1430, 70);

    this.doorOpen.visible = false;
    this.doorOpenShadow.visible = false;

    this.addChild(this.door, this.doorOpenShadow, this.doorOpen, this.handle);

    //open , close stages + animation
  }

  openVault(): void {
    this.door.visible = false;
    this.handle.visible = false;
    this.doorOpen.visible = true;
    this.doorOpenShadow.visible = true;

    gsap.to(this.doorOpen, { x: "+=200", duration: 1 });
  }

  closeVault(): void {
    this.door.visible = true;
    this.handle.visible = true;
    this.doorOpen.visible = false;
    this.doorOpenShadow.visible = false;
  }
}
