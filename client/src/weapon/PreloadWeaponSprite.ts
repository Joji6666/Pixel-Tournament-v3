export default class PreloadWeaponSprite {
  constructor(scene: Phaser.Scene) {
    scene.load.spritesheet(`sword_back`, "assets/weapon/sword/sword_back.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    scene.load.spritesheet(
      `sword_front`,
      "assets/weapon/sword/sword_front.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    scene.load.spritesheet(
      `sword_right`,
      "assets/weapon/sword/sword_right.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    scene.load.spritesheet(`sword_left`, "assets/weapon/sword/sword_left.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    scene.load.spritesheet(
      `sword_left_walk`,
      "assets/weapon/sword/sword_left_walk.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    scene.load.spritesheet(
      `sword_right_walk`,
      "assets/weapon/sword/sword_right_walk.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    scene.load.spritesheet(
      `sword_front_walk`,
      "assets/weapon/sword/sword_front_walk.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    scene.load.spritesheet(
      `sword_back_walk`,
      "assets/weapon/sword/sword_back_walk.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    scene.load.spritesheet(
      `sword_draw_front`,
      "assets/weapon/sword/sword_draw_front.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    scene.load.spritesheet(
      `sword_draw_back`,
      "assets/weapon/sword/sword_draw_back.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    scene.load.spritesheet(
      `sword_draw_right`,
      "assets/weapon/sword/sword_draw_right.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    scene.load.spritesheet(
      `sword_draw_left`,
      "assets/weapon/sword/sword_draw_left.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
  }
}
