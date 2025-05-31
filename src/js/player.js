import { Resources } from "./resources";
import { Actor, Vector } from "excalibur";
import { Bullet } from "./bullet";


export class Player extends Actor {
    isDashing = false
    dashTime = 0
    dashDuration = 200
    dashSpeed = 600

    constructor() {
        super({ width: Resources.Player.width, height: Resources.Player.height });
        this.graphics.use(Resources.Player.toSprite());
        this.pos = new Vector(400, 225);
        this.scale = new Vector(0.1, 0.1);
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

        // if (engine.input.keyboard.isHeld('ShiftLeft') && !this.isDashing) {
        //     this.startDash()
        // }

        if (engine.input.keyboard.wasPressed('Space')) {
            this.shoot();

        }
        // if (this.isDashing) {
        //     this.dashTime += delta
        //     // Gradually slow down dash
        //     const t = this.dashTime / this.dashDuration
        //     this.vel = new Vector(0, this.dashSpeed * (this.vel.y - t)) //Dash down

        //     if (this.dashTime >= this.dashDuration) {
        //         this.isDashing = false
        //         this.vel = Vector.Zero
        //     }
        // }

    }

    // startDash() {
    //     this.isDashing = true
    //     this.dashTime = 0
    //     this.vel = new Vector(this.dashSpeed, 0)
    // }

    shoot() {
        const bullet = new Bullet()
        bullet.pos = this.pos.clone()
        bullet.pos.x += this.width / 2
        bullet.vel = new Vector(500, 0)
        this.scene.add(bullet)
    }
}