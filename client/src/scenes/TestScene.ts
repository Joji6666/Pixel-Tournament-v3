import Phaser from "phaser";
import PreloadCharSprite from "../char/PreloadCharSprite";
import CharAnimations from "../char/CharAnimations";

import { Client, Room } from "colyseus.js";

let wasLeftPressed = false;
let wasRightPressed = false;
let wasUpPressed = false;
let wasDownPressed = false;
export default class TestScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }
  client = new Client("ws://192.168.0.151");
  room: Room;
  playerEntities: {
    [sessionId: string]: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  } = {};
  inputPayload = {
    left: false,
    right: false,
    up: false,
    down: false,
    leftUp: false,
    rightUp: false,
    upUp: false,
    downUp: false,
    shiftDown: false,
    shiftUp: false,
  };

  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  currentPlayer: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  remoteRef: Phaser.GameObjects.Rectangle;

  preload() {
    new PreloadCharSprite(this);
    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }

  async create() {
    this.input.keyboard.on("keydown-SHIFT", () => {
      if (!this.inputPayload.shiftDown) {
        this.inputPayload.shiftDown = true;
        this.inputPayload.shiftUp = false;

        return;
      }
      if (this.inputPayload.shiftDown) {
        this.inputPayload.shiftDown = false;
        this.inputPayload.shiftUp = true;
      }
    });

    console.log("Joining room...");

    try {
      this.room = await this.client.joinOrCreate("my_room");
      console.log("Joined successfully!");
    } catch (e) {
      console.error(e);
    }

    // listen for new players
    this.room.state.players.onAdd((player, sessionId) => {
      const entity = this.physics.add
        .sprite(player.x, player.y, `char_front`)
        .setName("player")
        .setScale(2);
      this.data.set("player", entity);
      this.data.set("playerMoveState", "front");

      this.playerEntities[sessionId] = entity;

      if (sessionId === this.room.sessionId) {
        this.currentPlayer = entity;
      } else {
        player.onChange(() => {
          entity.setData("serverX", player.x);
          entity.setData("serverY", player.y);
          entity.setData("serverMoveState", player.moveState);
          entity.setData("serverIsRunOn", player.isRunOn);
        });
      }
    });

    this.room.state.players.onRemove((player, sessionId) => {
      const entity = this.playerEntities[sessionId];
      if (entity) {
        // destroy entity
        entity.destroy();

        // clear local reference
        delete this.playerEntities[sessionId];
      }
    });

    new CharAnimations(this);
  }

  update(time: number, delta: number): void {
    // skip loop if not connected yet.
    if (!this.currentPlayer) {
      return;
    }

    const velocity = 2;

    this.inputPayload.left = this.cursorKeys.left.isDown;
    this.inputPayload.right = this.cursorKeys.right.isDown;
    this.inputPayload.up = this.cursorKeys.up.isDown;
    this.inputPayload.down = this.cursorKeys.down.isDown;

    this.room.send("input", this.inputPayload);

    const isLeftPressed = this.cursorKeys.left.isDown;
    const isRightPressed = this.cursorKeys.right.isDown;
    const isUpPressed = this.cursorKeys.up.isDown;
    const isDownPressed = this.cursorKeys.down.isDown;

    if (isLeftPressed) {
      if (this.inputPayload.shiftDown) {
        if (!this.inputPayload.down && !this.inputPayload.up) {
          this.currentPlayer.anims.play("char_left_run", true);
        }

        this.currentPlayer.x -= velocity + 2;
      }

      if (!this.inputPayload.shiftDown) {
        this.currentPlayer.x -= velocity;
        if (!this.inputPayload.down && !this.inputPayload.up) {
          this.currentPlayer.anims.play("char_left_walk", true);
        }
      }
      wasLeftPressed = true;
      this.inputPayload.leftUp = false;
      this.inputPayload.rightUp = false;
      this.inputPayload.upUp = false;
      this.inputPayload.downUp = false;
    } else if (wasLeftPressed) {
      this.currentPlayer.anims.play("char_left", true);
      this.inputPayload.leftUp = true;

      wasLeftPressed = false;
    }
    if (isRightPressed) {
      if (this.inputPayload.shiftDown) {
        if (!this.inputPayload.down && !this.inputPayload.up) {
          this.currentPlayer.anims.play("char_right_run", true);
        }

        this.currentPlayer.x += velocity + 2;
      }

      if (!this.inputPayload.shiftDown) {
        if (!this.inputPayload.down && !this.inputPayload.up) {
          this.currentPlayer.anims.play("char_right_walk", true);
        }

        this.currentPlayer.x += velocity;
      }
      wasRightPressed = true;
      this.inputPayload.rightUp = false;
      this.inputPayload.leftUp = false;
      this.inputPayload.upUp = false;
      this.inputPayload.downUp = false;
    } else if (wasRightPressed) {
      this.currentPlayer.anims.play("char_right", true);
      this.inputPayload.rightUp = true;

      wasRightPressed = false;
    }

    if (isUpPressed) {
      if (this.inputPayload.shiftDown) {
        this.currentPlayer.anims.play("char_back_run", true);
        this.currentPlayer.y -= velocity + 2;
      }

      if (!this.inputPayload.shiftDown) {
        this.currentPlayer.y -= velocity;
        this.currentPlayer.anims.play("char_back_walk", true);
      }
      this.inputPayload.upUp = false;
      this.inputPayload.rightUp = false;
      this.inputPayload.leftUp = false;
      this.inputPayload.downUp = false;
      wasUpPressed = true;
    } else if (wasUpPressed) {
      this.currentPlayer.anims.play("char_back", true);
      this.inputPayload.upUp = true;

      wasUpPressed = false;
    }
    if (isDownPressed) {
      if (this.inputPayload.shiftDown) {
        this.currentPlayer.anims.play("char_front_run", true);
        this.currentPlayer.y += velocity + 2;
      }

      if (!this.inputPayload.shiftDown) {
        this.currentPlayer.y += velocity;
        this.currentPlayer.anims.play("char_front_walk", true);
      }
      this.inputPayload.downUp = false;
      this.inputPayload.rightUp = false;
      this.inputPayload.upUp = false;
      this.inputPayload.leftUp = false;
      wasDownPressed = true;
    } else if (wasDownPressed) {
      this.currentPlayer.anims.play("char_front", true);
      this.inputPayload.downUp = true;

      wasDownPressed = false;
    }
    wasLeftPressed = isLeftPressed;
    wasRightPressed = isRightPressed;
    wasUpPressed = isUpPressed;
    wasDownPressed = isDownPressed;

    for (let sessionId in this.playerEntities) {
      // do not interpolate the current player
      if (sessionId === this.room.sessionId) {
        continue;
      }

      // interpolate all other player entities
      const entity = this.playerEntities[sessionId];
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
        entity.anims.play("char_left_walk", true);
      }
      if (serverMoveState === "right_walk") {
        entity.anims.play("char_right_walk", true);
      }
      if (serverMoveState === "back_walk") {
        entity.anims.play("char_back_walk", true);
      }
      if (serverMoveState === "front_walk") {
        entity.anims.play("char_front_walk", true);
      }
    }
  }
}
