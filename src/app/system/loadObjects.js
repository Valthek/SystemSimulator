System.register(["./objects/planet"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var planet_1;
    var loadObjects;
    return {
        setters:[
            function (planet_1_1) {
                planet_1 = planet_1_1;
            }],
        execute: function() {
            loadObjects = (function () {
                function loadObjects() {
                }
                loadObjects.loadPlanets = function () {
                    var planets = [];
                    var test = $.ajax({
                        type: "GET",
                        url: "/data/system.xml",
                        dataType: "xml",
                        success: function (data) {
                            $(data).find("planet").each(function (index) {
                                var name = $(this).find("name").text();
                                var distanceToOrigin = $(this).find("distance").text();
                                var radialVelocity = $(this).find("speed").text();
                                var angle = $(this).find("startAngle").text();
                                var radius = $(this).find("displayRadius").text();
                                var p = new planet_1.planet(name, distanceToOrigin, radialVelocity, angle, radius);
                                planets.push(p);
                            });
                        },
                        error: function () {
                            console.log("An error loading the xml file has occured");
                        }
                    });
                    return planets;
                };
                return loadObjects;
            }());
            exports_1("loadObjects", loadObjects);
        }
    }
});
//# sourceMappingURL=loadObjects.js.map