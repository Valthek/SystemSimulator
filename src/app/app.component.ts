import { Component, Directive, View, ViewChild, AfterViewInit, NgZone, ElementRef } from "angular2/core";
import { planet } from "./system/objects/planet";
import { loadObjects } from "./system/loadObjects";
import { canvasManager } from "./system/engine/canvasManager";

@Component({
    selector: 'simulator',
})

@View({
    templateUrl: "src/app/templates/simulator.html"
})

export class AppComponent implements AfterViewInit {
    planets: planet[];
    simSpeed: number = 1;
    zoomLevel: number = 20;
    currentDate: number = 0;
    context: CanvasRenderingContext2D;
    canvasManager: canvasManager;
    framerate:number = 60;
    interval: number;
    private running: boolean

    constructor(private ngZone: NgZone) {
        this.planets = loadObjects.loadPlanets();
    }
    @ViewChild("simulatorCanvas") myCanvas: ElementRef;

    ngAfterViewInit() {
        this.running = true;
        this.context = this.myCanvas.nativeElement.getContext("2d");
        this.ngZone.runOutsideAngular(() => this.tick());
    }

    ngOnDestroy() { 
        this.running = false; 
    }

    private tick() {
        if (this.running) {
            var ctx = this.context;
            canvasManager.clearCanvas(ctx);
            // draw all the planets
            for (let i = 0; i < this.planets.length; i++) {
                this.planets[i].updatePosition(this.simSpeed/100);
                this.currentDate += this.simSpeed/100;
                console.log(this.currentDate);
                canvasManager.drawPlanet(ctx, this.planets[i], this.zoomLevel);
            }
        }
        requestAnimationFrame(() => this.tick());
    }
}
