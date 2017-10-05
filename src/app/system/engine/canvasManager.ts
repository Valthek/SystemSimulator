//Class to draw animations on the canvas
import { Library } from './Library';
import { planet } from "./../objects/planet";
import { moon } from "./../objects/moon";
import { cObject } from "./../objects/cObject";
import { vector2d } from "./vector2d";

export class canvasManager {
    // clear canvas
    static clearCanvas(context: CanvasRenderingContext2D) {
        context.clearRect(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
    }

    static drawPlanet(context, planet: cObject, zoomLevel: number, showName: boolean, positionOffset:vector2d) {
        // Draw a planet at their appropriate coordinates
        // Coordinates are absolute for the planet compared to origin, centered on canvas
        let zoom:number = this.getZoom(context, zoomLevel);
        context.beginPath();
        context.fillStyle = planet.color;
        let x = ((planet.currentPosition.x + positionOffset.x) * zoom + (context.canvas.clientWidth / 2))  ;
        let y = ((planet.currentPosition.y + positionOffset.y) * zoom + (context.canvas.clientHeight / 2)) ;
        context.moveTo(x, y);
        context.arc(x, y,  this.setObjectSize(planet.size, zoomLevel), 0, Math.PI * 2);
        context.fill();
        if (showName) {
            context.fillStyle = "#12B4CE";
            context.font = "10px Arial";
            context.fillText(planet.name, (x - 15), y + 15);
        }
    }

    static drawMoon(context, moon: moon, zoomLevel: number, showName: boolean, positionOffset:vector2d) {
        // Draw a moon at their appropriate coordinates
        // Coordinates are absolute for the planet compared to the mother planet's
        let zoom:number = this.getZoom(context, zoomLevel);

        context.beginPath();
        context.fillStyle = moon.color;
        let x = ((moon.currentPosition.x+ positionOffset.x) * zoom + context.canvas.clientWidth / 2) ;
        let y = ((moon.currentPosition.y+ positionOffset.y) * zoom + context.canvas.clientHeight / 2);
        context.moveTo(x, y);
        if (this.setObjectSize(moon.size, zoomLevel) >= 1)
        context.arc(x, y, this.setObjectSize(moon.size, zoomLevel), 0, Math.PI * 2);

        context.fill();
        if (showName) {
            context.fillStyle = "#12B4CE";
            context.font = "10px Arial";
            context.fillText(moon.name, (x - 15), y + 15);
        }
    }

    // Draw a circle indicating a celestial object's orbit
    static drawOrbit(context, object: cObject, parent: cObject, zoomLevel: number, width: number, positionOffset:vector2d) {
        let zoom:number = this.getZoom(context, zoomLevel);
        context.beginPath();
        context.lineWidth = width;
        context.strokeStyle = "#12B4CE";
        let x = (parent.currentPosition.x+ positionOffset.x) * zoom + context.canvas.clientWidth / 2 ;
        let y = (parent.currentPosition.y+ positionOffset.y) * zoom + context.canvas.clientHeight / 2;
        context.arc(x, y,  object.orbitRadius * zoom, 0, Math.PI * 2);
        context.stroke();

    }

    // Draw a selected indicator for a specific celestial object
    static drawSelector(context, object:cObject, zoomLevel:number, positionOffset:vector2d, lineWidth:number, color:string, rotation:number)
    {
        let selectorArea = 3;
        let zoom:number = this.getZoom(context, zoomLevel);
        context.beginPath();
        context.lineWidth = lineWidth;
        context.strokeStyle = color;
        let x = (object.currentPosition.x+ positionOffset.x) * zoom + context.canvas.clientWidth / 2 ;
        let y = (object.currentPosition.y+ positionOffset.y) * zoom + context.canvas.clientHeight / 2;
        context.arc(x, y, this.setObjectSize(object.size, zoomLevel) * selectorArea , Library.toRadian(20 - rotation), Library.toRadian(100- rotation));
        context.stroke();
        context.beginPath();
        context.arc(x, y, this.setObjectSize(object.size, zoomLevel) * selectorArea, Library.toRadian(140 - rotation), Library.toRadian(220- rotation));
        context.stroke();
        context.beginPath();
        context.arc(x, y, this.setObjectSize(object.size, zoomLevel) * selectorArea, Library.toRadian(260 - rotation), Library.toRadian(340- rotation));
        context.stroke();
        
    }

    // Fill in an area with color to indicate the aproximate location of an object's orbit
    static drawObjectArea(context, object: cObject, objectOrbitWidth: number, zoomLevel: number, showName: boolean, positionOffset:vector2d) {
        let zoom:number = this.getZoom(context, zoomLevel);
        context.beginPath();
        context.strokeStyle = object.color;
        context.lineWidth = object.size;
        let x = context.canvas.clientWidth / 2 + (positionOffset.x * zoom);
        let y = context.canvas.clientHeight / 2+ (positionOffset.y * zoom);
        context.arc(x, y, object.orbitRadius * zoom, 0, Math.PI * 2);
        context.stroke();
        if (showName) {
            context.fillStyle = "#12B4CE";
            context.font = "10px Arial";
            context.fillText(object.name, x - 25, y + (object.orbitRadius * zoom) + 15);
        }
    }

    // Draw the background for the map (dark blue/black)
    static drawSky(context) {
        context.beginPath();
        context.rect(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
        context.fillStyle = "#282838";
        context.fill();
    }

    // Render framerate in top left corner (render text, technically speaking)
    static drawFrameRate(context, frameRate) {
        context.beginPath();
        context.fillStyle = "#FFee00";
        context.font = "20px Arial";
        context.fillText(frameRate, 30, 30);
    }

    private static getZoom(context, zoomLevel)
    {
        // calculate zoom
        // zoomLevel is the # of AU from the center to the edge
        // zoom bound is aprox between 15 (fully zoomed out) and 2350 (fully zoomed in)
        let zoom: number;
        if (context.canvas.clientWidth > context.canvas.clientHeight) {
            zoom = ((context.canvas.clientWidth / 2) / zoomLevel);
        }
        else {
            zoom = ((context.canvas.clientHeight / 2) / zoomLevel);
        }
        return zoom;
    }

    private static setObjectSize(actualSizeInAu:number, zoomLevel:number):number
    {
        let displaySize = ((Math.log(actualSizeInAu)+12)*3) * (1 / Math.sqrt(zoomLevel));
        return displaySize;
    }
}