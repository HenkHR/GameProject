import { Resources } from "./resources";
import { Actor, Vector } from "excalibur";
import { Color } from "excalibur";
import { Player } from "./player.js"
import { UI } from "./ui.js";



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
        const ui = this.scene.actors.find(actor => actor instanceof UI);

        if (this.hasHit) {
            return;
        }

        if (event.other.owner instanceof Player) {
            event.other.owner.health -= 1;
            ui.playerhealth -= 0.2;
            ui.reduceHealth();
            if (event.other.owner.health <= 0) {
                this.scene.engine.showGameOver();
                event.other.owner.kill();
            }
            event.other.owner.graphics.current.tint = Color.Red;
            setTimeout(() => {
                event.other.owner.graphics.current.tint = Color.White;
            }, 100);
            this.kill();

        }
    }

}