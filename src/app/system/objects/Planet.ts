import { vector2d } from './../engine/vector2d';
import { cObject } from "./cObject";
import { moon } from "./moon";

export class planet extends cObject
{
    moons:cObject [] = [];

    constructor(objectID:number, name:string, planetColor:string, planetSize:number, realDiameter:number, moons:moon[], distance:number, velocity:number, initialAngle:number ) 
    {
        super(objectID, name, planetColor, planetSize, realDiameter, distance,velocity, initialAngle);
        this.moons = moons;
    }    
}  