import { Actor, Vector } from 'excalibur';
import { Resources } from './resources.js';
import { UI } from './ui.js';




export class Enemy extends Actor {
    targetX = 1100;
    health = 3;
    maxHealth = 3;


    constructor() {
        super({ width: Resources.EnemyDefault.width, height: Resources.EnemyDefault.height });
        this.graphics.use(Resources.EnemyDefault.toSprite());
        this.scale = new Vector(0.2, 0.2);
        this.pos = new Vector(1280, Math.random() * 720);
        this.vel = new Vector(-100, 0);
    }
    onInitialize() {

    }
    onPreUpdate(engine, delta) {
        let direction = engine.player.pos.sub(this.pos).normalize()
        this.vel = direction.scale(200)
        if (this.health <= 0) {
            this.kill();
            const ui = this.scene.actors.find(actor => actor instanceof UI);
            if (ui) {
                ui.updateScore(ui.score + 10);
            }
        }
    }


}
