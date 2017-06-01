System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var drawCanvas;
    return {
        setters:[],
        execute: function() {
            drawCanvas = (function () {
                function drawCanvas() {
                }
                // properties
                // typecast element as HTMLCanvasElement to ensure methods are available
                drawCanvas.prototype.ngOnInit = function () {
                    this.mainCanvas = document.querySelector("#simulatorCanvas");
                    this.mainContext = this.mainCanvas.getContext("2d");
                    this.canvasWidth = this.mainCanvas.width;
                    this.canvasHeight = this.mainCanvas.height;
                };
                drawCanvas.prototype.drawCircle = function () {
                    this.mainContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                    // color in the background
                    this.mainContext.fillStyle = "#EEEEEE";
                    this.mainContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
                    // draw the circle
                    this.mainContext.beginPath();
                    var radius = 175;
                    this.mainContext.arc(225, 225, radius, 0, Math.PI * 2, false);
                    this.mainContext.closePath();
                    // color in the circle
                    this.mainContext.fillStyle = "#006699";
                    this.mainContext.fill();
                };
                return drawCanvas;
            }());
            exports_1("drawCanvas", drawCanvas);
        }
    }
});
//# sourceMappingURL=drawCanvas.js.map