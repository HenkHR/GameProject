import { Label, ScreenElement, Vector, FontUnit, Color, Actor } from 'excalibur';
import { Resources } from './resources.js';
import { Font } from 'excalibur';

export class UI extends ScreenElement {

    score = 0;
    scoreText
    playerhealth = 1;
    constructor() {
        super({
        });
        this.z = 1000; // Ensure UI is always on top
    }

    onInitialize(engine) {
        this.scoreText = new Label({
            text: 'Score: 0',
            pos: new Vector(0, 0),
            font: new Font({
                family: 'Arial',
                size: 24,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.addChild(this.scoreText)
        let barbackground = new Actor({ x: 10, y: 40, color: Color.fromRGB(255, 255, 255, 0.4), width: 200, height: 20, anchor: Vector.Zero })
        this.addChild(barbackground)

        this.healthbar = new Actor({ x: 10, y: 40, color: Color.Green, width: 200, height: 20, anchor: Vector.Zero })
        this.addChild(this.healthbar)
    }


    reduceHealth() {
        this.healthbar.scale = new Vector(this.playerhealth, 1) // de health is nu 50%
    }
    updateScore(score) {
        this.score = score;
        this.scoreText.text = `Score: ${score}`
    }
}