// base class for celestial objects (everything)
import { vector2d } from "./../engine/vector2d";

export class cObject {
    name: string;
    currentPosition: vector2d;
    radialVelocity: number;
    currentAngle: number;
    radius: number;

    constructor(name: string, distance: number, initialAngle: number, velocity: number) {
        this.name = name;
        this.currentAngle = initialAngle;
        this.radius = distance;
        let x = distance * Math.cos(initialAngle);
        let y = distance * Math.sin(initialAngle);
        this.currentPosition = new vector2d(x, y);
        this.radialVelocity = velocity;
    }
}