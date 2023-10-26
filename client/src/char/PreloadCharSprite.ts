export default class PreloadCharSprite {
  constructor(scene: Phaser.Scene) {
    scene.load.spritesheet(`char_front`, "assets/char/char_front.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    scene.load.spritesheet(`char_back`, "assets/char/char_back.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    scene.load.spritesheet(`char_right`, "assets/char/char_right.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    scene.load.spritesheet(`char_left`, "assets/char/char_left.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    scene.load.spritesheet(
      `char_front_walk`,
      "assets/char/char_front_walk.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    scene.load.spritesheet(`char_back_walk`, "assets/char/char_back_walk.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    scene.load.spritesheet(
      `char_right_walk`,
      "assets/char/char_right_walk.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    scene.load.spritesheet(`char_left_walk`, "assets/char/char_left_walk.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    scene.load.spritesheet(`char_front_run`, "assets/char/char_front_run.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    scene.load.spritesheet(`char_back_run`, "assets/char/char_back_run.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    scene.load.spritesheet(`char_right_run`, "assets/char/char_right_run.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    scene.load.spritesheet(`char_left_run`, "assets/char/char_left_run.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    scene.load.spritesheet(
      `char_sword_draw_front`,
      "assets/char/weapon/sword/sword_draw_front.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    scene.load.spritesheet(
      `char_sword_draw_left`,
      "assets/char/weapon/sword/sword_draw_left.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    scene.load.spritesheet(
      `char_sword_draw_right`,
      "assets/char/weapon/sword/sword_draw_right.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    scene.load.spritesheet(
      `char_sword_draw_back`,
      "assets/char/weapon/sword/sword_draw_back.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    scene.load.spritesheet(
      `char_sword_idle_front`,
      "assets/char/weapon/sword/sword_idle_front.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    scene.load.spritesheet(
      `char_sword_idle_back`,
      "assets/char/weapon/sword/sword_idle_back.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    scene.load.spritesheet(
      `char_sword_idle_right`,
      "assets/char/weapon/sword/sword_idle_right.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    scene.load.spritesheet(
      `char_sword_idle_left`,
      "assets/char/weapon/sword/sword_idle_left.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    scene.load.spritesheet(
      `char_sword_move_front`,
      "assets/char/weapon/sword/sword_move_front.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    scene.load.spritesheet(
      `char_sword_move_back`,
      "assets/char/weapon/sword/sword_move_back.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    scene.load.spritesheet(
      `char_sword_move_right`,
      "assets/char/weapon/sword/sword_move_right.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    scene.load.spritesheet(
      `char_sword_move_left`,
      "assets/char/weapon/sword/sword_move_left.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );

    // attack

    scene.load.spritesheet(
      `char_sword_attack_front`,
      "assets/char/weapon/sword/sword_attack_front.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    scene.load.spritesheet(
      `char_sword_attack_back`,
      "assets/char/weapon/sword/sword_attack_back.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    scene.load.spritesheet(
      `char_sword_attack_right`,
      "assets/char/weapon/sword/sword_attack_right.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    scene.load.spritesheet(
      `char_sword_attack_left`,
      "assets/char/weapon/sword/sword_attack_left.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
  }
}
