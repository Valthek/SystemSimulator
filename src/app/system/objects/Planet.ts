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

    updatePosition(simSpeed:number) {
        this.currentAngle =+this.currentAngle + (this.radialVelocity/simSpeed);

        this.currentPosition.x = this.orbitRadius * Math.cos(this.currentAngle);
        this.currentPosition.y = this.orbitRadius * Math.sin(this.currentAngle);

        if(this.currentAngle >= (Math.PI * 2)){
            this.currentAngle -= +(Math.PI * 2);
        }
    }
}