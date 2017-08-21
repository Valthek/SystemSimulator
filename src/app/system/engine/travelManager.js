System.register(["./vector2d", "./Library"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var vector2d_1, Library_1;
    var travelManager;
    return {
        setters:[
            function (vector2d_1_1) {
                vector2d_1 = vector2d_1_1;
            },
            function (Library_1_1) {
                Library_1 = Library_1_1;
            }],
        execute: function() {
            travelManager = (function () {
                function travelManager() {
                }
                travelManager.calculateHohmanDeltaV = function (source, destination) {
                    var hohmanResults = [];
                    console.log("========= Calculating Hohman Maneuver ============");
                    var sourceOrbit = source.orbitRadius * Library_1.Library.astronomicalUnit;
                    var destinationOrbit = destination.orbitRadius * Library_1.Library.astronomicalUnit;
                    var smAxis = this.calculateSMAxis(source, destination);
                    // Calculate deltaV for Insertion Burn (in m/s)
                    var orbitVelocitySource = Math.sqrt(Library_1.Library.gravitationConstant / sourceOrbit);
                    var velocityI = Math.sqrt(Library_1.Library.gravitationConstant * ((2 / sourceOrbit) - (1 / smAxis)));
                    var deltaVI = velocityI - orbitVelocitySource;
                    console.log("Insertion Burn for: " + source.name + +": " + Math.ceil(deltaVI) + "m/s");
                    // Calculate deltaV for Arrival Burn (in m/s)
                    var orbitVelocityDestination = Math.sqrt(Library_1.Library.gravitationConstant / destinationOrbit);
                    var velocityA = Math.sqrt(Library_1.Library.gravitationConstant * ((2 / destinationOrbit) - (1 / smAxis)));
                    var deltaVA = velocityA - orbitVelocityDestination;
                    console.log("Arrival Burn for: " + destination.name + ": " + Math.ceil(deltaVA) + "m/s");
                    // Calculate total deltaV (in m/s)
                    var deltaV = Math.abs(deltaVI) + Math.abs(deltaVA);
                    console.log("Total Delta V: " + (Math.floor(deltaV) / 1000) + "km/s");
                    hohmanResults.push(Math.floor(deltaV) / 1000);
                    hohmanResults.push(Math.floor(deltaVI));
                    hohmanResults.push(Math.floor(deltaVA));
                    return hohmanResults;
                };
                travelManager.calculateHohmanTransferTime = function (source, destination) {
                    console.log("======= Calculating Hohman Transfer Time =========");
                    var piSquared = Math.pow(Math.PI, 2);
                    var smAxis = Math.pow(this.calculateSMAxis(source, destination), 3);
                    var timeSeconds = 0.5 * Math.sqrt((4 * piSquared * smAxis) / Library_1.Library.gravitationConstant);
                    var time = timeSeconds / 86400;
                    console.log("Time in days from " + source.name + " to " + destination.name + ": " + Math.floor(time) + " days");
                    return Math.floor(time);
                };
                travelManager.calculateHohmanTransferWindow = function (source, destination) {
                    console.log("======= Calculating Hohman Launch Window =========");
                    var inferiorOrbit = 0;
                    var superiorOrbit = 0;
                    if (source.orbitRadius > destination.orbitRadius) {
                        inferiorOrbit = destination.orbitRadius * Library_1.Library.astronomicalUnit;
                        superiorOrbit = source.orbitRadius * Library_1.Library.astronomicalUnit;
                    }
                    else {
                        inferiorOrbit = source.orbitRadius * Library_1.Library.astronomicalUnit;
                        superiorOrbit = destination.orbitRadius * Library_1.Library.astronomicalUnit;
                    }
                    var orbitPeriodI = 2 * Math.PI * Math.sqrt(Math.pow(inferiorOrbit, 3) / Library_1.Library.gravitationConstant);
                    var orbitPeriodS = 2 * Math.PI * Math.sqrt(Math.pow(superiorOrbit, 3) / Library_1.Library.gravitationConstant);
                    var synodicPeriod = 1 / ((1 / orbitPeriodI) - (1 / orbitPeriodS));
                    var window = synodicPeriod / 86400;
                    console.log("The Launch Window for " + source.name + " to " + destination.name + " is every " + Math.floor(window) + " days");
                    return Math.floor(window);
                };
                travelManager.calculateHohmanLaunchTiming = function (source, destination) {
                    console.log("======= Calculating Hohman Launch Angle ==========");
                    var sourceOrbit = source.orbitRadius * Library_1.Library.astronomicalUnit;
                    var destinationOrbit = destination.orbitRadius * Library_1.Library.astronomicalUnit;
                    var inner = Math.pow(sourceOrbit / destinationOrbit + 1, 3);
                    var angleRadian = Math.PI * (1 - (0.35355 * Math.sqrt(inner)));
                    angleRadian = angleRadian % (Math.PI * 2);
                    var angleDegrees = angleRadian * (180 / Math.PI);
                    console.log("Tranfer Launch Angle for " + source.name + " to " + destination.name + " is " + angleDegrees + "°");
                    return angleRadian;
                };
                travelManager.calculateDaysToNextHohmanTravelDate = function (source, destination, actualDate) {
                    console.log("======== Calculating Next Hohman Window ==========");
                    var goalAngle = travelManager.calculateHohmanLaunchTiming(source, destination);
                    var daysToAngle = this.findDateForObjectangle(source, destination, actualDate, goalAngle);
                    return (daysToAngle);
                };
                travelManager.calculateBrachistochroneDeltaVNow = function (source, destination, thrustInG) {
                    // Calculate DeltaV requirement for Brachistochrone transfer
                    // Acceleration input is in G
                    console.log("====== Calculating Brachistochrone DeltaV ========");
                    var acceleration = thrustInG * 9.81;
                    var travelDistance = this.calculateTravelDistanceMeters(source, destination);
                    var transitDeltaV = 2 * Math.sqrt(travelDistance * acceleration);
                    console.log("DeltaV Required for Brachistochrone from " + source.name + " to " + destination.name + " is " + Math.floor(transitDeltaV / 1000) + " km/s");
                    return Math.floor(transitDeltaV / 1000);
                };
                travelManager.calculateBrachistochroneTransitTimeNow = function (source, destination, thrustInG) {
                    console.log("==== Calculating Brachistochrone Travel Time =====");
                    var acceleration = thrustInG * 9.81;
                    var travelDistance = this.calculateTravelDistanceMeters(source, destination);
                    var transitTime = 2 * Math.sqrt(travelDistance / acceleration);
                    var transitTimeDays = transitTime / 86400;
                    console.log("Time required for travel from " + source.name + " to " + destination.name + " at " + thrustInG + "G is " + Math.floor(transitTimeDays) + " days");
                    return Math.floor(transitTimeDays);
                };
                travelManager.calculateNextBrachistochroneTransit = function (source, destination, thrustInG, actualDate) {
                    var goalAngle = 0;
                    var daysToAngle = this.findDateForObjectangle(source, destination, actualDate, goalAngle);
                    var travelTime = this.calculateBrachistochroneTransitTimeNow(source, destination, thrustInG);
                    return (daysToAngle - travelTime);
                };
                travelManager.calculateSMAxis = function (source, destination) {
                    var sourceOrbit = source.orbitRadius * Library_1.Library.astronomicalUnit;
                    var destinationOrbit = destination.orbitRadius * Library_1.Library.astronomicalUnit;
                    var smAxis = (+sourceOrbit + +destinationOrbit) / 2;
                    return smAxis;
                };
                travelManager.calculateTravelDistanceMeters = function (source, destination) {
                    var travelDistance = vector2d_1.vector2d.CalculateDistance(source.currentPosition, destination.currentPosition);
                    var travelDistanceMeters = travelDistance * Library_1.Library.astronomicalUnit;
                    return travelDistanceMeters;
                };
                travelManager.findDateForObjectangle = function (source, destination, actualDate, targetAngle) {
                    var currentDate = Math.floor(actualDate);
                    var initialDate = currentDate;
                    var goalAngle = targetAngle;
                    var lastDeltaAngle = (source.currentAngle - destination.currentAngle);
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
                    var result = (currentDate - initialDate) - 1;
                    return result;
                };
                return travelManager;
            }());
            exports_1("travelManager", travelManager);
        }
    }
});
//# sourceMappingURL=travelManager.js.map