import { Actor, Vector } from 'excalibur'
import { Resources } from './resources.js';


export class HealthPack extends Actor {
    constructor() {
        super({ width: Resources.HealthPack.width, height: Resources.HealthPack.height });
        this.graphics.use(Resources.HealthPack.toSprite());
        this.scale = new Vector(0.1, 0.1);
        this.pos = new Vector(Math.random() * 1280, Math.random() * 800);
    }

    onInitialize() {

    }

    onPreUpdate(engine) {
        if (this.pos.x <= 0 || this.pos.y <= 0 || this.pos.x >= engine.drawWidth || this.pos.y >= engine.drawHeight) {
            this.kill();
        }
    }
}