import Phaser from "phaser";

export default {
  type: Phaser.AUTO,
  parent: "game",
  backgroundColor: "#111",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },
};
