import {Component} from "angular2/core";
import {planet} from "./system/objects/planet";
import {loadObjects} from "./system/loadObjects";

@Component({
   selector: 'simulator',
   templateUrl: "src/app/templates/simulator.html"
})



export class AppComponent {
    planets: planet[] = loadObjects.loadPlanets();
}