import {vector2d} from './../engine/vector2d';
import {cObject} from "./cObject";
import {Library} from "./../engine/Library"

export class moon extends cObject
{
    constructor(objectID:number, name:string, realDiameter:number, moonColor:string, planetSize:number,velocity:number, initialAngle:number) {
        super(objectID, name, moonColor, realDiameter, planetSize * 0.075,velocity, initialAngle );
    }    
}