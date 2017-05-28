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
                                var p = new planet_1.planet();
                                p.name = $(this).find("name").text();
                                p.distanceToOrigin = $(this).find("distance").text();
                                p.radialVelocity = $(this).find("speed").text();
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