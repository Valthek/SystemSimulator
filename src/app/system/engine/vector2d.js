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
                    return degrees * (Math.PI / 180);
                };
                vector2d.ToDegrees = function (radian) {
                    return radian * (180 / Math.PI);
                };
                return vector2d;
            }());
            exports_1("vector2d", vector2d);
        }
    }
});
//# sourceMappingURL=vector2d.js.map