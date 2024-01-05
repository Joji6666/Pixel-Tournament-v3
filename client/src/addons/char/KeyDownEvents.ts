import { Room } from "colyseus.js";
import type { PlayerStatusInterface } from "../../interface/testSceneInterface";
import { playerAttack } from "./functions";

export class KeyDownEvents {
  constructor(
    scene: Phaser.Scene,
    playerStatus: PlayerStatusInterface,
    room: Room,
    playerEntities: {
      [sessionId: string]: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    }
  ) {
    scene.input.keyboard.on("keydown-P", () => {
      const player = scene.data.get("player");
      const playerSide = scene.data.get("playerSide");
      if (playerStatus.weapon === "hand") {
        const sword = scene.physics.add
          .sprite(player.x, player.y, `sword_front`)
          .setScale(2);
        scene.data.set("sword", sword);
        sword.body.setSize(35, 30);
        sword.body.setOffset(5, 15);
        playerStatus.weapon = "sword";
      }

      if (playerStatus.isWeaponDraw) {
        player.anims.play(`char_${playerSide}`, true);
        const sword = scene.data.get("sword");
        sword.anims.play(`sword_${playerSide}`, true);
        playerStatus.isWeaponDraw = false;
        player.depth = 2;
        sword.depth = 1;
      } else {
        const sword = scene.data.get("sword");

        playerStatus.isWeaponDraw = true;
        sword.anims.play(`sword_draw_${playerSide}`, true);
        player.anims.play(`char_sword_draw_${playerSide}`, true);

        player.on(`animationcomplete-char_sword_draw_${playerSide}`, () => {
          player.anims.play(`char_sword_idle_${playerSide}`, true);
        });

        sword.on(`animationcomplete-sword_draw_${playerSide}`, () => {
          sword.anims.play(`sword_idle_${playerSide}`, true);
        });
      }

      room.send("weapon", playerStatus);
    });

    scene.input.keyboard.on("keydown-SPACE", () => {
      playerAttack(scene, playerStatus, room, playerEntities);
    });
  }
}
