import { Sprite, Texture, Rectangle } from "pixi.js";
import { InteractionEvent } from "@pixi/interaction";
import { gsap } from "gsap";

export default class Handle extends Sprite {
  private handleShadow!: Sprite;
  private hitAreaSprite!: Sprite;

  constructor(
    texture: Texture,
    handleShadowTexture: Texture,
    private onRotate: (direction: "clockwise" | "counterclockwise") => void
  ) {
    super(texture);

    this.handleShadow = new Sprite(handleShadowTexture);
    this.handleShadow.anchor.set(0.5);

    this.handleShadow.position.set(0, 0);
    this.addChild(this.handleShadow);

    //hit area sprite
    this.hitAreaSprite = new Sprite(Texture.WHITE);
    this.hitAreaSprite.width = this.width * 2;
    this.hitAreaSprite.height = this.height * 2;
    this.hitAreaSprite.alpha = 0;
    this.hitAreaSprite.anchor.set(0.5);
    this.hitAreaSprite.interactive = true;
    this.hitAreaSprite.on("pointerdown", (event: InteractionEvent) => {
      this.rotateHandle(event.data.global.x);
    });
    this.addChild(this.hitAreaSprite);
  }

  private rotateHandle(clickX: number): void {
    const rotationDirection = clickX < window.innerWidth / 2 ? -1 : 1;
    const rotationAngle = 60 * (Math.PI / 180);
    gsap.to([this, this.handleShadow], {
      rotation: this.rotation + rotationDirection * rotationAngle,
      duration: 0.5,
    });
    const direction =
      rotationDirection === 1 ? "clockwise" : "counterclockwise";
    this.onRotate(direction); // Calling the callback with the direction
  }

  public reLock(): void {
    gsap.to([this, this.handleShadow], {
      rotation: this.rotation + 360 * 3 * (Math.PI / 180),
      duration: 2,
      ease: "power1.inOut",
    });
  }
}
