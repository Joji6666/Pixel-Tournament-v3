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
    playerEntities
  ) {
    const velocity = 2;
    scene.data.set("velocity", 2);

    const isColliderPlayer = scene.data.get("isColliderPlayer");
    const playerMoveState = scene.data.get("playerMoveState");
    const beforePlayerMoveState = scene.data.get("beforePlayerMoveState");
    const colliderSide = scene.data.get("colliderSide");

    const colliderDoneSide = scene.data.get("colliderDoneSide");
    const players = scene.data.get("players");

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
          inputPayload.conflictAllowed = true;
        }

        if (colliderSide === "front") {
          currentPlayer.x -= 0;
          currentPlayer.y -= velocity;
          inputPayload.conflictAllowed = true;
        } else {
          currentPlayer.x -= velocity;
          currentPlayer.y -= 0;
          inputPayload.conflictAllowed = true;
        }
      }
      if (isRightPressed && isUpPressed) {
        if (colliderSide === "left") {
          currentPlayer.x += 0;
          currentPlayer.y -= velocity;
          inputPayload.conflictAllowed = true;
        }
        if (colliderSide === "front") {
          currentPlayer.x += 0;
          currentPlayer.y -= velocity;
          inputPayload.conflictAllowed = true;
        } else {
          currentPlayer.x += velocity;
          currentPlayer.y -= 0;
          inputPayload.conflictAllowed = true;
        }
      }
      if (isLeftPressed && isDownPressed) {
        if (colliderSide === "right") {
          currentPlayer.x -= 0;
          currentPlayer.y += velocity;
          inputPayload.conflictAllowed = true;
        }
        if (colliderSide === "back") {
          currentPlayer.x -= 0;
          currentPlayer.y += velocity;
          inputPayload.conflictAllowed = true;
        } else {
          currentPlayer.x -= velocity;
          currentPlayer.y -= 0;
          inputPayload.conflictAllowed = true;
        }
      }
      if (isRightPressed && isDownPressed) {
        if (colliderSide === "left") {
          currentPlayer.x += 0;
          currentPlayer.y += velocity;
          inputPayload.conflictAllowed = true;
        }
        if (colliderSide === "back") {
          currentPlayer.x -= 0;
          currentPlayer.y += velocity;
          inputPayload.conflictAllowed = true;
        } else {
          currentPlayer.x += velocity;
          currentPlayer.y -= 0;
          inputPayload.conflictAllowed = true;
        }
      }

      if (isLeftPressed && !isUpPressed && !isDownPressed) {
        if (beforePlayerMoveState !== ("left_move" || "left_idle")) {
          currentPlayer.x -= velocity;
          inputPayload.collider = false;
          inputPayload.conflictAllowed = false;
          scene.data.set("isColliderPlayer", false);
        }
      }
      if (isRightPressed && !isUpPressed && !isDownPressed) {
        if (beforePlayerMoveState !== ("right_move" || "right_idle")) {
          currentPlayer.x += velocity;
          inputPayload.collider = false;
          inputPayload.conflictAllowed = false;
          scene.data.set("isColliderPlayer", false);
        }
      }
      if (isUpPressed && !isLeftPressed && !isRightPressed) {
        if (beforePlayerMoveState !== ("back_move" || "back_idle")) {
          currentPlayer.y -= velocity;
          inputPayload.collider = false;
          inputPayload.conflictAllowed = false;
          scene.data.set("isColliderPlayer", false);
        }

        if (
          colliderSide === ("left" || "right") &&
          colliderDoneSide !== "back"
        ) {
          inputPayload.conflictAllowed = false;
          currentPlayer.y -= velocity;
          inputPayload.collider = false;
          scene.data.set("isColliderPlayer", false);
        }
      }
      if (isDownPressed && !isLeftPressed && !isRightPressed) {
        if (beforePlayerMoveState !== ("front_move" || "front_idle")) {
          currentPlayer.y += velocity;
          inputPayload.collider = false;
          scene.data.set("isColliderPlayer", false);
          inputPayload.conflictAllowed = false;
        }

        if (
          colliderSide === ("left" || "right") &&
          colliderDoneSide !== "front"
        ) {
          currentPlayer.y += velocity;
          inputPayload.collider = false;
          scene.data.set("isColliderPlayer", false);
          inputPayload.conflictAllowed = false;
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
