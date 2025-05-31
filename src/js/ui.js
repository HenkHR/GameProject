import { Label, ScreenElement, Vector, FontUnit, Color } from 'excalibur';
import { Resources } from './resources.js';
import { Font } from 'excalibur';

export class UI extends ScreenElement {

    scoreText
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
    }

    updateScore(score) {
        this.scoreText.text = `Score: ${score}`
    }
}