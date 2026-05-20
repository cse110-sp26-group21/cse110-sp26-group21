/* global Phaser */
import { PlayScene } from "./PlayScene.js";

let activeGame = null;

export function buildPhaserConfig(gameState, config, hooks) {
  return {
    type: Phaser.AUTO,
    width: config.screen.width,
    height: config.screen.height,
    parent: "phaser-root",
    backgroundColor: "#1a0f4e",
    scene: [new PlayScene(gameState, config, hooks)]
  };
}

export function createPhaserGame(gameState, config, hooks) {
  destroyPhaserGame();
  activeGame = new Phaser.Game(buildPhaserConfig(gameState, config, hooks));
  return activeGame;
}

export function destroyPhaserGame() {
  if (activeGame) {
    activeGame.destroy(true);
    activeGame = null;
  }
}
