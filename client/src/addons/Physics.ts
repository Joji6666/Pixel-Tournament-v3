export default class Physics {
  constructor(scene: any, inputPayload, room) {
    const players = scene.data.get("players");
    const player = scene.data.get("player");
    scene.physics.add.collider(
      players,
      player,
      (player1, player2) => {
        // player1과 player2의 현재 좌표를 얻어옵니다.
        const x1 = player1.x;
        const y1 = player1.y;
        const x2 = player2.x;
        const y2 = player2.y;

        // X 축과 Y 축의 거리 차이를 계산합니다.
        const dx = x1 - x2;
        const dy = y1 - y2;

        // X 축과 Y 축의 거리 차이를 기반으로 충돌 방향을 판단합니다.
        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx > 0) {
            scene.data.set("colliderSide", "right");
            inputPayload.colliderSide = "right";
          } else {
            scene.data.set("colliderSide", "left");
            inputPayload.colliderSide = "left";
          }
        } else {
          if (dy > 0) {
            scene.data.set("colliderSide", "back");
            inputPayload.colliderSide = "back";
          } else {
            scene.data.set("colliderSide", "front");
            inputPayload.colliderSide = "front";
          }
        }

        const playerMoveState = scene.data.get("playerMoveState");
        scene.data.set("isColliderPlayer", true);
        scene.data.set("beforePlayerMoveState", playerMoveState);
        scene.inputPayload.collider = true;
        scene.inputPayload.beforePlayerMoveState = playerMoveState;

        room.send("input", inputPayload);
      },
      null,
      scene
    );
  }
}
