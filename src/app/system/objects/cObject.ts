// base class for celestial objects (everything)
import { Library } from '../engine/Library';
import { vector2d } from './../engine/vector2d';

export class cObject {
    // Identity Values
    objectID: number;
    name: string;
    color: string;
    size: number;
    actualDiameter: number;

    // Object Values
    orbitRadius: number;
    radialVelocity: number;
    initialAngle: number;
    currentAngle: number;

    // internal values
    currentPosition: vector2d;

    constructor(objectID: number, name: string, color: string, actualDiameter: number, orbitRadius: number, velocity: number, initialAngle: number ) {
        this.objectID = objectID;
        this.name = name;
        this.color = color;
        // diameter in KM
        this.actualDiameter = actualDiameter;
        // AU is in m, not KM
        this.size = (actualDiameter / Library.astronomicalUnit) * 1000;

        // angles must be in radians for Math.cos & Math.sin to work
        this.currentAngle = Library.toRadian(initialAngle);
        this.initialAngle = Library.toRadian(initialAngle);

        this.orbitRadius = orbitRadius;

        this.radialVelocity = Library.toRadian(velocity);

        const radian = Library.toRadian(initialAngle);

        const x = +orbitRadius * Math.cos(radian);
        const y = +orbitRadius * Math.sin(radian);
        this.currentPosition = new vector2d(x, y);
    }

    // Update position relative to a central point (a planet or the sun, usually)
    updatePosition(zeroPosition: vector2d) {
        this.currentPosition.x =  zeroPosition.x + (this.orbitRadius * Math.cos(this.currentAngle));
        this.currentPosition.y =  zeroPosition.y + (this.orbitRadius * Math.sin(this.currentAngle));
    }

    // set the object's angle to that corresponding with a specific date
    setAngle(currentDate: number) {
        this.currentAngle = this.getAngleForDate(currentDate);
    }

    // get the object's angle for a specific date without updating the position
    getAngleForDate(date: number) {
        let angle = this.initialAngle - (date * this.radialVelocity);
        angle = angle % (Math.PI * 2);
        return angle;
    }

    getPositionForDate(date: number, zeroPosition: vector2d) {
        const position: vector2d = new vector2d(0, 0);
        const dateAngle = this.getAngleForDate(date);
        position.x =  zeroPosition.x + (this.orbitRadius * Math.cos(dateAngle));
        position.y =  zeroPosition.y + (this.orbitRadius * Math.sin(dateAngle));
        return position;
    }

    getPositionForAngle(angle: number, zeroPosition: vector2d) {
        const position: vector2d = new vector2d(0, 0);
        angle = angle % (Math.PI * 2);
        position.x =  zeroPosition.x + (this.orbitRadius * Math.cos(angle));
        position.y =  zeroPosition.y + (this.orbitRadius * Math.sin(angle));
        return position;
    }
}
