// base class for celestial objects (everything)
import { vector2d } from "./../engine/vector2d";

export class cObject {
    // changing values
    currentPosition: vector2d;
    // currentAngle is in radians for ease of calculation
    currentAngle: number;
    // static values
    name: string;
    // initialAngle is in radians for ease of calculation
    initialAngle:number;
    // radialVelocity is in radians for ease of calculation
    radialVelocity: number;
    orbitRadius: number;

    constructor(name: string, orbitRadius: number, initialAngle: number, velocity: number) {
        this.name = name;

        this.currentAngle = vector2d.ToRadian(initialAngle);
        this.initialAngle = vector2d.ToRadian(initialAngle);

        this.orbitRadius = orbitRadius;

        if (velocity != 0){
        this.radialVelocity = (1/vector2d.ToRadian(velocity)/336); 
    }
    else
    {
        this.radialVelocity = 0;
    }

        let radian = vector2d.ToRadian(initialAngle);

        let x = +orbitRadius * Math.cos(radian);
        let y = +orbitRadius * Math.sin(radian);
        this.currentPosition = new vector2d(x, y);
    }
}