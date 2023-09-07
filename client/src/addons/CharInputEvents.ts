let wasLeftPressed = false;
let wasRightPressed = false;
let wasUpPressed = false;
let wasDownPressed = false;

export class CharInputEvents {
  constructor(scene: any) {
    const velocity = 2;
    scene.data.set("velocity", 2);

    const testVelocity = scene.data.get("velocity");
    const isColliderPlayer = scene.data.get("isColliderPlayer");
    const playerMoveState = scene.data.get("playerMoveState");
    const beforePlayerMoveState = scene.data.get("beforePlayerMoveState");
    scene.inputPayload.left = scene.cursorKeys.left.isDown;
    scene.inputPayload.right = scene.cursorKeys.right.isDown;
    scene.inputPayload.up = scene.cursorKeys.up.isDown;
    scene.inputPayload.down = scene.cursorKeys.down.isDown;

    scene.room.send("input", scene.inputPayload);

    const isLeftPressed = scene.cursorKeys.left.isDown;
    const isRightPressed = scene.cursorKeys.right.isDown;
    const isUpPressed = scene.cursorKeys.up.isDown;
    const isDownPressed = scene.cursorKeys.down.isDown;

    if (isLeftPressed) {
      if (isColliderPlayer && beforePlayerMoveState !== "left_move") {
        scene.data.set("isColliderPlayer", false);
        scene.inputPayload.collider = false;
      }

      if (scene.inputPayload.shiftDown) {
        if (!scene.inputPayload.down && !scene.inputPayload.up) {
          scene.currentPlayer.anims.play("char_left_run", true);
        }

        if (isColliderPlayer && playerMoveState === "left_move") {
          scene.currentPlayer.x -= 0;
        } else {
          scene.currentPlayer.x -= velocity + 2;
        }
      }

      if (!scene.inputPayload.shiftDown) {
        if (isColliderPlayer && playerMoveState === "left_move") {
          scene.currentPlayer.x -= 0;
        } else {
          scene.currentPlayer.x -= velocity;
        }

        if (!scene.inputPayload.down && !scene.inputPayload.up) {
          scene.currentPlayer.anims.play("char_left_walk", true);
        }
      }
      scene.data.set("playerMoveState", "left_move");
      wasLeftPressed = true;
      scene.inputPayload.leftUp = false;
      scene.inputPayload.rightUp = false;
      scene.inputPayload.upUp = false;
      scene.inputPayload.downUp = false;
    } else if (wasLeftPressed) {
      scene.currentPlayer.anims.play("char_left", true);
      scene.inputPayload.leftUp = true;
      scene.data.set("playerMoveState", "left_idle");
      wasLeftPressed = false;
      scene.data.set("isColliderPlayer", false);
      scene.inputPayload.collider = false;
    }
    if (isRightPressed) {
      if (isColliderPlayer && beforePlayerMoveState !== "right_move") {
        scene.data.set("isColliderPlayer", false);
        scene.inputPayload.collider = false;
      }

      if (scene.inputPayload.shiftDown) {
        if (!scene.inputPayload.down && !scene.inputPayload.up) {
          scene.currentPlayer.anims.play("char_right_run", true);
        }

        if (isColliderPlayer && playerMoveState === "right_move") {
          scene.currentPlayer.x -= 0;
        } else {
          scene.currentPlayer.x += velocity + 2;
        }
      }

      if (!scene.inputPayload.shiftDown) {
        if (isColliderPlayer && playerMoveState === "right_move") {
          scene.currentPlayer.x -= 0;
        } else {
          scene.currentPlayer.x += velocity;
        }

        if (!scene.inputPayload.down && !scene.inputPayload.up) {
          scene.currentPlayer.anims.play("char_right_walk", true);
        }
      }
      wasRightPressed = true;
      scene.inputPayload.rightUp = false;
      scene.inputPayload.leftUp = false;
      scene.inputPayload.upUp = false;
      scene.inputPayload.downUp = false;
      scene.data.set("playerMoveState", "right_move");
    } else if (wasRightPressed) {
      scene.currentPlayer.anims.play("char_right", true);
      scene.inputPayload.rightUp = true;
      scene.data.set("playerMoveState", "right_idle");
      wasRightPressed = false;
      scene.data.set("isColliderPlayer", false);
      scene.inputPayload.collider = false;
    }

    if (isUpPressed) {
      if (isColliderPlayer && beforePlayerMoveState !== "back_move") {
        scene.data.set("isColliderPlayer", false);
        scene.inputPayload.collider = false;
      }
      if (scene.inputPayload.shiftDown) {
        scene.currentPlayer.anims.play("char_back_run", true);

        if (isColliderPlayer && playerMoveState === "back_move") {
          if (isLeftPressed || isRightPressed) {
            scene.currentPlayer.y -= velocity + 2;
          } else {
            scene.currentPlayer.y -= 0;
          }
        } else {
          scene.currentPlayer.y -= velocity + 2;
        }
      }

      if (!scene.inputPayload.shiftDown) {
        if (isColliderPlayer && playerMoveState === "back_move") {
          if (isLeftPressed || isRightPressed) {
            scene.currentPlayer.y -= velocity;
          } else {
            scene.currentPlayer.y -= 0;
          }
        } else {
          scene.currentPlayer.y -= velocity;
        }
        scene.currentPlayer.anims.play("char_back_walk", true);
      }
      scene.inputPayload.upUp = false;
      scene.inputPayload.rightUp = false;
      scene.inputPayload.leftUp = false;
      scene.inputPayload.downUp = false;
      scene.data.set("playerMoveState", "back_move");
      wasUpPressed = true;
    } else if (wasUpPressed) {
      scene.currentPlayer.anims.play("char_back", true);
      scene.inputPayload.upUp = true;
      scene.data.set("playerMoveState", "back_idle");
      wasUpPressed = false;
      scene.data.set("isColliderPlayer", false);
      scene.inputPayload.collider = false;
    }
    if (isDownPressed) {
      if (isColliderPlayer && beforePlayerMoveState !== "front_move") {
        scene.data.set("isColliderPlayer", false);
        scene.inputPayload.collider = false;
      }
      if (scene.inputPayload.shiftDown) {
        scene.currentPlayer.anims.play("char_front_run", true);
        if (isColliderPlayer && playerMoveState === "front_move") {
          if (isLeftPressed || isRightPressed) {
            scene.currentPlayer.y += velocity + 2;
          } else {
            scene.currentPlayer.y -= 0;
          }
        } else {
          scene.currentPlayer.y += velocity + 2;
        }
      }

      if (!scene.inputPayload.shiftDown) {
        if (isColliderPlayer && playerMoveState === "front_move") {
          if (isLeftPressed || isRightPressed) {
            scene.currentPlayer.y += velocity;
          } else {
            scene.currentPlayer.y -= 0;
          }
        } else {
          scene.currentPlayer.y += velocity;
        }
        scene.currentPlayer.anims.play("char_front_walk", true);
      }
      scene.inputPayload.downUp = false;
      scene.inputPayload.rightUp = false;
      scene.inputPayload.upUp = false;
      scene.inputPayload.leftUp = false;
      scene.data.set("playerMoveState", "front_move");
      wasDownPressed = true;
    } else if (wasDownPressed) {
      scene.currentPlayer.anims.play("char_front", true);
      scene.inputPayload.downUp = true;
      scene.data.set("playerMoveState", "front_idle");
      wasDownPressed = false;
      scene.data.set("isColliderPlayer", false);
      scene.inputPayload.collider = false;
    }
    wasLeftPressed = isLeftPressed;
    wasRightPressed = isRightPressed;
    wasUpPressed = isUpPressed;
    wasDownPressed = isDownPressed;

    for (let sessionId in scene.playerEntities) {
      // do not interpolate the current player
      if (sessionId === scene.room.sessionId) {
        continue;
      }

      // interpolate all other player entities
      const entity = scene.playerEntities[sessionId];
      const { serverX, serverY, serverMoveState, serverIsRunOn } =
        entity.data.values;

      entity.x = Phaser.Math.Linear(entity.x, serverX, 0.2);
      entity.y = Phaser.Math.Linear(entity.y, serverY, 0.2);

      if (serverMoveState === "left_idle") {
        entity.anims.play("char_left", true);
      }
      if (serverMoveState === "right_idle") {
        entity.anims.play("char_right", true);
      }
      if (serverMoveState === "back_idle") {
        entity.anims.play("char_back", true);
      }
      if (serverMoveState === "front_idle") {
        entity.anims.play("char_front", true);
      }

      if (serverMoveState === "left_walk") {
        if (serverIsRunOn) {
          entity.anims.play("char_left_run", true);
        } else {
          entity.anims.play("char_left_walk", true);
        }
      }
      if (serverMoveState === "right_walk") {
        if (serverIsRunOn) {
          entity.anims.play("char_right_run", true);
        } else {
          entity.anims.play("char_right_walk", true);
        }
      }
      if (serverMoveState === "back_walk") {
        if (serverIsRunOn) {
          entity.anims.play("char_back_run", true);
        } else {
          entity.anims.play("char_back_walk", true);
        }
      }
      if (serverMoveState === "front_walk") {
        if (serverIsRunOn) {
          entity.anims.play("char_front_run", true);
        } else {
          entity.anims.play("char_front_walk", true);
        }
      }
    }
  }
}
