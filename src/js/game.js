import '../css/style.css'
import { Engine, Vector, DisplayMode } from "excalibur"
import { ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { Background } from './background.js'
import { UI } from './ui.js'
import { Enemy } from './Enemy.js'
import { Meteorite } from './meteorite.js'
import { Border } from './border.js'
import { Timer } from 'excalibur'
import { ScreenElement, Label, Font, FontUnit, Color } from 'excalibur'
import { HealthPack } from './healthpack.js'
import { EliteEnemy } from './eliteEnemy.js'



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

        const width = 1280
        const height = 720

        // Top border
        this.add(new Border(new Vector(0, 0), new Vector(width, 0)))
        // Bottom border
        this.add(new Border(new Vector(0, height), new Vector(width, height)))
        // Left border
        this.add(new Border(new Vector(0, 0), new Vector(0, height)))
        // Right border
        this.add(new Border(new Vector(width, 0), new Vector(width, height)))

        const enemies = []

        // this.toggleDebug()

        const background = new Background()
        this.add(background)

        const player = new Player()
        this.add(player)
        this.player = player

        for (let i = 0; i < 2; i++) {
            const enemy = new Enemy()
            this.add(enemy)
            enemies.push(enemy)
        }

        for (let i = 0; i < 3; i++) {
            const meteorite = new Meteorite()
            this.add(meteorite)
        }

        const enemySpawnTimer = new Timer({
            fcn: () => {
                const currentEnemies = this.currentScene.actors.filter(actor => actor instanceof Enemy)
                if (currentEnemies.length < 5) {
                    const enemy = new Enemy()
                    this.add(enemy)
                }
            },
            interval: 2000, // milliseconds
            repeats: true
        })
        this.add(enemySpawnTimer)
        enemySpawnTimer.start()

        const meteoriteSpawnTimer = new Timer({
            fcn: () => {
                const currentMeteorites = this.currentScene.actors.filter(actor => actor instanceof Meteorite)
                if (currentMeteorites.length < 5) {
                    const meteorite = new Meteorite()
                    this.add(meteorite)
                }
            },
            interval: 5000, // milliseconds
            repeats: true
        })
        this.add(meteoriteSpawnTimer)
        meteoriteSpawnTimer.start()

        const eliteEnemySpawnTimer = new Timer({
            fcn: () => {
                const currentEliteEnemies = this.currentScene.actors.filter(actor => actor instanceof EliteEnemy)
                if (currentEliteEnemies.length < 2) {
                    const eliteEnemy = new EliteEnemy()
                    this.add(eliteEnemy)
                }
            },
            interval: 3000, // milliseconds
            repeats: true
        })
        this.add(eliteEnemySpawnTimer)
        eliteEnemySpawnTimer.start()

        const healthPackSpawnTimer = new Timer({
            fcn: () => {
                const currentHealthPacks = this.currentScene.actors.filter(actor => actor instanceof HealthPack)
                if (currentHealthPacks.length < 3) {
                    const healthPack = new HealthPack()
                    this.add(healthPack)
                }
            },
            interval: 10000, // milliseconds
            repeats: true
        })
        this.add(healthPackSpawnTimer)
        healthPackSpawnTimer.start()

    }
    showGameOver() {
        // Create a game over label
        this.gameOverScreen = new ScreenElement()
        const label = new Label({
            text: "Game Over\nPress R to Restart",
            pos: new Vector(this.drawWidth / 2, this.drawHeight / 2),
            font: new Font({
                family: 'Arial',
                size: 48,
                unit: FontUnit.Px,
                color: Color.Red,
                strokeColor: Color.Black,
                strokeThickness: 3
            }),
            anchor: new Vector(0.5, 0.5),
            z: 2000
        })
        this.gameOverScreen.addChild(label)
        this.add(this.gameOverScreen)

    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed('KeyR')) {
            window.location.reload();
        }
    }
}
new Game()
