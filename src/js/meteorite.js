import { Actor, Vector, EdgeCollider, CollisionType } from 'excalibur'
import { Resources } from './resources.js'
import { UI } from './ui.js'

export class Meteorite extends Actor {
    health = 5;
    maxHealth = 5;
    constructor() {
        super({ width: Resources.Meteorite.width, height: Resources.Meteorite.height });
        this.graphics.use(Resources.Meteorite.toSprite());
        this.scale = new Vector(0.1, 0.1);
        this.pos = new Vector(1350, Math.random() * 720);
        this.vel = new Vector(-200, 0);
        this.z = 1000; // Ensure it appears above other actors
    }
    onInitialize() {

    }

    onPreUpdate(engine) {
        if (this.health <= 0) {
            this.kill();
            const ui = this.scene.actors.find(actor => actor instanceof UI);
            if (ui) {
                ui.updateScore(ui.score + 50);
            }
        }
        if (this.pos.x <= 0) {
            this.kill();
        }
    }
}