import { Actor, Vector } from 'excalibur';
import { Resources } from './resources.js';

export class Enemy extends Actor {
    constructor() {
        super({ width: Resources.EnemyDefault.width, height: Resources.EnemyDefault.height });
        this.graphics.use(Resources.EnemyDefault.toSprite());
        this.scale = new Vector(0.2, 0.2);
    }
    onInitialize() {
        this.pos = new Vector(Math.random() * 1280, Math.random() * 720);
    }
}
