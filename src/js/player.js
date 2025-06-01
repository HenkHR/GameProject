import { Resources } from "./resources";
import { Actor, Vector } from "excalibur";
import { Bullet } from "./bullet";
import { Meteorite } from "./meteorite";
import { HealthPack } from "./healthpack";
import { Enemy } from "./Enemy";
import { UI } from "./ui";


export class Player extends Actor {
    isDashing = false
    dashTime = 0
    dashDuration = 200
    dashSpeed = 600
    maxHealth = 5
    health = 5

    constructor() {
        super({ width: Resources.Player.width, height: Resources.Player.height });
        this.graphics.use(Resources.Player.toSprite());
        this.pos = new Vector(100, 225);
        this.scale = new Vector(0.1, 0.1);
        this.events.on("collisionstart", (event) => this.hitsomething(event));

    }

    onPreUpdate(engine, delta) {
        if (engine.input.keyboard.isHeld('ArrowUp')) {
            this.pos.y -= 5;
        }
        if (engine.input.keyboard.isHeld('ArrowDown')) {
            this.pos.y += 5;
        }
        if (engine.input.keyboard.isHeld('ArrowLeft')) {
            this.pos.x -= 3;
        }
        if (engine.input.keyboard.isHeld('ArrowRight')) {
            this.pos.x += 3;
        }


        if (engine.input.keyboard.wasPressed('Space')) {
            this.shoot();

        }
    }

    hitsomething(event) {
        const ui = this.scene.actors.find(actor => actor instanceof UI);
        if (event.other.owner instanceof Meteorite) {
            this.health -= 2;
            ui.playerhealth -= 0.2;
            ui.reduceHealth();
            if (this.health <= 0) {
                this.scene.engine.showGameOver();
                this.kill();
            }
            event.other.owner.kill();
        }
        if (event.other.owner instanceof HealthPack) {
            this.health += 1;
            ui.playerhealth += 0.2;
            ui.reduceHealth();
            if (this.health > this.maxHealth) {
                this.health = this.maxHealth;
            }
            event.other.owner.kill();
        }
        if (event.other.owner instanceof Enemy) {
            this.health -= 1;
            ui.playerhealth -= 0.2;
            ui.reduceHealth();
            if (this.health <= 0) {
                this.scene.engine.showGameOver();
                this.kill();
            }
            event.other.owner.kill();
        }
    }


    shoot() {
        const bullet = new Bullet()
        bullet.pos = this.pos.clone()
        bullet.pos.x += this.width / 2
        bullet.vel = new Vector(500, 0)
        this.scene.add(bullet)
    }
}