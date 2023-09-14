export default class Physics {
  constructor(scene: any) {
    const players = scene.data.get("players");
    const player = scene.data.get("player");
    scene.physics.add.collider(
      players,
      player,
      () => {
        const playerMoveState = scene.data.get("playerMoveState");
        scene.data.set("isColliderPlayer", true);
        scene.data.set("beforePlayerMoveState", playerMoveState);
        scene.inputPayload.collider = true;
      },
      null,
      scene
    );
  }
}
