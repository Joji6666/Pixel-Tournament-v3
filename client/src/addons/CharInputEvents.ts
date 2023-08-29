let wasLeftPressed = false;
let wasRightPressed = false;
let wasUpPressed = false;
let wasDownPressed = false;

export class CharInputEvents {
  constructor(scene: any) {
    const velocity = 2;

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
      if (scene.inputPayload.shiftDown) {
        if (!scene.inputPayload.down && !scene.inputPayload.up) {
          scene.currentPlayer.anims.play("char_left_run", true);
        }

        scene.currentPlayer.x -= velocity + 2;
      }

      if (!scene.inputPayload.shiftDown) {
        scene.currentPlayer.x -= velocity;
        if (!scene.inputPayload.down && !scene.inputPayload.up) {
          scene.currentPlayer.anims.play("char_left_walk", true);
        }
      }
      wasLeftPressed = true;
      scene.inputPayload.leftUp = false;
      scene.inputPayload.rightUp = false;
      scene.inputPayload.upUp = false;
      scene.inputPayload.downUp = false;
    } else if (wasLeftPressed) {
      scene.currentPlayer.anims.play("char_left", true);
      scene.inputPayload.leftUp = true;

      wasLeftPressed = false;
    }
    if (isRightPressed) {
      if (scene.inputPayload.shiftDown) {
        if (!scene.inputPayload.down && !scene.inputPayload.up) {
          scene.currentPlayer.anims.play("char_right_run", true);
        }

        scene.currentPlayer.x += velocity + 2;
      }

      if (!scene.inputPayload.shiftDown) {
        if (!scene.inputPayload.down && !scene.inputPayload.up) {
          scene.currentPlayer.anims.play("char_right_walk", true);
        }

        scene.currentPlayer.x += velocity;
      }
      wasRightPressed = true;
      scene.inputPayload.rightUp = false;
      scene.inputPayload.leftUp = false;
      scene.inputPayload.upUp = false;
      scene.inputPayload.downUp = false;
    } else if (wasRightPressed) {
      scene.currentPlayer.anims.play("char_right", true);
      scene.inputPayload.rightUp = true;

      wasRightPressed = false;
    }

    if (isUpPressed) {
      if (scene.inputPayload.shiftDown) {
        scene.currentPlayer.anims.play("char_back_run", true);
        scene.currentPlayer.y -= velocity + 2;
      }

      if (!scene.inputPayload.shiftDown) {
        scene.currentPlayer.y -= velocity;
        scene.currentPlayer.anims.play("char_back_walk", true);
      }
      scene.inputPayload.upUp = false;
      scene.inputPayload.rightUp = false;
      scene.inputPayload.leftUp = false;
      scene.inputPayload.downUp = false;
      wasUpPressed = true;
    } else if (wasUpPressed) {
      scene.currentPlayer.anims.play("char_back", true);
      scene.inputPayload.upUp = true;

      wasUpPressed = false;
    }
    if (isDownPressed) {
      if (scene.inputPayload.shiftDown) {
        scene.currentPlayer.anims.play("char_front_run", true);
        scene.currentPlayer.y += velocity + 2;
      }

      if (!scene.inputPayload.shiftDown) {
        scene.currentPlayer.y += velocity;
        scene.currentPlayer.anims.play("char_front_walk", true);
      }
      scene.inputPayload.downUp = false;
      scene.inputPayload.rightUp = false;
      scene.inputPayload.upUp = false;
      scene.inputPayload.leftUp = false;
      wasDownPressed = true;
    } else if (wasDownPressed) {
      scene.currentPlayer.anims.play("char_front", true);
      scene.inputPayload.downUp = true;

      wasDownPressed = false;
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
