System.register(["./vector2d"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var vector2d_1;
    var Library, travelManager;
    return {
        setters:[
            function (vector2d_1_1) {
                vector2d_1 = vector2d_1_1;
            }],
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
                    console.log("========= Calculating Hohman Maneuver ============");
                    var sourceOrbit = source.orbitRadius * Library.astronomicalUnit;
                    var destinationOrbit = destination.orbitRadius * Library.astronomicalUnit;
                    var smAxis = this.calculateSMAxis(source, destination);
                    // Calculate deltaV for Insertion Burn (in m/s)
                    var orbitVelocitySource = Math.sqrt(Library.gravitationConstant / sourceOrbit);
                    var velocityI = Math.sqrt(Library.gravitationConstant * ((2 / sourceOrbit) - (1 / smAxis)));
                    console.log("orbitVelocityI: " + velocityI);
                    var deltaVI = velocityI - orbitVelocitySource;
                    console.log(source.name + " DeltaVi (m/s): " + deltaVI);
                    // Calculate deltaV for Arrival Burn (in m/s)
                    var orbitVelocityDestination = Math.sqrt(Library.gravitationConstant / destinationOrbit);
                    var velocityA = Math.sqrt(Library.gravitationConstant * ((2 / destinationOrbit) - (1 / smAxis)));
                    var deltaVA = velocityA - orbitVelocityDestination;
                    console.log(destination.name + " DeltaVa (m/s): " + deltaVA);
                    // Calculate total deltaV (in m/s)
                    var deltaV = Math.abs(deltaVI) + Math.abs(deltaVA);
                    console.log("Total Delta V: " + (Math.floor(deltaV) / 1000) + "km/s");
                    return Math.abs(deltaVI) + Math.abs(deltaVA);
                };
                travelManager.calculateHohmanTransferTime = function (source, destination) {
                    console.log("======= Calculating Hohman Transfer Time =========");
                    var piSquared = Math.pow(Math.PI, 2);
                    var smAxis = Math.pow(this.calculateSMAxis(source, destination), 3);
                    var timeSeconds = 0.5 * Math.sqrt((4 * piSquared * smAxis) / Library.gravitationConstant);
                    var time = timeSeconds / 86400;
                    console.log("Time in days from " + source.name + " to " + destination.name + ": " + Math.floor(time) + " days");
                    return time;
                };
                travelManager.calculateHohmanTransferWindow = function (source, destination) {
                    console.log("======= Calculating Hohman Launch Window =========");
                    var inferiorOrbit = 0;
                    var superiorOrbit = 0;
                    if (source.orbitRadius > destination.orbitRadius) {
                        inferiorOrbit = destination.orbitRadius * Library.astronomicalUnit;
                        superiorOrbit = source.orbitRadius * Library.astronomicalUnit;
                    }
                    else {
                        inferiorOrbit = source.orbitRadius * Library.astronomicalUnit;
                        superiorOrbit = destination.orbitRadius * Library.astronomicalUnit;
                    }
                    var orbitPeriodI = 2 * Math.PI * Math.sqrt(Math.pow(inferiorOrbit, 3) / Library.gravitationConstant);
                    var orbitPeriodS = 2 * Math.PI * Math.sqrt(Math.pow(superiorOrbit, 3) / Library.gravitationConstant);
                    var synodicPeriod = 1 / ((1 / orbitPeriodI) - (1 / orbitPeriodS));
                    var window = synodicPeriod / 86400;
                    console.log("The Launch Window for " + source.name + " to " + destination.name + " is every " + Math.floor(window) + " days");
                    return window;
                };
                travelManager.calculateLaunchTiming = function (source, destination) {
                    console.log("======= Calculating Hohman Launch Angle ==========");
                    var sourceOrbit = source.orbitRadius * Library.astronomicalUnit;
                    var destinationOrbit = destination.orbitRadius * Library.astronomicalUnit;
                    var inner = Math.pow(sourceOrbit / destinationOrbit + 1, 3);
                    var angleRadian = Math.PI * (1 - (0.35355 * Math.sqrt(inner)));
                    angleRadian = angleRadian % (Math.PI * 2);
                    var angleDegrees = angleRadian * (180 / Math.PI);
                    console.log("Tranfer Launch Angle for " + source.name + " to " + destination.name + " is " + angleDegrees + "°");
                    return angleRadian;
                };
                travelManager.calculateDaysToNextHohmanTravelDate = function (source, destination, actualDate) {
                    console.log("======== Calculating Next Hohman Window ==========");
                    var currentDate = Math.floor(actualDate);
                    var initialDate = currentDate;
                    var goalAngle = travelManager.calculateLaunchTiming(source, destination);
                    var lastDeltaAngle = goalAngle - (source.currentAngle - destination.currentAngle);
                    while ((currentDate - initialDate) < 40320) {
                        currentDate++;
                        var newAngle = (source.getAngleForDate(currentDate) - destination.getAngleForDate(currentDate));
                        if (Math.abs(goalAngle - newAngle) < Math.abs(goalAngle - lastDeltaAngle)) {
                            break;
                        }
                        lastDeltaAngle = newAngle;
                    }
                    if ((currentDate - initialDate) == 40320) {
                        console.log("Next transfer from " + source.name + " to " + destination.name + " is not happening in your lifetime");
                    }
                    else {
                        console.log("Next transfer from " + source.name + " to " + destination.name + " is in " + (currentDate - initialDate) + " days");
                    }
                    return currentDate;
                };
                travelManager.calculateBrachistochroneDeltaV = function (source, destination, thrustInG) {
                    // Calculate DeltaV requirement for Brachistochrone transfer
                    // Acceleration input is in G
                    console.log("====== Calculating Brachistochrone DeltaV ========");
                    var acceleration = thrustInG * 9.81;
                    var travelDistance = this.calculateTravelDistanceMeters(source, destination);
                    var transitDeltaV = 2 * Math.sqrt(travelDistance * acceleration);
                    console.log("DeltaV Required for Brachistochrone from " + source.name + " to " + destination.name + " is " + Math.floor(transitDeltaV / 1000) + " km/s");
                    return transitDeltaV;
                };
                travelManager.calculateBrachistochroneTransitTime = function (source, destination, thrustInG) {
                    console.log("==== Calculating Brachistochrone Travel Time =====");
                    var acceleration = thrustInG * 9.81;
                    var travelDistance = this.calculateTravelDistanceMeters(source, destination);
                    var transitTime = 2 * Math.sqrt(travelDistance / acceleration);
                    var transitTimeDays = transitTime / 86400;
                    console.log("Time required for travel from " + source.name + " to " + destination.name + " at " + thrustInG + "G is " + Math.floor(transitTimeDays) + " days");
                    return transitTime;
                };
                travelManager.calculateSMAxis = function (source, destination) {
                    var sourceOrbit = source.orbitRadius * Library.astronomicalUnit;
                    var destinationOrbit = destination.orbitRadius * Library.astronomicalUnit;
                    var smAxis = (+sourceOrbit + +destinationOrbit) / 2;
                    return smAxis;
                };
                travelManager.calculateTravelDistanceMeters = function (source, destination) {
                    var travelDistance = vector2d_1.vector2d.CalculateDistance(source.currentPosition, destination.currentPosition);
                    var travelDistanceMeters = travelDistance * Library.astronomicalUnit;
                    return travelDistanceMeters;
                };
                return travelManager;
            }());
            exports_1("travelManager", travelManager);
        }
    }
});
//# sourceMappingURL=travelManager.js.map