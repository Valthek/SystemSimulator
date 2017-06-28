import { planet } from "./objects/planet";
import { Directive } from 'angular2/core';
import { vector2d } from './engine/vector2d';
declare var $: any;

export class loadObjects {

  static loadPlanets(): planet[] {
    let planets: planet[] = [];
    $.ajax({
      type: "GET",
      url: "/data/system.xml",
      dataType: "xml",
      success: function (data) {
        $(data).find("planet").each(function (index) {
          let name = $(this).find("name").text();
          let distanceToOrigin = $(this).find("distance").text();
          let radialVelocity = $(this).find("radialVelocity").text();
          console.log(name + " " + radialVelocity);
          let initialAngle = $(this).find("startAngle").text();
          console.log(name + " " + initialAngle);
          let radius = $(this).find("displayRadius").text();
          let planetColor = $(this).find("planetColor").text();
          let p: planet = new planet(name, initialAngle, distanceToOrigin, radialVelocity, radius, planetColor);
          planets.push(p);
          if (p.name="Antara")
          {
            console.log(p);
          }
        });
      },
      error: function () {
        console.log("An error loading the xml file has occured");
      }
    });
    return planets;
  }
}

