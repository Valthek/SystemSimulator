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
                    context.fillStyle = '#ff00ee';
                    var x = (planet.currentPosition.x + context.canvas.clientWidth / 2);
                    var y = (planet.currentPosition.y + context.canvas.clientHeight / 2);
                    context.moveTo(x, y);
                    context.arc(x, y, planet.size / zoomLevel, 0, Math.PI * 2);
                    context.fill();
                };
                return canvasManager;
            }());
            exports_1("canvasManager", canvasManager);
        }
    }
});
//# sourceMappingURL=canvasManager.js.map