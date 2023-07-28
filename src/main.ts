import { Application } from "pixi.js";
import AssetLoader from "./core/AssetLoader";
import Game from "./scenes/Game";

const app = new Application({
  view: document.querySelector("#app") as HTMLCanvasElement,
  autoDensity: true,
  resizeTo: window,
  powerPreference: "high-performance",
  backgroundColor: 0x23272a,
});

// @ts-expect-error Set PIXI app to global window object for the PIXI Inspector
window.__PIXI_APP__ = app;

const assetLoader = new AssetLoader();
const game = new Game({ assetLoader });

(async function startGame() {
  await game.load();
  app.stage.addChild(game);

  app.ticker.add(() => {
    game.update(app.ticker.elapsedMS);
  });

  await game.start();
})();
