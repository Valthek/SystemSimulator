System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var cObject;
    return {
        setters:[],
        execute: function() {
            cObject = (function () {
                function cObject(name, distance, velocity) {
                    this.name = name;
                    this.distanceToOrigin = distance;
                    this.radialVelocity = velocity;
                }
                return cObject;
            }());
            exports_1("cObject", cObject);
        }
    }
});
//# sourceMappingURL=cObject.js.map