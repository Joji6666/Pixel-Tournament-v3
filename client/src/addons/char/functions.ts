export const playerAttack = (scene, playerStatus, room) => {
  const player = scene.data.get("player");
  const playerSide = scene.data.get("playerSide");

  if (playerStatus.weapon !== "hand" && playerStatus.isWeaponDraw) {
    const sword = scene.data.get("sword");
    sword.anims.play(`sword_attack_${playerSide}`, true);
    player.anims.play(`char_sword_attack_${playerSide}`, true);

    player.on(`animationcomplete-char_sword_attack_${playerSide}`, () => {
      player.anims.play(`char_sword_idle_${playerSide}`, true);
    });

    sword.on(`animationcomplete-sword_attack_${playerSide}`, () => {
      sword.anims.play(`sword_idle_${playerSide}`, true);
    });
  }

  // room.send("weapon", playerStatus.weapon);
};
