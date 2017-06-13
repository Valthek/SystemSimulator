System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var circle;
    return {
        setters:[],
        execute: function() {
            circle = (function () {
                function circle(angle, sign, radius, rotationRadius, initialX, initialY) {
                    this.currentX = 0;
                    this.currentY = 0;
                    this.angle = angle;
                    this.sign = sign;
                    this.radius = radius;
                    this.rotationRadius = rotationRadius;
                    this.initialX = initialX;
                    this.initialY = initialY;
                    this.incrementer = .01 + Math.random() * .1;
                }
                circle.prototype.update = function (mainContext) {
                    this.angle += this.incrementer;
                    this.currentX = this.initialX + this.rotationRadius * Math.cos(this.angle);
                    this.currentY = this.initialY + this.rotationRadius * Math.sin(this.angle);
                    if (this.angle >= (Math.PI * 2)) {
                        this.angle = 0;
                        this.incrementer = .01 + Math.random() * .1;
                    }
                    // The following code is responsible for actually drawing the circle on the screen
                    mainContext.beginPath();
                    mainContext.arc(this.currentX, this.currentY, this.radius, 0, Math.PI * 2, false);
                    mainContext.closePath();
                    mainContext.fillStyle = 'rgba(177, 0, 129, .1)';
                    mainContext.fill();
                };
                ;
                return circle;
            }());
            exports_1("circle", circle);
        }
    }
});
//# sourceMappingURL=circle.js.map