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
                canvasManager.drawPlanet = function (context, planet, zoomLevel, showName) {
                    // Draw a planet at their appropriate coordinates
                    // Coordinates are absolute for the planet compared to origin, centered on canvas
                    context.beginPath();
                    context.fillStyle = planet.color;
                    var x = ((planet.currentPosition.x) * zoomLevel + context.canvas.clientWidth / 2);
                    var y = ((planet.currentPosition.y) * zoomLevel + context.canvas.clientHeight / 2);
                    context.moveTo(x, y);
                    context.arc(x, y, planet.size, 0, Math.PI * 2);
                    context.fill();
                    if (showName) {
                        context.fillStyle = "#00ee00";
                        context.font = "10px Arial";
                        context.fillText(planet.name, (x - 15), y + 15);
                    }
                };
                canvasManager.drawMoon = function (context, moon, zoomLevel, showName) {
                    // Draw a moon at their appropriate coordinates
                    // Coordinates are absolute for the planet compared to the mother planet's
                    context.beginPath();
                    context.fillStyle = moon.color;
                    var x = ((moon.currentPosition.x) * zoomLevel + context.canvas.clientWidth / 2);
                    var y = ((moon.currentPosition.y) * zoomLevel + context.canvas.clientHeight / 2);
                    context.moveTo(x, y);
                    context.arc(x, y, moon.size, 0, Math.PI * 2);
                    context.fill();
                    if (showName) {
                        context.fillStyle = "#00ee00";
                        context.font = "10px Arial";
                        context.fillText(moon.name, (x - 15), y + 15);
                    }
                };
                // Draw a circle indicating a celestial object's orbit
                canvasManager.drawOrbit = function (context, object, parent, zoomLevel, width) {
                    context.beginPath();
                    context.lineWidth = 1;
                    context.strokeStyle = "#00ee00";
                    var x = (parent.currentPosition.x * zoomLevel) + context.canvas.clientWidth / 2;
                    var y = (parent.currentPosition.y * zoomLevel) + context.canvas.clientHeight / 2;
                    context.arc(x, y, object.orbitRadius * zoomLevel, 0, Math.PI * 2);
                    context.stroke();
                };
                // Fill in an area with color to indicate the aproximate location of an object's orbit
                canvasManager.drawObjectArea = function (context, object, objectOrbitWidth, zoomLevel, showName) {
                    context.beginPath();
                    context.strokeStyle = object.color;
                    context.lineWidth = object.size;
                    var x = context.canvas.clientWidth / 2;
                    var y = context.canvas.clientHeight / 2;
                    context.arc(x, y, object.orbitRadius * zoomLevel, 0, Math.PI * 2);
                    context.stroke();
                    if (showName) {
                        context.fillStyle = "#00ee00";
                        context.font = "10px Arial";
                        context.fillText(object.name, x - 25, y + (object.orbitRadius * zoomLevel) + 15);
                    }
                };
                // Draw the background for the map (dark blue/black)
                canvasManager.drawSky = function (context) {
                    context.beginPath();
                    context.rect(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
                    context.fillStyle = "#282832";
                    context.fill();
                };
                // Render framerate in top left corner (render text, technically speaking)
                canvasManager.drawFrameRate = function (context, frameRate) {
                    context.beginPath();
                    context.fillStyle = "#FFee00";
                    context.font = "20px Arial";
                    context.fillText(frameRate, 30, 30);
                };
                return canvasManager;
            }());
            exports_1("canvasManager", canvasManager);
        }
    }
});
//# sourceMappingURL=canvasManager.js.map