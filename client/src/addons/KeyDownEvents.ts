import { Room } from "colyseus.js";
import type { PlayerStatusInterface } from "../interface/testSceneInterface";

export class KeyDownEvents {
  constructor(
    scene: Phaser.Scene,
    playerStatus: PlayerStatusInterface,
    room: Room,
    playerEntities: {
      [sessionId: string]: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    }
  ) {
    scene.input.keyboard.on("keyup-P", () => {
      if (playerStatus.weapon !== "hand") {
        return;
      }

      const player = scene.data.get("player");
      const sword = scene.physics.add
        .sprite(player.x, player.y, `sword_front`)
        .setScale(2);
      scene.data.set("sword", sword);
      player.depth = 2;
      sword.depth = 1;
      playerStatus.weapon = "sword";
      sword.anims.play("sword_draw_front", true);
      player.anims.play("char_sword_draw_front", true);

      player.on("animationcomplete-char_sword_draw_front", () => {
        player.anims.play("char_front", true);
      });

      sword.on("animationcomplete-sword_draw_front", () => {
        sword.anims.play("sword_front", true);
      });

      room.send("weapon", playerStatus.weapon);
    });
  }
}
