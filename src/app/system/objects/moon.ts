import {vector2d} from './../engine/vector2d';
import {cObject} from "./cObject";

export class moon extends cObject
{
    constructor(objectID:number, name:string, moonSize:number, moonColor:string, distance:number,velocity:number, initialAngle:number) {
        super(objectID, name, moonColor, moonSize, distance, initialAngle, velocity);
    }    
}