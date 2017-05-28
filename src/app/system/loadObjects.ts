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
          let p: planet = new planet();
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
  }
}

