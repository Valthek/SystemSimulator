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
    initialAngle: number;
    // radialVelocity is in radians for ease of calculation
    radialVelocity: number;
    orbitRadius: number;
    objectID:number;

    constructor(name: string, orbitRadius: number, initialAngle: number, velocity: number, objectID:number) {
        this.name = name;
        this.objectID = objectID;

        this.currentAngle = vector2d.ToRadian(initialAngle);
        this.initialAngle = vector2d.ToRadian(initialAngle);

        this.orbitRadius = orbitRadius; 

        this.radialVelocity = vector2d.ToRadian(velocity);
       
        let radian = vector2d.ToRadian(initialAngle);

        let x = +orbitRadius * Math.cos(radian);
        let y = +orbitRadius * Math.sin(radian);
        this.currentPosition = new vector2d(x, y);
    }

    // Update position relative to a central point (a planet or the sun, usually)
    updatePosition(zeroPosition: vector2d) {
        this.currentPosition.x =  zeroPosition.x + (this.orbitRadius * Math.cos(this.currentAngle));
        this.currentPosition.y =  zeroPosition.y + (this.orbitRadius * Math.sin(this.currentAngle));
    }

    setAngle(currentDate:number)
    {
        let newAngle = this.initialAngle - (currentDate * this.radialVelocity);
        newAngle = newAngle%(Math.PI*2);

        this.currentAngle = newAngle;
    }
}