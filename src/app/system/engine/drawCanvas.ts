//Class to draw animations on the canvas
import { cObject } from "./../objects/cObject"

export class drawCanvas {
    // properties
    mainCanvas: HTMLCanvasElement;
    mainContext;
    canvasWidth: number;
    canvasHeight: number;
    animationRunning: boolean;
    animationRequestID;


    // typecast element as HTMLCanvasElement to ensure methods are available
    ngOnInit() {
        this.mainCanvas = document.querySelector("#simulatorCanvas") as HTMLCanvasElement;
        this.mainContext = this.mainCanvas.getContext("2d");

        this.canvasWidth = this.mainCanvas.width;
        this.canvasHeight = this.mainCanvas.height;
        this.animationRunning = false;
    }

    startAnimation() {
        this.animationRunning = true;
    }

    stopAnimation() {
        this.animationRunning = false;
        cancelAnimationFrame(this.animationRequestID);
    }

    animate(framerate: number, objects: cObject[]) {
        // Animation Loop
        if (this.animationRunning) {
            setTimeout(function () {
                // Clear canvas
                this.mainContext.clearRect(0,0,this.canvasWidth, this.canvasHeight);
                this.mainContext.fillStyle='#f6f6f6';
                this.mainContext.fillRect(0,0,this.canvasWidth, this.canvasHeight);
                // Call draw functions here
                this.animationRequestID = requestAnimationFrame(this.animate);

                console.log("Refresh");
            }, 1000 / framerate);
        }
    }
}