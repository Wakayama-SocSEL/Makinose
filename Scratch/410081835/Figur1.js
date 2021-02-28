import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Figur1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Kostüm1", "./Figur1/costumes/Kostüm1.svg", { x: 48, y: 50 }),
      new Costume("Kostüm2", "./Figur1/costumes/Kostüm2.svg", { x: 46, y: 53 })
    ];

    this.sounds = [new Sound("Miau", "./Figur1/sounds/Miau.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.vars.meineVariable = 0;
    while (true) {
      this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
      if (this.keyPressed("right arrow")) {
        this.direction = 90;
        this.stage.vars.meineVariable += 3;
      }
      if (this.keyPressed("left arrow")) {
        this.direction = -90;
        this.stage.vars.meineVariable += -3;
      }
      this.x += this.stage.vars.meineVariable;
      this.stage.vars.meineVariable = this.stage.vars.meineVariable * 0.75;
      yield;
    }
  }
}
