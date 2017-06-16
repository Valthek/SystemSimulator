//Class to draw animations on the canvas
import { planet } from "./../objects/planet";

export class canvasManager {
    // clear canvas
    static clearCanvas(context:CanvasRenderingContext2D) {
        context.clearRect(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
    }

    static drawPlanet(context, planet:planet, zoomLevel:number)
    {
        // Draw a planet at their appropriate coordinates
        context.beginPath();
        context.fillStyle = '#ff00ee';
            let x = (planet.currentPosition.x + context.canvas.clientWidth/2);
            let y = (planet.currentPosition.y + context.canvas.clientHeight/2); 
            context.moveTo(x, y);
            context.arc(x, y, planet.size / zoomLevel, 0, Math.PI * 2);
        context.fill();
    }
}