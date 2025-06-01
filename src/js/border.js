import { Actor, Vector, EdgeCollider, CollisionType } from 'excalibur'

export class Border extends Actor {
    constructor(begin, end) {
        super()
        let edge = new EdgeCollider({ begin, end })
        this.body.collisionType = CollisionType.Fixed
        this.collider.set(edge)
    }
}