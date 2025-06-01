import { ImageSource, Sound, Resource, Loader, ImageWrapping } from 'excalibur'
import { Meteorite } from './meteorite'
import { HealthPack } from './healthpack'
import { EliteEnemy } from './eliteEnemy'

// voeg hier jouw eigen resources toe
const Resources = {
    Background: new ImageSource('images/Background.png', { wrapping: ImageWrapping.Repeat }),
    Player: new ImageSource('images/Spaceship.png'),
    Bullet: new ImageSource('images/Bullet.png'),
    EnemyDefault: new ImageSource('images/EnemyDefault.png'),
    Meteorite: new ImageSource('images/meteorite.png'),
    HealthPack: new ImageSource('images/HealthPack.png'),
    EliteEnemy: new ImageSource('images/eliteEnemy.png'),
    EnemyLaser: new ImageSource('images/enemyLaser.png'),
}






const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }