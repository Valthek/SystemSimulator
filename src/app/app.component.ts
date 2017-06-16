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
    zoomLevel: number = 1;
    currentDate: number = 0;
    context: CanvasRenderingContext2D;
    canvasManager: canvasManager;
    framerate = 60;
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
        if (!this.running) {
            return;
        }

        var ctx = this.context;
        canvasManager.clearCanvas(ctx);
        // draw all the planets
        for (let i = 0; i < this.planets.length; i++) {
            this.planets[i].updatePosition(this.zoomLevel/50);
            canvasManager.drawPlanet(ctx, this.planets[i], (this.zoomLevel / 50));         
            console.log("name: " + this.planets[i].name + ", x position: " + this.planets[i].currentPosition.x + ", y position: " + this.planets[i].currentPosition.y);   
        }

        requestAnimationFrame(() => this.tick());
    }
}
