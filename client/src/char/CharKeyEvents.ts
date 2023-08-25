export default class CharKeyEvents {
  constructor(
    scene: Phaser.Scene,
    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  ) {
    scene.input.keyboard.on("keyup-UP", () => {
      scene.data.set("playerMoveState", "back_idle");

      player.anims.play("char_back", true);
    });
    scene.input.keyboard.on("keyup-DOWN", () => {
      scene.data.set("playerMoveState", "front_idle");

      player.anims.play("char_front", true);
    });
    scene.input.keyboard.on("keyup-RIGHT", () => {
      scene.data.set("playerMoveState", "right_idle");

      player.anims.play("char_right", true);
    });
    scene.input.keyboard.on("keyup-LEFT", () => {
      scene.data.set("playerMoveState", "left_idle");

      player.anims.play("char_left", true);
    });

    scene.input.keyboard.on("keydown-UP", () => {
      const isRunOn = scene.data.get("isRunOn");
      if (isRunOn) {
        scene.data.set("playerMoveState", "back_run");
        player.anims.play("char_back_run", true);
      } else {
        player.anims.stop();
        scene.data.set("playerMoveState", "back_walk");
        player.anims.play("char_back_walk", true);
      }
    });
    scene.input.keyboard.on("keydown-DOWN", () => {
      const isRunOn = scene.data.get("isRunOn");
      if (isRunOn) {
        scene.data.set("playerMoveState", "front_run");
        player.anims.play("char_front_run", true);
      } else {
        scene.data.set("playerMoveState", "front_walk");
        player.anims.play("char_front_walk", true);
      }
    });
    scene.input.keyboard.on("keydown-RIGHT", () => {
      const isRunOn = scene.data.get("isRunOn");
      if (isRunOn) {
        scene.data.set("playerMoveState", "right_run");
        player.anims.play("char_right_run", true);
      } else {
        scene.data.set("playerMoveState", "right_walk");
        player.anims.play("char_right_walk", true);
      }
    });
    scene.input.keyboard.on("keydown-LEFT", () => {
      const isRunOn = scene.data.get("isRunOn");
      if (isRunOn) {
        scene.data.set("playerMoveState", "left_run");
        player.anims.play("char_left_run", true);
      } else {
        scene.data.set("playerMoveState", "left_walk");
        player.anims.play("char_left_walk", true);
      }
    });

    scene.input.keyboard.on("keydown-SHIFT", () => {
      const isRunOn = scene.data.get("isRunOn");
      scene.data.set("isRunOn", !isRunOn);
    });
  }
}
