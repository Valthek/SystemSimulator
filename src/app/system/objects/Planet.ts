import {cObject} from "./cObject";

export class planet extends cObject
{
    angle: number;
    radius : number;
    rotationRadius  : number;
    initialX  : number;
    initialY : number;
    incrementer;

    currentX = 0;
    currentY = 0;

    constructor(name, distance, velocity, angle, radius, initialPosition) {
        super(name, distance, velocity);
        this.angle = angle;
        this.radius = distance;
        this.rotationRadius = distance;
        this.initialX = initialPosition.x;
        this.initialY = initialPosition.y;
        this.incrementer = .01 + Math.random() * .1;
    }    

    update(mainContext)
    {
        this.angle += this.incrementer;

        this.currentX = this.initialX + this.rotationRadius * Math.cos(this.angle);
        this.currentY = this.initialY + this.rotationRadius * Math.sin(this.angle);

        if (this.angle >= (Math.PI * 2)) 
        {
            this.angle = 0;
            this.incrementer = .01 + Math.random() * .1;
        }

        // The following code is responsible for actually drawing the circle on the screen
        mainContext.beginPath();
        mainContext.arc(this.currentX, this.currentY, this.radius, 0, Math.PI * 2, false);
        mainContext.closePath();
        mainContext.fillStyle = 'rgba(177, 0, 129, .1)';
        mainContext.fill();
    };
}