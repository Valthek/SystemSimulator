System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var canvasManager;
    return {
        setters:[],
        execute: function() {
            canvasManager = (function () {
                function canvasManager() {
                }
                // clear canvas
                canvasManager.clearCanvas = function (context) {
                    context.clearRect(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
                };
                canvasManager.drawPlanet = function (context, planet, zoomLevel, showName, positionOffset) {
                    // Draw a planet at their appropriate coordinates
                    // Coordinates are absolute for the planet compared to origin, centered on canvas
                    var zoom = this.getZoom(context, zoomLevel);
                    context.beginPath();
                    context.fillStyle = planet.color;
                    var x = ((planet.currentPosition.x) * zoom + context.canvas.clientWidth / 2) + positionOffset.x;
                    var y = ((planet.currentPosition.y) * zoom + context.canvas.clientHeight / 2) + positionOffset.y;
                    context.moveTo(x, y);
                    context.arc(x, y, planet.size, 0, Math.PI * 2);
                    context.fill();
                    if (showName) {
                        context.fillStyle = "#12B4CE";
                        context.font = "10px Arial";
                        context.fillText(planet.name, (x - 15), y + 15);
                    }
                };
                canvasManager.drawMoon = function (context, moon, zoomLevel, showName, positionOffset) {
                    // Draw a moon at their appropriate coordinates
                    // Coordinates are absolute for the planet compared to the mother planet's
                    var zoom = this.getZoom(context, zoomLevel);
                    context.beginPath();
                    context.fillStyle = moon.color;
                    var x = ((moon.currentPosition.x) * zoom + context.canvas.clientWidth / 2) + positionOffset.x;
                    var y = ((moon.currentPosition.y) * zoom + context.canvas.clientHeight / 2) + positionOffset.y;
                    context.moveTo(x, y);
                    context.arc(x, y, moon.size, 0, Math.PI * 2);
                    context.fill();
                    if (showName) {
                        context.fillStyle = "#12B4CE";
                        context.font = "10px Arial";
                        context.fillText(moon.name, (x - 15), y + 15);
                    }
                };
                // Draw a circle indicating a celestial object's orbit
                canvasManager.drawOrbit = function (context, object, parent, zoomLevel, width, positionOffset) {
                    var zoom = this.getZoom(context, zoomLevel);
                    context.beginPath();
                    context.lineWidth = 1;
                    context.strokeStyle = "#12B4CE";
                    var x = (parent.currentPosition.x) * zoom + context.canvas.clientWidth / 2 + positionOffset.x;
                    var y = (parent.currentPosition.y) * zoom + context.canvas.clientHeight / 2 + positionOffset.y;
                    context.arc(x, y, object.orbitRadius * zoom, 0, Math.PI * 2);
                    context.stroke();
                };
                // Fill in an area with color to indicate the aproximate location of an object's orbit
                canvasManager.drawObjectArea = function (context, object, objectOrbitWidth, zoomLevel, showName, positionOffset) {
                    var zoom = this.getZoom(context, zoomLevel);
                    context.beginPath();
                    context.strokeStyle = object.color;
                    context.lineWidth = object.size;
                    var x = context.canvas.clientWidth / 2 + positionOffset.x;
                    var y = context.canvas.clientHeight / 2 + positionOffset.y;
                    context.arc(x, y, object.orbitRadius * zoom, 0, Math.PI * 2);
                    context.stroke();
                    if (showName) {
                        context.fillStyle = "#12B4CE";
                        context.font = "10px Arial";
                        context.fillText(object.name, x - 25, y + (object.orbitRadius * zoom) + 15);
                    }
                };
                // Draw the background for the map (dark blue/black)
                canvasManager.drawSky = function (context) {
                    context.beginPath();
                    context.rect(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
                    context.fillStyle = "#282838";
                    context.fill();
                };
                // Render framerate in top left corner (render text, technically speaking)
                canvasManager.drawFrameRate = function (context, frameRate) {
                    context.beginPath();
                    context.fillStyle = "#FFee00";
                    context.font = "20px Arial";
                    context.fillText(frameRate, 30, 30);
                };
                canvasManager.getZoom = function (context, zoomLevel) {
                    var zoom;
                    if (context.canvas.clientWidth > context.canvas.clientHeight) {
                        zoom = ((context.canvas.clientWidth / 2) / zoomLevel);
                    }
                    else {
                        zoom = ((context.canvas.clientHeight / 2) / zoomLevel);
                    }
                    return zoom;
                };
                return canvasManager;
            }());
            exports_1("canvasManager", canvasManager);
        }
    }
});
//# sourceMappingURL=canvasManager.js.map