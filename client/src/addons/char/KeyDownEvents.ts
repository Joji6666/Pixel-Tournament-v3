import { Room } from "colyseus.js";
import type { PlayerStatusInterface } from "../../interface/testSceneInterface";

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
      const player = scene.data.get("player");

      if (playerStatus.weapon === "hand") {
        const sword = scene.physics.add
          .sprite(player.x, player.y, `sword_front`)
          .setScale(2);
        scene.data.set("sword", sword);
        playerStatus.weapon = "sword";
      }

      if (playerStatus.isWeaponDraw) {
        player.anims.play("char_front", true);
        const sword = scene.data.get("sword");
        sword.anims.play("sword_front", true);
        playerStatus.isWeaponDraw = false;
        player.depth = 2;
        sword.depth = 1;
      } else {
        const sword = scene.data.get("sword");

        playerStatus.isWeaponDraw = true;
        sword.anims.play("sword_draw_front", true);
        player.anims.play("char_sword_draw_front", true);

        player.on("animationcomplete-char_sword_draw_front", () => {
          player.anims.play("char_sword_idle_front", true);
        });

        sword.on("animationcomplete-sword_draw_front", () => {
          sword.anims.play("sword_idle_front", true);
        });
      }

      room.send("weapon", playerStatus.weapon);
    });
  }
}
