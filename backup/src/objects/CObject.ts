// base class for celestial objects (everything)
import {vector2d} from "../engine/vector2d";

export class CObject{
    name: string;
    position: vector2d;
    distanceToOrigin:number;
    radialVelocity:number;
}