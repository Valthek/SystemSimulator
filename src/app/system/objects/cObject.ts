// base class for celestial objects (everything)
import { vector2d } from "./../engine/vector2d";

export class cObject {
    // Identity Values
    objectID:number;
    name: string;
    color:string;
    size:number;

    // Object Values
    orbitRadius: number;
    radialVelocity: number;
    initialAngle: number;
    currentAngle: number;

    // internal values
    currentPosition: vector2d;
    
    constructor(objectID:number, name: string, color:string, objectSize:number, orbitRadius: number, velocity: number,initialAngle: number ) {
        this.objectID = objectID;
        this.name = name;
        this.color = color;
        this.size = objectSize;

        // angles must be in radians for Math.cos & Math.sin to work
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

    // set the object's angle to that corresponding with a specific date
    setAngle(currentDate:number)
    {
        this.currentAngle = this.getAngleForDate(currentDate);
    }

    // get the object's angle for a specific date without updating the position
    getAngleForDate(date:number)
    {
        let angle = this.initialAngle - (date * this.radialVelocity);
        angle = angle%(Math.PI*2);
        return angle;
    }
}