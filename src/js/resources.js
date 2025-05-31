import { ImageSource, Sound, Resource, Loader, ImageWrapping } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Background: new ImageSource('images/Background.png', { wrapping: ImageWrapping.Repeat }),
    Player: new ImageSource('images/Spaceship.png'),
    Bullet: new ImageSource('images/Bullet.png'),
    EnemyDefault: new ImageSource('images/EnemyDefault.png'),
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }