import {vector2d} from './../engine/vector2d';
import {cObject} from "./cObject";

export class moon extends cObject
{
    size: number;
    color: string;

    constructor(name:string, initialAngle:number, distance:number, velocity:number,  planetSize:number, moonColor:string) {
        super(name, planetSize*planetSize * 0.005, initialAngle, velocity);

        this.size = 1;
        this.color = moonColor;
    }    
}