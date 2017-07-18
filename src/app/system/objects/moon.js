System.register(["./cObject"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var cObject_1;
    var moon;
    return {
        setters:[
            function (cObject_1_1) {
                cObject_1 = cObject_1_1;
            }],
        execute: function() {
            moon = (function (_super) {
                __extends(moon, _super);
                function moon(name, initialAngle, distance, velocity, planetSize, moonColor, objectID) {
                    _super.call(this, name, planetSize * planetSize * 0.005, initialAngle, velocity, objectID);
                    this.size = 1;
                    this.color = moonColor;
                }
                return moon;
            }(cObject_1.cObject));
            exports_1("moon", moon);
        }
    }
});
//# sourceMappingURL=moon.js.map