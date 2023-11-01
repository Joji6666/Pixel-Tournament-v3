function isPlayerInSwordArea(playerX, playerY, sword) {
  // 여기에서 검과 플레이어의 위치 정보를 사용하여 영역 확인 로직을 구현
  // 예를 들어, 거리 또는 바운딩 박스 충돌을 검사할 수 있습니다.
  // 필요에 따라 적절한 로직을 작성하세요.

  // 검의 영역 확인 예시:
  // 이 예시에서는 플레이어와 검 간의 거리가 일정 값 이하인 경우에 영역에 들어왔다고 판단합니다.
  const distance = Phaser.Math.Distance.Between(
    playerX,
    playerY,
    sword.body.x,
    sword.body.y
  );
  const thresholdDistance = 50; // 영역 확인을 위한 임계값 설정

  console.log(distance <= thresholdDistance);
}

export const playerAttack = (scene, playerStatus, room) => {
  const currentPlayer = scene.data.get("player");
  const playerSide = scene.data.get("playerSide");
  const players = scene.data.get("players");
  const currentSessionId = scene.data.get("currentSessionId");

  if (playerStatus.weapon !== "hand" && playerStatus.isWeaponDraw) {
    const sword = scene.data.get("sword");

    players.children.entries.forEach((player) => {
      // 플레이어의 위치 정보 가져오기
      const playerX = player.body.x;
      const playerY = player.body.y;
      const sessionId = player?.data?.values?.sessionId;

      if (sessionId && sessionId !== currentSessionId) {
        // 검의 영역에 들어왔는지 확인
        isPlayerInSwordArea(playerX, playerY, sword);
      }
    });

    sword.anims.play(`sword_attack_${playerSide}`, true);
    currentPlayer.anims.play(`char_sword_attack_${playerSide}`, true);
    playerStatus.isAttack = true;
    room.send("weapon", playerStatus);
    currentPlayer.on(
      `animationcomplete-char_sword_attack_${playerSide}`,
      () => {
        currentPlayer.anims.play(`char_sword_idle_${playerSide}`, true);
        playerStatus.isAttack = false;
        room.send("weapon", playerStatus);
      }
    );

    sword.on(`animationcomplete-sword_attack_${playerSide}`, () => {
      sword.anims.play(`sword_idle_${playerSide}`, true);
    });
  }
};
