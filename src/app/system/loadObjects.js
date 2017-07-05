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
                    $.ajax({
                        type: "GET",
                        url: "/data/system.xml",
                        dataType: "xml",
                        success: function (data) {
                            $(data).find("planet").each(function (index) {
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
                                    var m = new moon_1.moon(moonName, moonStartAngle, 5, moonSpeed, 1, moonColor);
                                    moons.push(m);
                                    console.log(m);
                                });
                                var p = new planet_1.planet(name, initialAngle, distanceToOrigin, radialVelocity, radius, planetColor, moons);
                                planets.push(p);
                                console.log(p);
                            });
                        },
                        error: function () {
                            console.log("An error loading the xml file has occured");
                        }
                    });
                    return planets;
                };
                loadObjects.loadCObkects = function () {
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