//Class to draw animations on the canvas
import { planet } from "./../objects/planet";
import { moon } from "./../objects/moon";
import { cObject } from "./../objects/cObject";

export class canvasManager {
    // clear canvas
    static clearCanvas(context:CanvasRenderingContext2D) {
        context.clearRect(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
    }

    static drawPlanet(context, planet:cObject, zoomLevel:number, showName:boolean)
    {
        // Draw a planet at their appropriate coordinates
        // Coordinates are absolute for the planet compared to origin, centered on canvas
        context.beginPath();
            context.fillStyle = planet.color;
            let x = ((planet.currentPosition.x)*((context.canvas.clientWidth/2)/zoomLevel) + context.canvas.clientWidth/2);
            let y = ((planet.currentPosition.y)*((context.canvas.clientWidth/2)/zoomLevel) + context.canvas.clientWidth/2); 
            context.moveTo(x, y);
            context.arc(x, y, planet.size, 0, Math.PI * 2);
        context.fill();
        if (showName)
        {
            context.fillStyle = "#00ee00";
            context.font = "10px Arial";
        context.fillText(planet.name, (x - 15 ), y+15);
        }
    }

    static drawMoon(context, moon:moon, zoomLevel:number, showName:boolean)
    {
        // Draw a moon at their appropriate coordinates
        // Coordinates are absolute for the planet compared to the mother planet's
        context.beginPath();
            context.fillStyle = moon.color;
            let x = ((moon.currentPosition.x)*((context.canvas.clientWidth/2)/zoomLevel)  + context.canvas.clientWidth/2);
            let y = ((moon.currentPosition.y)*((context.canvas.clientWidth/2)/zoomLevel) + context.canvas.clientWidth/2); 
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

    // Draw a circle indicating a celestial object's orbit
    static drawOrbit(context, object:cObject, parent:cObject, zoomLevel:number, width:number)
    {
        context.beginPath();
            context.lineWidth = 1;
            context.strokeStyle = "#00ee00";
            let x = (parent.currentPosition.x)*((context.canvas.clientWidth/2)/zoomLevel)  + context.canvas.clientWidth/2;
            let y = (parent.currentPosition.y)*((context.canvas.clientWidth/2)/zoomLevel) + context.canvas.clientWidth/2; 
            context.arc(x,y, object.orbitRadius * ((context.canvas.clientWidth/2)/zoomLevel),0, Math.PI * 2);
        context.stroke();
        
    }

    // Fill in an area with color to indicate the aproximate location of an object's orbit
    static drawObjectArea(context, object:cObject, objectOrbitWidth:number,  zoomLevel:number, showName: boolean)
    {
        context.beginPath();
            context.strokeStyle = object.color;
            context.lineWidth = object.size;
            let x = context.canvas.clientWidth/2;
            let y = context.canvas.clientWidth/2; 
            context.arc(x,y, object.orbitRadius * ((context.canvas.clientWidth/2)/zoomLevel),0, Math.PI * 2);
        context.stroke();
        if (showName)
        {
            context.fillStyle = "#00ee00";
            context.font = "10px Arial";
            context.fillText(object.name, x-25, y+(object.orbitRadius*((context.canvas.clientWidth/2)/zoomLevel))+15);
        }
    }

    // Draw the background for the map (dark blue/black)
    static drawSky(context)
    {
        context.beginPath();
            context.rect(0,0,context.canvas.clientWidth, context.canvas.clientHeight);
            context.fillStyle= "#282838";
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