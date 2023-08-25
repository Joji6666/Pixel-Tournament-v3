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
  client = new Client("ws://localhost:2567");
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
  };

  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  currentPlayer: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  remoteRef: Phaser.GameObjects.Rectangle;

  preload() {
    new PreloadCharSprite(this);
    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }

  async create() {
    console.log("Joining room...");

    try {
      this.room = await this.client.joinOrCreate("my_room");
      console.log("Joined successfully!");
    } catch (e) {
      console.error(e);
    }

    // listen for new players
    this.room.state.players.onAdd((player, sessionId) => {
      console.log(player, "player");
      const entity = this.physics.add
        .sprite(player.x, player.y, `char_front`)
        .setName("player")
        .setScale(2);
      this.data.set("player", entity);
      this.data.set("playerMoveState", "front");

      // keep a reference of it on `playerEntities`
      this.playerEntities[sessionId] = entity;

      if (sessionId === this.room.sessionId) {
        // this is the current player!
        // (we are going to treat it differently during the update loop)
        this.currentPlayer = entity;

        // remoteRef is being used for debug only
        this.remoteRef = this.add.rectangle(0, 0, entity.width, entity.height);
        this.remoteRef.setStrokeStyle(1, 0xff0000);

        player.onChange(() => {
          this.remoteRef.x = player.x;
          this.remoteRef.y = player.y;
        });
      } else {
        // all remote players are here!
        // (same as before, we are going to interpolate remote players)
        player.onChange(() => {
          entity.setData("serverX", player.x);
          entity.setData("serverY", player.y);
          entity.setData("serverMoveState", player.moveState);
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
      this.currentPlayer.x -= velocity;
      this.currentPlayer.anims.play("char_left_walk", true);
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
      this.currentPlayer.x += velocity;
      this.currentPlayer.anims.play("char_right_walk", true);
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
      this.currentPlayer.y -= velocity;
      this.currentPlayer.anims.play("char_back_walk", true);
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
      this.currentPlayer.y += velocity;
      this.currentPlayer.anims.play("char_front_walk", true);
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
      const { serverX, serverY, serverMoveState } = entity.data.values;

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
