import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Man extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Stand_1", "./Man/costumes/Stand_1.svg", {
        x: 84.18841552734375,
        y: 93.12399291992188
      }),
      new Costume("Jump_1", "./Man/costumes/Jump_1.svg", {
        x: 85.79103088378906,
        y: 93.12749481201172
      }),
      new Costume("Fall_1", "./Man/costumes/Fall_1.svg", {
        x: 79.2197265625,
        y: 88.71499633789062
      }),
      new Costume("Walk1", "./Man/costumes/Walk1.svg", {
        x: 84.4677505493164,
        y: 90.87449645996094
      }),
      new Costume("Walk2", "./Man/costumes/Walk2.svg", {
        x: 82.42903900146484,
        y: 90.1240005493164
      }),
      new Costume("Walk3", "./Man/costumes/Walk3.svg", {
        x: 85.20720672607422,
        y: 93.1240005493164
      }),
      new Costume("Walk4", "./Man/costumes/Walk4.svg", {
        x: 86.33879852294922,
        y: 94.6240005493164
      }),
      new Costume("Walk5", "./Man/costumes/Walk5.svg", {
        x: 85.20720672607422,
        y: 90.12399291992188
      }),
      new Costume("Walk6", "./Man/costumes/Walk6.svg", {
        x: 84.08346557617188,
        y: 86.1240005493164
      }),
      new Costume("Walk7", "./Man/costumes/Walk7.svg", {
        x: 85.20720672607422,
        y: 88.3740005493164
      }),
      new Costume("Walk8", "./Man/costumes/Walk8.svg", {
        x: 86.93000793457031,
        y: 91.8740005493164
      }),
      new Costume("hitbox", "./Man/costumes/hitbox.svg", {
        x: 43.43109776443117,
        y: 69.72299886092995
      })
    ];

    this.sounds = [new Sound("Meow", "./Man/sounds/Meow.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.size = 50;
    this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
    this.stage.vars.speedY = 0;
    this.stage.vars.frame = 0;
    this.stage.vars.animate = 1;
    this.stage.vars.falling += 12;
    this.visible = true;
    while (true) {
      this.costume = "hitbox";
      this.y += this.stage.vars.speedY;
      this.stage.vars.speedY += -1;
      yield* this.touchGround(this.stage.vars.speedY > 0);
      if (this.touching(this.sprites["Ground"].andClones())) {
        this.stage.vars.speedY = 0;
        this.y += 1;
      }
      if (this.keyPressed("left arrow")) {
        yield* this.walk(-90, -7);
      } else {
        if (this.keyPressed("right arrow")) {
          yield* this.walk(90, 7);
        } else {
          this.stage.vars.frame = 0;
        }
      }
      if (this.keyPressed("up arrow")) {
        if (this.stage.vars.jumpKey == 0 && this.stage.vars.falling < 3) {
          this.stage.vars.speedY = 22;
          this.stage.vars.falling = 6;
          this.stage.vars.jumpKey = 1;
        } else {
          this.stage.vars.jumpKey = 0;
        }
      }
      if (this.stage.vars.speedY < 4 || this.keyPressed("up arrow")) {
        this.stage.vars.speedY += -1;
      } else {
        this.stage.vars.speedY += -2;
      }
      this.costume = "Stand_1";
      yield* this.setCostume();
      yield;
    }
  }

  *touchGround(up) {
    this.stage.vars.falling += 1;
    while (!!this.touching(this.sprites["Ground"].andClones())) {
      if (up) {
        this.y += -1;
      } else {
        this.y += 1;
        this.stage.vars.falling = 0;
      }
      this.stage.vars.speedY = 0;
    }
  }

  *walk(direction, speed) {
    this.direction = direction;
    this.x += speed;
    this.stage.vars.slope = 0;
    while (
      !(
        this.stage.vars.slope == 8 ||
        !this.touching(this.sprites["Ground"].andClones())
      )
    ) {
      this.y += 1;
      this.stage.vars.slope += 1;
    }
    if (this.stage.vars.slope == 8) {
      this.x += 0 - speed;
      this.y += 0 - this.stage.vars.slope;
    }
    this.stage.vars.frame += 0.5;
  }

  *setCostume() {
    if (this.stage.vars.falling < 3) {
      if (this.stage.vars.frame == 0) {
        this.costume = "Stand_1";
      } else {
        this.costume = Math.floor(4 + (this.stage.vars.frame % 8));
      }
    } else {
      if (this.stage.vars.speedY > 0) {
        this.costume = "Jump_1";
      } else {
        this.costume = "Fall_1";
      }
    }
  }
}
