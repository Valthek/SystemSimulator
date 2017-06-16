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
                function cObject(name, distance, initialAngle, velocity) {
                    this.name = name;
                    this.currentAngle = initialAngle;
                    this.radius = distance;
                    var x = distance * Math.cos(initialAngle);
                    var y = distance * Math.sin(initialAngle);
                    this.currentPosition = new vector2d_1.vector2d(x, y);
                    this.radialVelocity = velocity;
                }
                return cObject;
            }());
            exports_1("cObject", cObject);
        }
    }
});
//# sourceMappingURL=cObject.js.map