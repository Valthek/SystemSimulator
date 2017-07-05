import { vector2d } from './../engine/vector2d';
import { cObject } from "./cObject";
import { moon } from "./moon";

export class planet extends cObject
{
    color:string;
    size:number;
    moons:moon [] = [];

    constructor(name:string, initialAngle:number, distance:number, velocity:number,  planetSize:number, planetColor:string, moons:moon[]) {
        super(name, distance, initialAngle, velocity);
        this.size = planetSize;
        this.color = planetColor;
        this.moons = moons;
    }    
}