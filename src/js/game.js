import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { Background } from './background.js'
import { UI } from './ui.js'
import { Enemy } from './Enemy.js'

export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        })
        this.start(ResourceLoader).then(() => this.startGame())
        this.ui = new UI()
        this.add(this.ui)
    }

    startGame() {
        this.toggleDebug()
        const background = new Background()
        this.add(background)
        console.log("start de game!")
        const player = new Player()
        this.add(player)
        const enemy = new Enemy()
        this.add(enemy)

    }
}

new Game()
