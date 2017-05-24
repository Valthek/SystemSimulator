import {Component} from "angular2/core";
import {cObject} from "./system/cObject";
import {vector2d} from "./system/engine/vector2d"

@Component({
   selector: 'simulator',
   templateUrl: "src/app/templates/simulator.html"
})

export class AppComponent {
    planet: cObject = {
    name: "Cavernus",
    position: {
        x:0,
        y:0
    },
    distanceToOrigin: 1,
    radialVelocity: 1
    }
}