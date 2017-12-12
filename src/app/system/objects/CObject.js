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
                function cObject(objectID, name, color, objectSize, actualDiameter, orbitRadius, velocity, initialAngle) {
                    this.objectID = objectID;
                    this.name = name;
                    this.color = color;
                    this.actualDiameter = actualDiameter;
                    this.size = Math.floor(Math.log(actualDiameter)) - 5;
                    // angles must be in radians for Math.cos & Math.sin to work
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
                // set the object's angle to that corresponding with a specific date
                cObject.prototype.setAngle = function (currentDate) {
                    this.currentAngle = this.getAngleForDate(currentDate);
                };
                // get the object's angle for a specific date without updating the position
                cObject.prototype.getAngleForDate = function (date) {
                    var angle = this.initialAngle - (date * this.radialVelocity);
                    angle = angle % (Math.PI * 2);
                    return angle;
                };
                return cObject;
            }());
            exports_1("cObject", cObject);
        }
    }
});
//# sourceMappingURL=cObject.js.map