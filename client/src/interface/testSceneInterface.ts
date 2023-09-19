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
  conflictAllowed: boolean;
  colliderSide: string;
  beforePlayerMoveState: string;
  colliderDoneSide: string;
}

export type CurrentPlayerType =
  Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
