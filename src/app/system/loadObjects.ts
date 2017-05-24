import { planet } from "./objects/planet"
import $ from 'jquery';

export class loadObjects {

  static loadPlanets() {
    let planets: planet[];
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
      $(document).find("planet").each(function (index) {

        planets[index] = {
          name: $(this).find("name").text(),
          distanceToOrigin: $(this).find("distance").val(),
          radialVelocity: $(this).find("speed").val()
        }

        var name = $(this).find("name").text();
        var distance = $(this).find("distance").text();
        var speed = + $(this).find("speed").text();
        console.log("The planet is: " + name + " and lies at " + distance + " AU from the sun, orbiting at a rate of " + speed + " years per revolution");

      });
    }
    return planets;
  }
}

