System.register(["./objects/planet", "./objects/moon", "./objects/cObject"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var planet_1, moon_1, cObject_1;
    var loadObjects;
    return {
        setters:[
            function (planet_1_1) {
                planet_1 = planet_1_1;
            },
            function (moon_1_1) {
                moon_1 = moon_1_1;
            },
            function (cObject_1_1) {
                cObject_1 = cObject_1_1;
            }],
        execute: function() {
            loadObjects = (function () {
                function loadObjects() {
                }
                loadObjects.loadPlanets = function () {
                    var planets = [];
                    var planetNumber = 0;
                    $.ajax({
                        type: "GET",
                        url: "/data/system.xml",
                        dataType: "xml",
                        success: function (data) {
                            $(data).find("planet").each(function (index) {
                                var moonNumber = 0;
                                var name = $(this).find("name").text();
                                var distanceToOrigin = $(this).find("distance").text();
                                var radialVelocity = $(this).find("radialVelocity").text();
                                var initialAngle = $(this).find("startAngle").text();
                                var radius = $(this).find("displayRadius").text();
                                var planetColor = $(this).find("planetColor").text();
                                var moons = [];
                                $(this).find("moon").each(function () {
                                    var moonName = $(this).find("moonName").text();
                                    var moonSpeed = $(this).find("moonSpeed").text();
                                    var moonStartAngle = $(this).find("moonStartAngle").text();
                                    var moonColor = $(this).find("moonColor").text();
                                    var m = new moon_1.moon(moonName, moonStartAngle, radius * 0.03, moonSpeed, radius, moonColor, moonNumber);
                                    moons.push(m);
                                    console.log(m);
                                    moonNumber++;
                                });
                                var p = new planet_1.planet(name, initialAngle, distanceToOrigin, radialVelocity, radius, planetColor, moons, planetNumber);
                                planets.push(p);
                                console.log(p);
                                planetNumber++;
                            });
                        },
                        error: function () {
                            console.log("An error loading the xml file has occured");
                        }
                    });
                    return planets;
                };
                loadObjects.loadCObjects = function () {
                    var cObjects = [];
                    $.ajax({
                        type: "GET",
                        url: "/data/system.xml",
                        dataType: "xml",
                        success: function (data) {
                            $(data).find("CObject").each(function (index) {
                                var name = $(this).find("name").text();
                                var distanceToOrigin = $(this).find("distance").text();
                                var initialAngle = $(this).find("startAngle").text();
                                var radialVelocity = $(this).find("radialVelocity").text();
                                var o = new cObject_1.cObject(name, distanceToOrigin, initialAngle, radialVelocity);
                                cObjects.push(o);
                            });
                        },
                        error: function () {
                            console.log("An error loading the xml file has occured");
                        }
                    });
                    return cObjects;
                };
                return loadObjects;
            }());
            exports_1("loadObjects", loadObjects);
        }
    }
});
//# sourceMappingURL=loadObjects.js.map