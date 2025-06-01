import { Resources } from "./resources";
import { Actor, Vector } from "excalibur";
import { Color } from "excalibur";
import { Player } from "./player.js";



export class EnemyLaser extends Actor {
    hasHit = false;
    constructor() {
        super({ width: Resources.Bullet.width, height: Resources.Bullet.height });
        this.events.on("exitviewport", () => this.kill())
        this.graphics.use(Resources.EnemyLaser.toSprite());

    }
    onInitialize() {
        this.scale = new Vector(0.07, 0.1);
        this.events.on("collisionstart", (event) => this.hitsomething(event));
    }

    hitsomething(event) {
        if (this.hasHit) {
            return;
        }

        if (event.other.owner instanceof Player) {
            event.other.owner.health -= 1;
            event.other.owner.graphics.current.tint = Color.Red;
            setTimeout(() => {
                event.other.owner.graphics.current.tint = Color.White;
            }, 100);
            this.kill();

        }
    }

}