//Class to draw animations on the canvas
import { planet } from "./../objects/planet";
import { moon } from "./../objects/moon";
import { cObject } from "./../objects/cObject";

export class canvasManager {
    // clear canvas
    static clearCanvas(context:CanvasRenderingContext2D) {
        context.clearRect(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
    }

    static drawPlanet(context, planet:planet, zoomLevel:number)
    {
        // Draw a planet at their appropriate coordinates
        // Coordinates are absolute for the planet compared to origin, centered on canvas
        context.beginPath();
            context.fillStyle = planet.color;
            let x = ((planet.currentPosition.x)*zoomLevel + context.canvas.clientWidth/2);
            let y = ((planet.currentPosition.y)*zoomLevel + context.canvas.clientHeight/2); 
            context.moveTo(x, y);
            context.arc(x, y, planet.size, 0, Math.PI * 2);
        context.fill();

            context.fillStyle = "#00ee00";
            context.font = "10px Arial";
        context.fillText(planet.name, (x - 15 ), y+15);
    }

    static drawMoon(context, moon:moon, zoomLevel:number, showName:boolean)
    {
        // Draw a moon at their appropriate coordinates
        // Coordinates are absolute for the planet compared to the mother planet's
        context.beginPath();
            context.fillStyle = moon.color;
            let x = ((moon.currentPosition.x)*zoomLevel + context.canvas.clientWidth/2);
            let y = ((moon.currentPosition.y)*zoomLevel + context.canvas.clientHeight/2); 
            context.moveTo(x, y);
            context.arc(x, y, moon.size, 0, Math.PI * 2);
        context.fill();
        if (showName)
        {
            context.fillStyle = "#00ee00";
            context.font = "10px Arial";
        context.fillText(moon.name, (x - 15 ), y+15);
        }
    }

    // Draw a circle indicating the planet's orbit
    static drawOrbit(context, planet:cObject, parent:cObject, zoomLevel:number)
    {
        context.beginPath();
            context.strokeStyle = "#00ee00";
            let x = (parent.currentPosition.x*zoomLevel) + context.canvas.clientWidth/2;
            let y = (parent.currentPosition.y*zoomLevel) + context.canvas.clientHeight/2; 
            context.arc(x,y, planet.orbitRadius * zoomLevel,0, Math.PI * 2);
        context.stroke();
    }

    // Draw the background for the map (dark blue/black)
    static drawSky(context)
    {
        context.beginPath();
            context.rect(0,0,context.canvas.clientWidth, context.canvas.clientHeight);
            context.fillStyle= "#282832";
        context.fill();
    }

    // Render framerate in top left corner (render text, technically speaking)
    static drawFrameRate(context, frameRate)
    {
        context.beginPath();
        context.fillStyle = "#FFee00";
            context.font = "20px Arial";
        context.fillText(frameRate , 30,30);
    }
}