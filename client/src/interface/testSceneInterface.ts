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
  playerX: number;
  playerY: number;
}

export interface PlayerStatusInterface {
  weapon: string;
}

export type CurrentPlayerType =
  Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
