import Phaser from "phaser";
import PreloadCharSprite from "../char/PreloadCharSprite";
import CharAnimations from "../char/CharAnimations";

import { Client, Room } from "colyseus.js";
import { CharInputEvents } from "../addons/char/CharInputEvents";
import Physics from "../addons/char/Physics";
import {
  CurrentPlayerType,
  InputPayloadInterface,
  PlayerStatusInterface,
} from "../interface/testSceneInterface";
import PreloadWeaponSprite from "../weapon/PreloadWeaponSprite";
import WeaponAnimations from "../weapon/WeaponAnimations";

import { WeaponUpdateEvents } from "../addons/weapon/WeaponUpdateEvents";
import { KeyDownEvents } from "../addons/char/KeyDownEvents";

// Add Scene Class
export default class TestScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  client = new Client("ws://localhost:2567");
  room: Room;

  playerEntities: {
    [sessionId: string]: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  } = {};

  // inputs
  inputPayload: InputPayloadInterface = {
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
    collider: false,
    conflictAllowed: false,
    colliderSide: "",
    beforePlayerMoveState: "",
    colliderDoneSide: "",
    playerX: 0,
    playerY: 0,
  };

  playerStatus: PlayerStatusInterface = {
    weapon: "hand",
    isWeaponDraw: false,
    isAttack: false,
  };

  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  currentPlayer: CurrentPlayerType;
  remoteRef: Phaser.GameObjects.Rectangle;

  preload() {
    new PreloadCharSprite(this);
    new PreloadWeaponSprite(this);
    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }

  async create() {
    this.data.set("velocity", 2);

    // on/off  Run
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

    const players = this.physics.add.group({});
    this.data.set("players", players);
    // listen for new players
    this.room.state.players.onAdd((player, sessionId) => {
      const entity: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody = players
        .create(player.x, player.y, `char_front`)
        .setScale(2);
      entity.body.setSize(18, 30);
      entity.body.setOffset(22.5, 14);
      entity.body.immovable = true;
      entity.setCollideWorldBounds(true);

      this.data.set("player", entity);
      this.data.set("playerMoveState", "front");
      this.data.set("playerSide", "front");
      this.data.set("currentSessionId", sessionId);

      this.playerEntities[sessionId] = entity;

      if (sessionId === this.room.sessionId) {
        this.currentPlayer = entity;

        this.remoteRef = this.add.rectangle(
          0,
          0,
          entity.width - 20,
          entity.height - 10
        );
        this.remoteRef.setStrokeStyle(1, 0xff0000);

        player.onChange(() => {
          this.remoteRef.x = player.x;
          this.remoteRef.y = player.y;
        });

        new Physics(this, this.inputPayload, this.room);
      } else {
        player.onChange(() => {
          entity.setData("serverX", player.x);
          entity.setData("serverY", player.y);
          entity.setData("serverMoveState", player.moveState);
          entity.setData("serverIsRunOn", player.isRunOn);
          entity.setData("serverPlayerStatusWeapon", player.playerStatusWeapon);
          entity.setData(
            "serverPlayerStatusWeaponIsDraw",
            player.playerStatusWeaponIsDraw
          );
          entity.setData(
            "serverPlayerStatusWeaponIsAttack",
            player.playerStatusWeaponIsAttack
          );
          entity.setData("sessionId", sessionId);
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
    new WeaponAnimations(this);

    new KeyDownEvents(this, this.playerStatus, this.room, this.playerEntities);
  }

  update(time: number, delta: number): void {
    // skip loop if not connected yet.
    if (!this.currentPlayer) {
      return;
    }

    new CharInputEvents(
      this,
      this.inputPayload,
      this.cursorKeys,
      this.room,
      this.currentPlayer,
      this.playerEntities,
      this.playerStatus
    );

    new WeaponUpdateEvents(
      this,
      this.inputPayload,
      this.cursorKeys,
      this.room,
      this.currentPlayer,
      this.playerEntities,
      this.playerStatus
    );
  }
}
