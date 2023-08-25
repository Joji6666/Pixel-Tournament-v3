import Phaser from "phaser";
import config from "./config";
import TestScene from "./scenes/TestScene";

new Phaser.Game(
  Object.assign(config, {
    physics: {
      default: "arcade",
      arcade: { debug: true },
    },
    scene: [TestScene],
  })
);
