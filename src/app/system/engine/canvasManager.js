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
                canvasManager.drawPlanet = function (context, planet, zoomLevel) {
                    // Draw a planet at their appropriate coordinates
                    context.beginPath();
                    context.fillStyle = planet.color;
                    var x = ((planet.currentPosition.x) * zoomLevel + context.canvas.clientWidth / 2);
                    var y = ((planet.currentPosition.y) * zoomLevel + context.canvas.clientHeight / 2);
                    context.moveTo(x, y);
                    context.arc(x, y, planet.size, 0, Math.PI * 2);
                    context.fill();
                    context.fillStyle = "#00ee00";
                    context.font = "10px Arial";
                    context.fillText(planet.name, x, y + 10);
                };
                canvasManager.drawOrbit = function (context, planet, zoomLevel) {
                    context.beginPath();
                    context.strokeStyle = "#00ee00";
                    var x = context.canvas.clientWidth / 2;
                    var y = context.canvas.clientHeight / 2;
                    context.arc(x, y, planet.orbitRadius * zoomLevel, 0, Math.PI * 2);
                    context.stroke();
                };
                canvasManager.drawSky = function (context) {
                    context.beginPath();
                    context.rect(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
                    context.fillStyle = "#000919";
                    context.fill();
                };
                return canvasManager;
            }());
            exports_1("canvasManager", canvasManager);
        }
    }
});
//# sourceMappingURL=canvasManager.js.map