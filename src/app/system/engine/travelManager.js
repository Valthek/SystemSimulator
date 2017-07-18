System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Library, travelManager;
    return {
        setters:[],
        execute: function() {
            Library = (function () {
                function Library() {
                }
                Object.defineProperty(Library, "astronomicalUnit", {
                    get: function () { return 149597870700; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Library, "gravitationConstant", {
                    get: function () { return 116798853600000000000; },
                    enumerable: true,
                    configurable: true
                });
                ;
                return Library;
            }());
            exports_1("Library", Library);
            travelManager = (function () {
                function travelManager() {
                }
                travelManager.calculateHohmanDeltaV = function (source, destination) {
                    console.log("source.orbitradius " + source.orbitRadius);
                    console.log("destination.orbitradius " + destination.orbitRadius);
                    console.log("AstronomicalUnit " + Library.astronomicalUnit);
                    var sourceOrbit = source.orbitRadius * Library.astronomicalUnit;
                    console.log("source orbit: " + sourceOrbit);
                    var destinationOrbit = destination.orbitRadius * Library.astronomicalUnit;
                    console.log("destination orbit: " + destinationOrbit);
                    var smAxis = (sourceOrbit + destinationOrbit) / 2;
                    console.log("smAxis: " + smAxis);
                    // Calculate deltaV for Insertion Burn (in m/s)
                    var orbitVelocitySource = Math.sqrt(Library.gravitationConstant / sourceOrbit);
                    console.log("orbitVs " + orbitVelocitySource);
                    var velocityI = Math.sqrt(Library.gravitationConstant * ((2 / sourceOrbit) - (1 / smAxis)));
                    var deltaVI = velocityI - orbitVelocitySource;
                    // Calculate deltaV for Arrival Burn (in m/s)
                    var orbitVelocityDestination = Math.sqrt(Library.gravitationConstant / destinationOrbit);
                    console.log("orbitVd " + orbitVelocityDestination);
                    var velocityA = Math.sqrt(Library.gravitationConstant * ((2 / destinationOrbit) - (1 / smAxis)));
                    var deltaVA = velocityA - orbitVelocityDestination;
                    return Math.abs(deltaVI) + Math.abs(deltaVA);
                };
                return travelManager;
            }());
            exports_1("travelManager", travelManager);
        }
    }
});
//# sourceMappingURL=travelManager.js.map