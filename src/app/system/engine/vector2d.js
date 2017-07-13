// 2d vector class (coordinate system, positioning)
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var vector2d;
    return {
        setters:[],
        execute: function() {
            vector2d = (function () {
                function vector2d(x, y) {
                    this.x = x;
                    this.y = y;
                }
                vector2d.ToRadian = function (degrees) {
                    console.log("degrees: " + degrees);
                    return degrees * (Math.PI / 180);
                };
                vector2d.ToDegrees = function (radian) {
                    return radian * (180 / Math.PI);
                };
                vector2d.CalculateDistance = function (source, destination) {
                    var dx = source.x - destination.x;
                    var dy = source.y - destination.y;
                    var distance = Math.sqrt((dx * dx) + (dy * dy));
                    return distance;
                };
                vector2d.prototype.AddVector = function (vector2d) {
                    this.x += vector2d.x;
                    this.y += vector2d.y;
                    return this;
                };
                return vector2d;
            }());
            exports_1("vector2d", vector2d);
        }
    }
});
//# sourceMappingURL=vector2d.js.map