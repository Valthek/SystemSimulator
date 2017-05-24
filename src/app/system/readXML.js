System.register(["jquery"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var $;
    function loadPlanets() {
        $.ajax({
            type: "GET",
            url: "/data/system.xml",
            dataType: "xml",
            success: parseXML,
            error: function () {
                console.log("An error loading the xml file has occured");
            }
        });
        function parseXML(document) {
            $(document).find("planet").each(function () {
                var name = $(this).find("name").text();
                var distance = $(this).find("distance").text();
                var speed = +$(this).find("speed").text();
                console.log("The planet is: " + name + " and lies at " + distance + " AU from the sun, orbiting at a rate of " + speed + " years per revolution");
            });
        }
        return planets;
    }
    return {
        setters:[
            function ($_1) {
                $ = $_1;
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=readXML.js.map