import { planet } from "./objects/planet";
import { Directive } from 'angular2/core';
declare var $: any;

export class loadObjects {

  static loadPlanets(): planet[] {
    let planets: planet[] = [];
    let test = $.ajax({
      type: "GET",
      url: "/data/system.xml",
      dataType: "xml",
      success: function (data) {
        $(data).find("planet").each(function (index) {
          let name = $(this).find("name").text();
          let distanceToOrigin = $(this).find("distance").text();
          let radialVelocity = $(this).find("speed").text();
          let angle = $(this).find("startAngle").text();
          let radius = $(this).find("displayRadius").text();
          let p: planet = new planet(name, distanceToOrigin, radialVelocity,angle, radius);
          planets.push(p);
        });
      },
      error: function () {
        console.log("An error loading the xml file has occured");
      }
    });
    return planets;
  }
}

