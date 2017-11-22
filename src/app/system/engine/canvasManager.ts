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
        let position = this.getObjectCanvasPosition(context, planet.currentPosition, zoom, positionOffset);
        context.moveTo(position.x, position.y);
        context.arc(position.x, position.y,  this.setObjectSize(planet.size, zoomLevel), 0, Math.PI * 2);
        context.fill();
        if (showName) {
            context.fillStyle = "#12B4CE";
            context.font = "10px Arial";
            context.fillText(planet.name, (position.x - 15), position.y +this.setObjectSize(planet.size, zoomLevel) + 15);
        }
    }

    static drawMoon(context, moon: moon, zoomLevel: number, showName: boolean, positionOffset:vector2d) {
        // Draw a moon at their appropriate coordinates
        // Coordinates are absolute for the planet compared to the mother planet's
        let zoom:number = this.getZoom(context, zoomLevel);

        context.beginPath();
        context.fillStyle = moon.color;
        let position = this.getObjectCanvasPosition(context, moon.currentPosition, zoom, positionOffset);
        context.moveTo(position.x, position.y);
        if (this.setObjectSize(moon.size, zoomLevel) >= 1)
        context.arc(position.x, position.y, this.setObjectSize(moon.size, zoomLevel), 0, Math.PI * 2);

        context.fill();
        if (showName) {
            context.fillStyle = "#12B4CE";
            context.font = "10px Arial";
            context.fillText(moon.name, (position.x - 15), position.y +this.setObjectSize(moon.size, zoomLevel) + 15);
        }
    }

    // Draw a circle indicating a celestial object's orbit
    static drawOrbit(context, object: cObject, parent: cObject, zoomLevel: number, width: number, positionOffset:vector2d) {
        let zoom:number = this.getZoom(context, zoomLevel);
        context.beginPath();
        context.lineWidth = width;
        context.strokeStyle = "#12B4CE";
        let position = this.getObjectCanvasPosition(context, parent.currentPosition, zoom, positionOffset);
        context.arc(position.x, position.y,  object.orbitRadius * zoom, 0, Math.PI * 2);
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
        let position = this.getObjectCanvasPosition(context, object.currentPosition, zoom, positionOffset);
        context.arc(position.x, position.y, this.setObjectSize(object.size, zoomLevel) * selectorArea , Library.toRadian(20 - rotation), Library.toRadian(100- rotation));
        context.stroke();
        context.beginPath();
        context.arc(position.x, position.y, this.setObjectSize(object.size, zoomLevel) * selectorArea, Library.toRadian(140 - rotation), Library.toRadian(220- rotation));
        context.stroke();
        context.beginPath();
        context.arc(position.x, position.y, this.setObjectSize(object.size, zoomLevel) * selectorArea, Library.toRadian(260 - rotation), Library.toRadian(340- rotation));
        context.stroke();
        
    }

    // Fill in an area with color to indicate the aproximate location of an object's orbit
    static drawObjectArea(context, object: cObject, objectOrbitWidth: number, zoomLevel: number, showName: boolean, positionOffset:vector2d) {
        let zoom:number = this.getZoom(context, zoomLevel);
        context.beginPath();
        context.strokeStyle = object.color;
        context.lineWidth = object.size;
        let position = this.getObjectCanvasPosition(context, object.currentPosition, zoom, positionOffset);
        context.arc(position.x, position.y, object.orbitRadius * zoom, 0, Math.PI * 2);
        context.stroke();
        if (showName) {
            context.fillStyle = "#12B4CE";
            context.font = "10px Arial";
            context.fillText(object.name, position.x - 25, position.y + (object.orbitRadius * zoom) + 15);
        }
    }

    static drawHohmannPath(context, objectZero:cObject, source:cObject, destination:cObject, pathWidth:number, zoomLevel:number, positionOffset:vector2d, currentDate:number)
    {
        let zoom:number = this.getZoom(context, zoomLevel);
        context.beginPath();
        context.strokeStyle = source.color;
        context.lineWidth = pathWidth; 
        let positionSource = this.getObjectCanvasPosition(context, source.currentPosition, zoom, positionOffset);
        let positionDestination = this.getObjectCanvasPosition(context, destination.currentPosition, zoom, positionOffset);
        context.moveTo(positionSource.x, positionSource.y);
        let quadraticOffsetSource = this.getObjectCanvasPosition(context, source.getPositionForAngle(source.currentAngle - (Math.PI/2), objectZero.currentPosition),zoom, positionOffset);
        let quadraticOffsetDestination = this.getObjectCanvasPosition(context, destination.getPositionForAngle(destination.currentAngle + (Math.PI/2), objectZero.currentPosition),zoom, positionOffset);
        context.bezierCurveTo(quadraticOffsetSource.x, quadraticOffsetSource.y, positionDestination.x,positionDestination.y, positionDestination.x,positionDestination.y);
        context.stroke(); 
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

    private static getObjectCanvasPosition(ctx,objectPosition:vector2d,zoom, offset:vector2d)
    {
        let position:vector2d = new vector2d(0,0);
        position.x = (objectPosition.x + offset.x) * zoom + (ctx.canvas.clientWidth / 2)  ;
        position.y = (objectPosition.y + offset.y) * zoom + (ctx.canvas.clientHeight / 2) ;
        return position;
    }
}