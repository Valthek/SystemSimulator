//Class to draw animations on the canvas
import { planet } from "./../objects/planet"

export class drawCanvas 
{
    mainCanvas: HTMLCanvasElement;
    mainContext;
    canvasWidth: number; 
    canvasHeight: number;
    // properties
    // typecast element as HTMLCanvasElement to ensure methods are available
    ngOnInit(){
    this.mainCanvas = document.querySelector("#simulatorCanvas") as HTMLCanvasElement;
    this.mainContext = this.mainCanvas.getContext("2d");

    this.canvasWidth = this.mainCanvas.width;
    this.canvasHeight = this.mainCanvas.height;
    }
    constructor(){

    }

    drawCircle() {
        this.mainContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        // color in the background
        this.mainContext.fillStyle = "#EEEEEE";
        this.mainContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        // draw the circle
        this.mainContext.beginPath();

        var radius = 175;
        this.mainContext.arc(225, 225, radius, 0, Math.PI * 2, false);
        this.mainContext.closePath();

        // color in the circle
        this.mainContext.fillStyle = "#006699";
        this.mainContext.fill();
    }
}