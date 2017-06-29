import {vector2d} from './../engine/vector2d';
import {cObject} from "./cObject";

export class moon extends cObject
{
    size: number;
    color: string;

    constructor(name:string, initialAngle:number, distance:number, velocity:number,  planetSize:number, moonColor:string) {
        super(name, distance, initialAngle, velocity);
        this.size = planetSize / 5;
        this.color = moonColor;
    }    

    updatePosition(simSpeed:number, planetPosition: vector2d) {
        this.currentAngle =+this.currentAngle + (this.radialVelocity/simSpeed);

        this.currentPosition.x = planetPosition.x + this.orbitRadius * Math.cos(this.currentAngle);
        this.currentPosition.y = planetPosition.y + this.orbitRadius * Math.sin(this.currentAngle);

        if(this.currentAngle >= (Math.PI * 2)){
            this.currentAngle -= +(Math.PI * 2);
        }
    }
}