export const entityDrawSword = (isEntityWeapon, entity, scene, sessionId) => {
  if (!isEntityWeapon) {
    const entityWeapon = scene.physics.add
      .sprite(entity.x, entity.y, `sword_front`)
      .setScale(2);
    scene.data.set(`${sessionId}entityWeapon`, entityWeapon);
    entity.anims.play("char_sword_draw_front", true);

    entity.on("animationcomplete-char_sword_draw_front", () => {
      entity.anims.play("char_front", true);
    });
  }
};
