import { Container, Sprite, Texture } from "pixi.js";
import Handle from "./Handle";
import { gsap } from "gsap";

export default class Vault extends Container {
  private door: Sprite;
  private doorOpen: Sprite;
  private doorOpenShadow: Sprite;
  public handle: Handle;

  constructor(
    doorTexture: Texture,
    doorOpenTexture: Texture,
    doorOpenShadowTexture: Texture,
    handleTexture: Texture,
    handleShadowTexture: Texture,
    onRotate: (direction: "clockwise" | "counterclockwise") => void
  ) {
    super();

    this.door = new Sprite(doorTexture);
    this.doorOpen = new Sprite(doorOpenTexture);
    this.doorOpenShadow = new Sprite(doorOpenShadowTexture);
    this.handle = new Handle(handleShadowTexture, handleTexture, onRotate);

    this.door.anchor.set(0.5);
    this.doorOpen.anchor.set(0.5);
    this.doorOpenShadow.anchor.set(0.5);
    this.handle.anchor.set(0.5);

    this.handle.position.set(-80, 0);
    this.doorOpen.position.set(1358, 20);
    this.doorOpenShadow.position.set(1430, 70);

    this.doorOpen.visible = false;
    this.doorOpenShadow.visible = false;

    this.door.alpha = 1;
    this.handle.alpha = 1;
    this.doorOpen.alpha = 0;
    this.doorOpenShadow.alpha = 0;

    this.addChild(this.door, this.doorOpenShadow, this.doorOpen, this.handle);
  }

  openVault(): void {
    gsap.to(this.door, {
      alpha: 0,
      duration: 0.5,
      onComplete: () => {
        this.door.visible = false;
      },
    });
    gsap.to(this.handle, {
      alpha: 0,
      duration: 0.5,
      onComplete: () => {
        this.handle.visible = false;
      },
    });
    gsap.to([this.doorOpen, this.doorOpenShadow], {
      alpha: 1,
      duration: 0.5,
      onStart: () => {
        this.doorOpen.visible = true;
        this.doorOpenShadow.visible = true;
      },
    });
  }

  closeVault(): void {
    gsap.to(this.door, {
      alpha: 1,
      duration: 0.5,
      onStart: () => {
        this.door.visible = true;
      },
    });
    gsap.to(this.handle, {
      alpha: 1,
      duration: 0.5,
      onStart: () => {
        this.handle.visible = true;
      },
    });
    gsap.to([this.doorOpen, this.doorOpenShadow], {
      alpha: 0,
      duration: 0.5,
      onComplete: () => {
        this.doorOpen.visible = false;
        this.doorOpenShadow.visible = false;
      },
    });
  }
}
