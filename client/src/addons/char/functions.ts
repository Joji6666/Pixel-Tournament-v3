export const playerAttack = (scene, playerStatus, room, playerEntities) => {
  const currentPlayer = scene.data.get("player");
  const playerSide = scene.data.get("playerSide");
  const players = scene.data.get("players");
  const currentSessionId = scene.data.get("currentSessionId");

  if (playerStatus.weapon !== "hand" && playerStatus.isWeaponDraw) {
    const sword = scene.data.get(`sword${currentSessionId}`);

    players.children.entries.forEach((player) => {
      const sessionId = player?.data?.values?.sessionId;

      if (sessionId && sessionId !== currentSessionId) {
        // 검의 영역에 들어왔는지 확인

        scene.physics.world.overlap(sword, player, (sword, player) => {
          let otherSide = "front";
          if (playerSide === "left") {
            otherSide = "right";
          }
          if (playerSide === "right") {
            otherSide = "left";
          }
          if (playerSide === "front") {
            otherSide = "back";
          }
          if (playerSide === "back") {
            otherSide = "front";
          }
          const hurtAnim = `char_sword_hurt_${otherSide}`;
          player.anims.play(hurtAnim, true);
          player.on(`animationcomplete-char_sword_hurt_${otherSide}`, () => {
            player.anims.play(`char_sword_idle_${otherSide}`, true);
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
