import { Enemy } from "./Enemy";
import { Meteorite } from "./meteorite";
import { Resources } from "./resources";
import { Actor, Vector } from "excalibur";
import { Color } from "excalibur";



export class Bullet extends Actor {
    hasHit = false;
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
        if (this.hasHit) {
            return;
        }
        if (event.other.owner instanceof Enemy) {
            event.other.owner.health -= 1;
            event.other.owner.graphics.current.tint = Color.Red;
            setTimeout(() => {
                event.other.owner.graphics.current.tint = Color.White;
            }, 100);
            this.kill();
        }
        if (event.other.owner instanceof Meteorite) {
            event.other.owner.health -= 1;
            event.other.owner.graphics.current.tint = Color.Red;
            setTimeout(() => {
                event.other.owner.graphics.current.tint = Color.White;
            }, 100);
            this.kill();

        }
    }

}