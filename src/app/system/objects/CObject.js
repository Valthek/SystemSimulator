System.register(["./../engine/vector2d"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var vector2d_1;
    var cObject;
    return {
        setters:[
            function (vector2d_1_1) {
                vector2d_1 = vector2d_1_1;
            }],
        execute: function() {
            cObject = (function () {
                function cObject(name, orbitRadius, initialAngle, velocity, objectID) {
                    this.name = name;
                    this.objectID = objectID;
                    this.currentAngle = vector2d_1.vector2d.ToRadian(initialAngle);
                    this.initialAngle = vector2d_1.vector2d.ToRadian(initialAngle);
                    this.orbitRadius = orbitRadius;
                    this.radialVelocity = vector2d_1.vector2d.ToRadian(velocity);
                    var radian = vector2d_1.vector2d.ToRadian(initialAngle);
                    var x = +orbitRadius * Math.cos(radian);
                    var y = +orbitRadius * Math.sin(radian);
                    this.currentPosition = new vector2d_1.vector2d(x, y);
                }
                // Update position relative to a central point (a planet or the sun, usually)
                cObject.prototype.updatePosition = function (zeroPosition) {
                    this.currentPosition.x = zeroPosition.x + (this.orbitRadius * Math.cos(this.currentAngle));
                    this.currentPosition.y = zeroPosition.y + (this.orbitRadius * Math.sin(this.currentAngle));
                };
                cObject.prototype.setAngle = function (currentDate) {
                    var newAngle = this.initialAngle - (currentDate * this.radialVelocity);
                    newAngle = newAngle % (Math.PI * 2);
                    this.currentAngle = newAngle;
                };
                return cObject;
            }());
            exports_1("cObject", cObject);
        }
    }
});
//# sourceMappingURL=cObject.js.map