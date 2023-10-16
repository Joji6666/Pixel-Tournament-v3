export default class CharAnimations {
  constructor(scene: Phaser.Scene) {
    scene.anims.create({
      key: `char_front`,

      frames: scene.anims.generateFrameNumbers(`char_front`, {
        start: 0,
        end: 0,
      }),

      frameRate: 60,

      repeat: 0,
    });
    scene.anims.create({
      key: `char_back`,

      frames: scene.anims.generateFrameNumbers(`char_back`, {
        start: 0,
        end: 0,
      }),

      frameRate: 60,

      repeat: 0,
    });
    scene.anims.create({
      key: `char_right`,

      frames: scene.anims.generateFrameNumbers(`char_right`, {
        start: 0,
        end: 0,
      }),

      frameRate: 60,

      repeat: 0,
    });
    scene.anims.create({
      key: `char_left`,

      frames: scene.anims.generateFrameNumbers(`char_left`, {
        start: 0,
        end: 0,
      }),

      frameRate: 60,

      repeat: 0,
    });
    scene.anims.create({
      key: `char_front_walk`,

      frames: scene.anims.generateFrameNumbers(`char_front_walk`, {
        start: 0,
        end: 5,
      }),

      frameRate: 10,

      repeat: -1,
    });
    scene.anims.create({
      key: `char_back_walk`,

      frames: scene.anims.generateFrameNumbers(`char_back_walk`, {
        start: 0,
        end: 5,
      }),

      frameRate: 10,

      repeat: -1,
    });
    scene.anims.create({
      key: `char_right_walk`,

      frames: scene.anims.generateFrameNumbers(`char_right_walk`, {
        start: 0,
        end: 5,
      }),

      frameRate: 10,

      repeat: -1,
    });
    scene.anims.create({
      key: `char_left_walk`,

      frames: scene.anims.generateFrameNumbers(`char_left_walk`, {
        start: 0,
        end: 5,
      }),

      frameRate: 10,

      repeat: -1,
    });
    scene.anims.create({
      key: `char_front_run`,

      frames: scene.anims.generateFrameNumbers(`char_front_run`, {
        start: 0,
        end: 7,
      }),

      frameRate: 30,

      repeat: -1,
    });
    scene.anims.create({
      key: `char_back_run`,

      frames: scene.anims.generateFrameNumbers(`char_back_run`, {
        start: 0,
        end: 7,
      }),

      frameRate: 30,

      repeat: -1,
    });
    scene.anims.create({
      key: `char_right_run`,

      frames: scene.anims.generateFrameNumbers(`char_right_run`, {
        start: 0,
        end: 7,
      }),

      frameRate: 30,

      repeat: -1,
    });
    scene.anims.create({
      key: `char_left_run`,

      frames: scene.anims.generateFrameNumbers(`char_left_run`, {
        start: 0,
        end: 7,
      }),

      frameRate: 30,

      repeat: -1,
    });
    scene.anims.create({
      key: `char_sword_draw_front`,

      frames: scene.anims.generateFrameNumbers(`char_sword_draw_front`, {
        start: 0,
        end: 2,
      }),

      frameRate: 10,

      repeat: 0,
    });
    scene.anims.create({
      key: `char_sword_draw_left`,

      frames: scene.anims.generateFrameNumbers(`char_sword_draw_left`, {
        start: 0,
        end: 2,
      }),

      frameRate: 10,

      repeat: 0,
    });
    scene.anims.create({
      key: `char_sword_draw_right`,

      frames: scene.anims.generateFrameNumbers(`char_sword_draw_right`, {
        start: 0,
        end: 2,
      }),

      frameRate: 10,

      repeat: 0,
    });
    scene.anims.create({
      key: `char_sword_draw_left`,

      frames: scene.anims.generateFrameNumbers(`char_sword_draw_left`, {
        start: 0,
        end: 2,
      }),

      frameRate: 10,

      repeat: 0,
    });
  }
}
