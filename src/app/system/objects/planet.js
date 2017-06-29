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
                function planet(name, initialAngle, distance, velocity, planetSize, planetColor) {
                    _super.call(this, name, distance, initialAngle, velocity);
                    this.size = planetSize;
                    this.color = planetColor;
                }
                planet.prototype.updatePosition = function (simSpeed) {
                    this.currentAngle = +this.currentAngle + (this.radialVelocity / simSpeed);
                    if (this.name === "Zyraak") {
                        console.log(this.currentAngle + " " + this.radialVelocity);
                    }
                    this.currentPosition.x = this.orbitRadius * Math.cos(this.currentAngle);
                    this.currentPosition.y = this.orbitRadius * Math.sin(this.currentAngle);
                    if (this.currentAngle >= (Math.PI * 2)) {
                        this.currentAngle -= +(Math.PI * 2);
                    }
                };
                return planet;
            }(cObject_1.cObject));
            exports_1("planet", planet);
        }
    }
});
//# sourceMappingURL=planet.js.map