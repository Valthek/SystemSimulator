// base class for celestial objects (everything)
import {vector2d} from "./../engine/vector2d";

export class cObject{
    name: string;
    //position: vector2d;
    distanceToOrigin:number;
    radialVelocity:number;

    constructor(name, distance, velocity)
    {
        this.name = name;
        this.distanceToOrigin = distance;
        this.radialVelocity = velocity;
    }
}