System.register(["./cObject"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var cObject_1;
    var planet;
    return {
        setters:[
            function (cObject_1_1) {
                cObject_1 = cObject_1_1;
            }],
        execute: function() {
            planet = (function (_super) {
                __extends(planet, _super);
                function planet(name, distance, velocity, angle, radius, initialPosition) {
                    _super.call(this, name, distance, velocity);
                    this.currentX = 0;
                    this.currentY = 0;
                    this.angle = angle;
                    this.radius = distance;
                    this.rotationRadius = distance;
                    this.initialX = initialPosition.x;
                    this.initialY = initialPosition.y;
                    this.incrementer = .01 + Math.random() * .1;
                }
                planet.prototype.update = function (mainContext) {
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
                return planet;
            }(cObject_1.cObject));
            exports_1("planet", planet);
        }
    }
});
//# sourceMappingURL=planet.js.map