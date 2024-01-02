export const playerAttack = (scene, playerStatus, room) => {
  const currentPlayer = scene.data.get("player");
  const playerSide = scene.data.get("playerSide");
  const players = scene.data.get("players");
  const currentSessionId = scene.data.get("currentSessionId");

  if (playerStatus.weapon !== "hand" && playerStatus.isWeaponDraw) {
    const sword = scene.data.get("sword");

    players.children.entries.forEach((player) => {
      // 플레이어의 위치 정보 가져오기
      const sessionId = player?.data?.values?.sessionId;

      if (sessionId && sessionId !== currentSessionId) {
        // 검의 영역에 들어왔는지 확인

        scene.physics.world.overlap(sword, player, (sword, player) => {
          player.anims.play(`char_sword_hurt_front`, true);
          player.on(`animationcomplete-char_sword_hurt_front`, () => {
            setTimeout(() => {
              player.anims.play(`char_sword_idle_front`, true);
            }, 80);
          });
        });
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
