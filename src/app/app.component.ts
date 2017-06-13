import {Component, Directive, View} from "angular2/core";
import {planet} from "./system/objects/planet";
import {loadObjects} from "./system/loadObjects";
import {drawCanvas} from "./system/engine/drawCanvas";

@Component({
   selector: 'simulator'
})

@View({
   templateUrl: "src/app/templates/simulator.html"
})

export class AppComponent {
    planets: planet[] = loadObjects.loadPlanets();
    canvas:drawCanvas = new drawCanvas();
}
