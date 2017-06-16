import {vector2d} from './../engine/vector2d';
import {cObject} from "./cObject";

export class planet extends cObject
{
    color:string;
    size:number;

    constructor(name:string, initialAngle:number, distance:number, velocity:number,  planetSize:number, planetColor:string) {
        super(name, distance, initialAngle, velocity);
        this.size = planetSize;
        this.color = planetColor;
    }    

    updatePosition(zoomLevel) {
        this.currentAngle = +this.radialVelocity + +this.currentAngle;
        //this.currentPosition.x = this.radius * Math.cos(this.currentAngle) * zoomLevel;
        //this.currentPosition.y = this.radius * Math.sin(this.currentAngle) * zoomLevel;

        if(this.currentAngle >= (Math.PI * 2)){
            this.currentAngle = +this.currentAngle - +(Math.PI * 2);
        }
        console.log(this.currentAngle)
    }
}