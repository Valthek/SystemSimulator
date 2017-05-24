System.register(['jquery'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var jquery_1;
    var loadObjects;
    return {
        setters:[
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            }],
        execute: function() {
            loadObjects = (function () {
                function loadObjects() {
                }
                loadObjects.loadPlanets = function () {
                    var planets;
                    jquery_1.default.ajax({
                        type: "GET",
                        url: "/data/system.xml",
                        dataType: "xml",
                        success: parseXML,
                        error: function () {
                            console.log("An error loading the xml file has occured");
                        }
                    });
                    function parseXML(document) {
                        jquery_1.default(document).find("planet").each(function (index) {
                            planets[index] = {
                                name: jquery_1.default(this).find("name").text(),
                                distanceToOrigin: jquery_1.default(this).find("distance").val(),
                                radialVelocity: jquery_1.default(this).find("speed").val()
                            };
                            var name = jquery_1.default(this).find("name").text();
                            var distance = jquery_1.default(this).find("distance").text();
                            var speed = +jquery_1.default(this).find("speed").text();
                            console.log("The planet is: " + name + " and lies at " + distance + " AU from the sun, orbiting at a rate of " + speed + " years per revolution");
                        });
                    }
                    return planets;
                };
                return loadObjects;
            }());
            exports_1("loadObjects", loadObjects);
        }
    }
});
//# sourceMappingURL=loadObjects.js.map