import { planet } from './objects/planet';
import { moon } from './objects/moon';
import { cObject } from './objects/cObject';
import { Directive } from '@angular/core';
import { vector2d } from './engine/vector2d';

export class loadObjects {

  static loadPlanets(source: string): planet[] {
    const planets: planet[] = [];
    let planetNumber = 0;

    $.ajax({
      type: 'GET',
      url: './data/' + source,
      dataType: 'xml',
      success: function (data) {
        $(data).find('planet').each(function (index) {
          let moonNumber = 0;
          const name = $(this).find('name').text();
          const distanceToOrigin = parseFloat($(this).find('distance').text());
          const radialVelocity = parseFloat($(this).find('radialVelocity').text());
          const initialAngle = parseFloat($(this).find('startAngle').text());
          const planetColor = $(this).find('planetColor').text();
          const actualDiameter = parseFloat($(this).find('realDiameter').text());
          const moons: moon[] = [];
          $(this).find('moon').each(function () {
            const moonName = $(this).find('moonName').text();
            const moonSpeed = parseFloat($(this).find('moonSpeed').text());
            const moonStartAngle = parseFloat($(this).find('moonStartAngle').text());
            const moonColor = $(this).find('moonColor').text();
            const moonActualDiameter = parseFloat($(this).find('realMoonDiameter').text());
            const moonOrbitRadius = parseFloat($(this).find('moonOrbitRadius').text());
            const m: moon = new moon(moonNumber, moonName, moonActualDiameter, moonColor, moonOrbitRadius, moonSpeed, moonStartAngle);
            moons.push(m);
            moonNumber++;
          });
          const p: planet = new planet(planetNumber, name, planetColor, actualDiameter, moons, distanceToOrigin, radialVelocity, initialAngle);
          planets.push(p);
          planetNumber++;
        });
      },
      error: function () {
        console.log('An error loading the xml file has occured');
      }
    });
    return planets;
  }

  static loadCObjects(source: string): cObject[] {
    const cObjects: cObject[] = [];
    let cObjectNumber = 0;
    $.ajax({
      type: 'GET',
      url: '/data/' + source,
      dataType: 'xml',
      success: function (data) {
        $(data).find('cObject').each(function (index) {
          const name = $(this).find('name').text();
          const distanceToOrigin = parseFloat($(this).find('distance').text());
          const initialAngle = parseFloat($(this).find('startAngle').text());
          const radialVelocity = parseFloat($(this).find('radialVelocity').text());
          const objectColor = $(this).find('objectColor').text();
          const objectSize = parseFloat($(this).find('displayRadius').text());
          const actualDiameter = parseFloat($(this).find('realDiameter').text());
          const o: cObject = new cObject(cObjectNumber, name, objectColor, actualDiameter, distanceToOrigin,  radialVelocity, initialAngle);
          cObjects.push(o);
          cObjectNumber++;
        });
      },
      error: function () {
        console.log('An error loading the xml file has occured');
      }
    });
    return cObjects;
  }
}

