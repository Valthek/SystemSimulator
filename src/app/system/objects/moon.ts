import {vector2d} from './../engine/vector2d';
import {cObject} from "./cObject";
import {Library} from "./../engine/Library"

export class moon extends cObject
{
    constructor(objectID:number, name:string, moonSize:number, realDiameter:number, moonColor:string, planetOrbit:number,velocity:number, initialAngle:number) {
        super(objectID, name, moonColor, moonSize, realDiameter, 0.025,velocity, initialAngle );
    }    
}