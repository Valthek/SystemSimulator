import {Component} from "angular2/core";
import {planet} from "./system/objects/planet";
import {loadObjects} from "./system/loadObjects";
import {drawCanvas} from "./system/engine/drawCanvas";

@Component({
   selector: 'simulator',
   templateUrl: "src/app/templates/canvas.html"
})



export class AppComponent {
    //planets: planet[] = loadObjects.loadPlanets();
    p:planet = new planet("test", 1, 3);
    canvas:drawCanvas = new drawCanvas();
    this.canvas.drawCanvas(p);
    
}