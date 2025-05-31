import { Enemy } from "./Enemy";
import { Resources } from "./resources";
import { Actor, Vector } from "excalibur";

export class Bullet extends Actor {
    constructor() {
        super({ width: Resources.Bullet.width, height: Resources.Bullet.height });
        this.events.on("exitviewport", () => this.kill)

    }
    onInitialize() {
        this.graphics.use(Resources.Bullet.toSprite());
        this.scale = new Vector(0.07, 0.1);
        this.events.on("collisionstart", (event) => this.hitsomething(event));
    }
    hitsomething(event) {
        if (event.other.owner instanceof Enemy) {
            event.other.owner.kill()
        }
    }
}