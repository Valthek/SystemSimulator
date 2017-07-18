import { planet } from "./objects/planet";
import { moon } from "./objects/moon";
import { cObject } from "./objects/cObject";
import { Directive } from 'angular2/core';
import { vector2d } from './engine/vector2d';
declare var $: any;

export class loadObjects {

  static loadPlanets(): planet[] {
    let planets: planet[] = [];
    let planetNumber:number = 0;
    $.ajax({
      type: "GET",
      url: "/data/system.xml",
      dataType: "xml",
      success: function (data) {
        $(data).find("planet").each(function (index) {
          let moonNumber = 0;
          let name = $(this).find("name").text();
          let distanceToOrigin = $(this).find("distance").text();
          let radialVelocity = $(this).find("radialVelocity").text();
          let initialAngle = $(this).find("startAngle").text();
          let radius = $(this).find("displayRadius").text();
          let planetColor = $(this).find("planetColor").text();
          let moons: moon[] = [];
            $(this).find("moon").each(function (){
              let moonName = $(this).find("moonName").text();
              let moonSpeed = $(this).find("moonSpeed").text();
              let moonStartAngle =  $(this).find("moonStartAngle").text();
              let moonColor = $(this).find("moonColor").text();
              let m: moon = new moon(moonName, moonStartAngle, radius*0.03 , moonSpeed, radius, moonColor, moonNumber);
              moons.push(m);
              console.log(m);
              moonNumber++;
            });
          let p: planet = new planet(name, initialAngle, distanceToOrigin, radialVelocity, radius, planetColor, moons, planetNumber);
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
  }

  static loadCObjects(): cObject[] {
    let cObjects: cObject[] = [];
    $.ajax({
      type: "GET",
      url: "/data/system.xml",
      dataType: "xml",
      success: function (data) {
        $(data).find("CObject").each(function (index) {
          let name = $(this).find("name").text();
          let distanceToOrigin = $(this).find("distance").text();
          let initialAngle = $(this).find("startAngle").text();
          let radialVelocity = $(this).find("radialVelocity").text();

          let o: cObject = new cObject(name, distanceToOrigin, initialAngle , radialVelocity);
          cObjects.push(o);         
        }); 
      }, 
      error: function () {
        console.log("An error loading the xml file has occured");
      }
    });
    return cObjects;
  }
}

