//Class to draw animations on the canvas
import { planet } from "./../objects/planet";
import { moon } from "./../objects/moon";
import { cObject } from "./../objects/cObject";
import { vector2d } from "./vector2d";

export class canvasManager {
    // clear canvas
    static clearCanvas(context: CanvasRenderingContext2D) {
        context.clearRect(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
    }

    static drawPlanet(context, planet: cObject, zoomLevel: number, showName: boolean) {
        // Draw a planet at their appropriate coordinates
        // Coordinates are absolute for the planet compared to origin, centered on canvas
        let zoom:number = this.getZoom(context, zoomLevel);

        context.beginPath();
        context.fillStyle = planet.color;
        let x = ((planet.currentPosition.x) * zoom + context.canvas.clientWidth / 2);
        let y = ((planet.currentPosition.y) * zoom + context.canvas.clientHeight / 2);
        context.moveTo(x, y);
        context.arc(x, y, planet.size, 0, Math.PI * 2);
        context.fill();
        if (showName) {
            context.fillStyle = "#12B4CE";
            context.font = "10px Arial";
            context.fillText(planet.name, (x - 15), y + 15);
        }
    }

    static drawMoon(context, moon: moon, zoomLevel: number, showName: boolean) {
        // Draw a moon at their appropriate coordinates
        // Coordinates are absolute for the planet compared to the mother planet's
        let zoom:number = this.getZoom(context, zoomLevel);

        context.beginPath();
        context.fillStyle = moon.color;
        let x = ((moon.currentPosition.x) * zoom + context.canvas.clientWidth / 2);
        let y = ((moon.currentPosition.y) * zoom + context.canvas.clientHeight / 2);
        context.moveTo(x, y);
        context.arc(x, y, moon.size, 0, Math.PI * 2);
        context.fill();
        if (showName) {
            context.fillStyle = "#12B4CE";
            context.font = "10px Arial";
            context.fillText(moon.name, (x - 15), y + 15);
        }
    }

    // Draw a circle indicating a celestial object's orbit
    static drawOrbit(context, object: cObject, parent: cObject, zoomLevel: number, width: number) {
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = "#12B4CE";
        let x = (parent.currentPosition.x) * ((context.canvas.clientWidth / 2) / zoomLevel) + context.canvas.clientWidth / 2;
        let y = (parent.currentPosition.y) * ((context.canvas.clientHeight / 2) / zoomLevel) + context.canvas.clientHeight / 2;
        context.arc(x, y, object.orbitRadius * ((context.canvas.clientWidth / 2) / zoomLevel), 0, Math.PI * 2);
        context.stroke();

    }

    // Fill in an area with color to indicate the aproximate location of an object's orbit
    static drawObjectArea(context, object: cObject, objectOrbitWidth: number, zoomLevel: number, showName: boolean) {
        context.beginPath();
        context.strokeStyle = object.color;
        context.lineWidth = object.size;
        let x = context.canvas.clientWidth / 2;
        let y = context.canvas.clientHeight / 2;
        context.arc(x, y, object.orbitRadius * ((context.canvas.clientWidth / 2) / zoomLevel), 0, Math.PI * 2);
        context.stroke();
        if (showName) {
            context.fillStyle = "#12B4CE";
            context.font = "10px Arial";
            context.fillText(object.name, x - 25, y + (object.orbitRadius * ((context.canvas.clientHeight / 2) / zoomLevel)) + 15);
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
        let zoom: number;
        if (context.canvas.clientWidth > context.canvas.clientHeight) {
            zoom = ((context.canvas.clientWidth / 2) / zoomLevel);
        }
        else {
            zoom = ((context.canvas.clientHeight / 2) / zoomLevel);
        }
        return zoom;
    }
}