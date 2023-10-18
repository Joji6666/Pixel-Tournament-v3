let wasLeftPressed = false;
let wasRightPressed = false;
let wasUpPressed = false;
let wasDownPressed = false;

export class CharInputEvents {
  constructor(
    scene: Phaser.Scene,
    inputPayload,
    cursorKeys,
    room,
    currentPlayer,
    playerEntities,
    playerStatus
  ) {
    let velocity = 2;
    scene.data.set("velocity", 2);

    const isColliderPlayer = scene.data.get("isColliderPlayer");
    const colliderSide = scene.data.get("colliderSide");
    const players = scene.data.get("players");
    const weapon = playerStatus.weapon;

    if (weapon !== "hand") {
      velocity = 1.5;
    }

    inputPayload.left = cursorKeys.left.isDown;
    inputPayload.right = cursorKeys.right.isDown;
    inputPayload.up = cursorKeys.up.isDown;
    inputPayload.down = cursorKeys.down.isDown;

    room.send("input", inputPayload);

    const isLeftPressed = cursorKeys.left.isDown;
    const isRightPressed = cursorKeys.right.isDown;
    const isUpPressed = cursorKeys.up.isDown;
    const isDownPressed = cursorKeys.down.isDown;

    if (!scene.physics.overlap(players, currentPlayer)) {
      scene.data.set("isColliderPlayer", false);
      inputPayload.collider = false;
      inputPayload.colliderSide = "";
      scene.data.set("colliderSide", "");
      inputPayload.conflictAllowed = false;
    }
    // collider

    if (isColliderPlayer) {
      inputPayload.collider = true;
      if (isLeftPressed && isUpPressed) {
        if (colliderSide === "right") {
          currentPlayer.x -= 0;
          currentPlayer.y -= velocity;
        }

        if (colliderSide === "front") {
          currentPlayer.x -= 0;
          currentPlayer.y -= velocity;
        }

        if (colliderSide !== "right" && colliderSide !== "front") {
          currentPlayer.x -= velocity;
          currentPlayer.y -= 0;
        }
      }
      if (isRightPressed && isUpPressed) {
        if (colliderSide === "left") {
          currentPlayer.x += 0;
          currentPlayer.y -= velocity;
        }
        if (colliderSide === "front") {
          currentPlayer.x += 0;
          currentPlayer.y -= velocity;
        }

        if (colliderSide !== "left" && colliderSide !== "front") {
          currentPlayer.x += velocity;
          currentPlayer.y -= 0;
        }
      }
      if (isLeftPressed && isDownPressed) {
        if (colliderSide === "right") {
          currentPlayer.x -= 0;
          currentPlayer.y += velocity;
        }
        if (colliderSide === "back") {
          currentPlayer.x -= 0;
          currentPlayer.y += velocity;
        }

        if (colliderSide !== "right" && colliderSide !== "back") {
          currentPlayer.x -= velocity;
          currentPlayer.y -= 0;
        }
      }
      if (isRightPressed && isDownPressed) {
        if (colliderSide === "left") {
          currentPlayer.x += 0;
          currentPlayer.y += velocity;
        }
        if (colliderSide === "back") {
          currentPlayer.x -= 0;
          currentPlayer.y += velocity;
        }

        if (colliderSide !== "left" && colliderSide !== "back") {
          currentPlayer.x += velocity;
          currentPlayer.y -= 0;
        }
      }

      if (isLeftPressed && !isUpPressed && !isDownPressed) {
        if (colliderSide !== "right") {
          currentPlayer.x -= velocity;
        }
      }
      if (isRightPressed && !isUpPressed && !isDownPressed) {
        if (colliderSide !== "left") {
          currentPlayer.x += velocity;
        }
      }
      if (isUpPressed && !isLeftPressed && !isRightPressed) {
        if (colliderSide !== "back") {
          currentPlayer.y -= velocity;
        }
      }
      if (isDownPressed && !isLeftPressed && !isRightPressed) {
        if (colliderSide !== "front") {
          currentPlayer.y += velocity;
        }
      }
    }

    // not collider

    if (isLeftPressed) {
      if (inputPayload.shiftDown) {
        if (!inputPayload.down && !inputPayload.up) {
          currentPlayer.anims.play("char_left_run", true);
        }

        if (!isColliderPlayer) {
          currentPlayer.x -= velocity + 2;
        }
      }

      if (!inputPayload.shiftDown) {
        if (!isColliderPlayer) {
          currentPlayer.x -= velocity;
          scene.data.set("colliderDoneSide", "left");
          inputPayload.colliderDoneSide = "left";
        }

        if (!inputPayload.down && !inputPayload.up) {
          currentPlayer.anims.play("char_left_walk", true);
        }
      }
      scene.data.set("playerMoveState", "left_move");
      wasLeftPressed = true;
      inputPayload.leftUp = false;
      inputPayload.rightUp = false;
      inputPayload.upUp = false;
      inputPayload.downUp = false;
    } else if (wasLeftPressed) {
      currentPlayer.anims.play("char_left", true);
      inputPayload.leftUp = true;
      scene.data.set("playerMoveState", "left_idle");
      wasLeftPressed = false;
    }

    if (isRightPressed) {
      if (inputPayload.shiftDown) {
        if (!inputPayload.down && !inputPayload.up) {
          currentPlayer.anims.play("char_right_run", true);
        }

        if (!isColliderPlayer) {
          currentPlayer.x += velocity + 2;
        }
      }

      if (!inputPayload.shiftDown) {
        if (!isColliderPlayer) {
          currentPlayer.x += velocity;
          scene.data.set("colliderDoneSide", "right");
          inputPayload.colliderDoneSide = "right";
        }

        if (!inputPayload.down && !inputPayload.up) {
          currentPlayer.anims.play("char_right_walk", true);
        }
      }
      wasRightPressed = true;
      inputPayload.rightUp = false;
      inputPayload.leftUp = false;
      inputPayload.upUp = false;
      inputPayload.downUp = false;
      scene.data.set("playerMoveState", "right_move");
    } else if (wasRightPressed) {
      currentPlayer.anims.play("char_right", true);
      inputPayload.rightUp = true;
      scene.data.set("playerMoveState", "right_idle");
      wasRightPressed = false;
    }

    if (isUpPressed) {
      if (inputPayload.shiftDown) {
        currentPlayer.anims.play("char_back_run", true);

        if (!isColliderPlayer) {
          currentPlayer.y -= velocity + 2;
        }
      }

      if (!inputPayload.shiftDown) {
        if (!isColliderPlayer) {
          currentPlayer.y -= velocity;
          scene.data.set("colliderDoneSide", "back");
          inputPayload.colliderDoneSide = "back";
        }
        currentPlayer.anims.play("char_back_walk", true);
      }
      inputPayload.upUp = false;
      inputPayload.rightUp = false;
      inputPayload.leftUp = false;
      inputPayload.downUp = false;
      scene.data.set("playerMoveState", "back_move");
      wasUpPressed = true;
    } else if (wasUpPressed) {
      currentPlayer.anims.play("char_back", true);
      inputPayload.upUp = true;
      scene.data.set("playerMoveState", "back_idle");
      wasUpPressed = false;
    }
    if (isDownPressed) {
      if (inputPayload.shiftDown) {
        currentPlayer.anims.play("char_front_run", true);

        if (!isColliderPlayer) {
          currentPlayer.y += velocity + 2;
        }
      }

      if (!inputPayload.shiftDown) {
        if (!isColliderPlayer) {
          currentPlayer.y += velocity;
          scene.data.set("colliderDoneSide", "front");
          inputPayload.colliderDoneSide = "front";
        }
        currentPlayer.anims.play("char_front_walk", true);
      }
      inputPayload.downUp = false;
      inputPayload.rightUp = false;
      inputPayload.upUp = false;
      inputPayload.leftUp = false;
      scene.data.set("playerMoveState", "front_move");
      wasDownPressed = true;
    } else if (wasDownPressed) {
      currentPlayer.anims.play("char_front", true);
      inputPayload.downUp = true;
      scene.data.set("playerMoveState", "front_idle");
      wasDownPressed = false;
    }

    inputPayload.playerX = currentPlayer.x;
    inputPayload.playerY = currentPlayer.y;
    wasLeftPressed = isLeftPressed;
    wasRightPressed = isRightPressed;
    wasUpPressed = isUpPressed;
    wasDownPressed = isDownPressed;

    for (let sessionId in playerEntities) {
      // do not interpolate the current player
      if (sessionId === room.sessionId) {
        continue;
      }

      // interpolate all other player entities
      const entity = playerEntities[sessionId];
      const {
        serverX,
        serverY,
        serverMoveState,
        serverIsRunOn,
        serverPlayerStatusWeapon,
      } = entity.data.values;

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
