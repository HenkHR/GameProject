import { Actor, Vector } from 'excalibur'
import { Resources } from './resources.js'
import { Enemy } from './Enemy.js'
import { UI } from './ui.js'
import { EnemyLaser } from './enemyLaser.js'
import { Timer } from 'excalibur'




export class EliteEnemy extends Enemy {
    constructor() {
        super({ width: Resources.EliteEnemy.width, height: Resources.EliteEnemy.height });
        this.graphics.use(Resources.EliteEnemy.toSprite());
    }
    onInitialize() {
        const enemyShootTimer = new Timer({
            fcn: () => {
                this.shoot();
            },
            interval: 2000, // milliseconds
            repeats: true
        })
        this.scene.add(enemyShootTimer)
        enemyShootTimer.start()
    }
    shoot() {
        const laser = new EnemyLaser()
        laser.pos = this.pos.clone()
        laser.pos.x -= this.width / 2
        laser.vel = new Vector(-400, 0)
        if (this.scene) {
            this.scene.add(laser)
        }
    }

    onPreUpdate(engine, delta) {
        if (this.pos.x <= this.targetX) {
            this.vel.x = 0;
            this.pos.x = this.targetX;

            if (this.vel.y === 0) {
                this.vel.y = 100
            }

            // Bounce off top and bottom edges
            if (this.pos.y <= 0) {
                this.vel.y = Math.abs(100)
            }
            if (this.pos.y >= engine.drawHeight - this.height * this.scale.y) {
                this.vel.y = -Math.abs(100)
            }
        }

        if (this.health <= 0) {
            if (this.enemyShootTimer) {
                this.enemyShootTimer.stop();
            }
            this.kill();
            const ui = this.scene.actors.find(actor => actor instanceof UI);
            if (ui) {
                ui.updateScore(ui.score + 50);
            }
        }

        if (this.pos.x <= 0) {
            if (this.enemyShootTimer) {
                this.enemyShootTimer.stop();
            }
            this.kill();
        }
    }
}