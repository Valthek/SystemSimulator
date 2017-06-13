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
                // typecast element as HTMLCanvasElement to ensure methods are available
                drawCanvas.prototype.ngOnInit = function () {
                    this.mainCanvas = document.querySelector("#simulatorCanvas");
                    this.mainContext = this.mainCanvas.getContext("2d");
                    this.canvasWidth = this.mainCanvas.width;
                    this.canvasHeight = this.mainCanvas.height;
                    this.animationRunning = false;
                };
                drawCanvas.prototype.startAnimation = function () {
                    this.animationRunning = true;
                };
                drawCanvas.prototype.stopAnimation = function () {
                    this.animationRunning = false;
                    cancelAnimationFrame(this.animationRequestID);
                };
                drawCanvas.prototype.animate = function (framerate, objects) {
                    // Animation Loop
                    if (this.animationRunning) {
                        setTimeout(function () {
                            // Clear canvas
                            this.mainContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                            this.mainContext.fillStyle = '#f6f6f6';
                            this.mainContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
                            // Call draw functions here
                            this.animationRequestID = requestAnimationFrame(this.animate);
                            console.log("Refresh");
                        }, 1000 / framerate);
                    }
                };
                return drawCanvas;
            }());
            exports_1("drawCanvas", drawCanvas);
        }
    }
});
//# sourceMappingURL=drawCanvas.js.map