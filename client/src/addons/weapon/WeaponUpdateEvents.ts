import { entityDrawSword } from "./funtions";

export class WeaponUpdateEvents {
  constructor(
    scene: Phaser.Scene,
    inputPayload,
    cursorKeys,
    room,
    currentPlayer,
    playerEntities,
    playerStatus
  ) {
    const weapon = playerStatus.weapon;

    if (weapon !== "hand") {
      const playerAnim = currentPlayer.anims.currentAnim.key;
      const playerSide = scene.data.get("playerSide");
      const currentSessionId = scene.data.get("currentSessionId");
      const equippedEquipment = scene.data.get(`weapon${currentSessionId}`);
      if (weapon === "sword") {
        const sword = scene.data.get(`sword${currentSessionId}`);
        if (playerSide === "left") {
          sword.body.setSize(35, 30);
          sword.body.setOffset(5, 15);
        }

        if (playerSide === "right") {
          sword.body.setSize(35, 30);
          sword.body.setOffset(23, 15);
        }

        if (playerSide === "front") {
          sword.body.setSize(50, 50);
          sword.body.setOffset(5, 15);
        }

        if (playerSide === "back") {
          sword.body.setSize(50, 45);
          sword.body.setOffset(5, -2);
        }
      }

      // non draw

      if (!playerStatus.isWeaponDraw) {
        if (playerAnim.includes("back")) {
          equippedEquipment.depth = 2;
          currentPlayer.depth = 1;
        } else {
          equippedEquipment.depth = 1;
          currentPlayer.depth = 2;
        }
      }

      let animationName = playerAnim.replace("char", "");

      // draw

      if (playerStatus.isWeaponDraw) {
        if (animationName.includes("idle")) {
          equippedEquipment.depth = 2;
          currentPlayer.depth = 1;
        }

        // move

        if (animationName.includes("move")) {
          equippedEquipment.depth = 2;
          currentPlayer.depth = 1;
        }
      }

      if (animationName.includes(playerStatus.weapon)) {
        animationName = playerAnim.replace(`char_${playerStatus.weapon}`, "");
      }

      equippedEquipment.anims.play(
        `${playerStatus.weapon}${animationName}`,
        true
      );

      equippedEquipment.x = currentPlayer.x;
      equippedEquipment.y = currentPlayer.y;
    }

    for (let sessionId in playerEntities) {
      // do not interpolate the current player
      if (sessionId === room.sessionId) {
        continue;
      }

      const entity = playerEntities[sessionId];
      const {
        serverX,
        serverY,
        serverMoveState,
        serverIsRunOn,
        serverPlayerStatusWeapon,
        serverPlayerStatusWeaponIsDraw,
        serverPlayerStatusWeaponIsAttack,
      } = entity.data.values;

      if (serverPlayerStatusWeapon) {
        const isEntityWeapon = scene.data.get(`${sessionId}entityWeapon`);
        if (!isEntityWeapon) {
          entityDrawSword(isEntityWeapon, entity, scene, sessionId);
        }
      }

      if (serverPlayerStatusWeapon) {
        const entityWeapon = scene.data.get(`${sessionId}entityWeapon`);

        if (entity) {
          const entityAnim = entity.anims.currentAnim?.key;

          if (!serverPlayerStatusWeaponIsDraw) {
            if (entityAnim.includes("back")) {
              entityWeapon.depth = 2;
              entity.depth = 1;
            } else {
              entityWeapon.depth = 1;
              entity.depth = 2;
            }
          }
          let animationName = entityAnim.replace("char", "");

          if (serverPlayerStatusWeaponIsDraw) {
            if (animationName.includes("idle")) {
              entityWeapon.depth = 2;
              entity.depth = 1;
            }

            // move

            if (animationName.includes("move")) {
              entityWeapon.depth = 2;
              entity.depth = 1;
            }
          }

          if (animationName.includes(serverPlayerStatusWeapon)) {
            animationName = entityAnim.replace(
              `char_${serverPlayerStatusWeapon}`,
              ""
            );
          }

          entityWeapon.anims.play(
            `${serverPlayerStatusWeapon}${animationName}`,
            true
          );
        }

        entityWeapon.x = entity.x;
        entityWeapon.y = entity.y;
      }
    }
  }
}
