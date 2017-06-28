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
            context.fillStyle = planet.color;
            let x = ((planet.currentPosition.x)*zoomLevel + context.canvas.clientWidth/2);
            let y = ((planet.currentPosition.y)*zoomLevel + context.canvas.clientHeight/2); 
            context.moveTo(x, y);
            context.arc(x, y, planet.size, 0, Math.PI * 2);
        context.fill();

            context.fillStyle = "#00ee00";
            context.font = "10px Arial";
        context.fillText(planet.name, x, y+10);
    }

    static drawOrbit(context, planet:planet, zoomLevel:number)
    {
        context.beginPath();
            context.strokeStyle = "#00ee00";
            let x = context.canvas.clientWidth/2;
            let y = context.canvas.clientHeight/2; 
            context.arc(x,y, planet.orbitRadius * zoomLevel,0, Math.PI * 2);
        context.stroke();
    }

    static drawSky(context)
    {
        context.beginPath();
            context.rect(0,0,context.canvas.clientWidth, context.canvas.clientHeight);
            context.fillStyle= "#000919";
        context.fill();
    }
}