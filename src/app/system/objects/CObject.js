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
                function cObject(name, orbitRadius, initialAngle, velocity) {
                    this.name = name;
                    this.currentAngle = vector2d_1.vector2d.ToRadian(initialAngle);
                    this.initialAngle = vector2d_1.vector2d.ToRadian(initialAngle);
                    this.orbitRadius = orbitRadius;
                    this.radialVelocity = vector2d_1.vector2d.ToRadian(velocity);
                    var radian = vector2d_1.vector2d.ToRadian(initialAngle);
                    var x = +orbitRadius * Math.cos(radian);
                    var y = +orbitRadius * Math.sin(radian);
                    this.currentPosition = new vector2d_1.vector2d(x, y);
                }
                return cObject;
            }());
            exports_1("cObject", cObject);
        }
    }
});
//# sourceMappingURL=cObject.js.map