export interface InputPayloadInterface {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  leftUp: boolean;
  rightUp: boolean;
  upUp: boolean;
  downUp: boolean;
  shiftDown: boolean;
  shiftUp: boolean;
  collider: boolean;
}

export type CurrentPlayerType =
  Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
