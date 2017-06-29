import { Component, Directive, View, ViewChild, AfterViewInit, NgZone, ElementRef } from "angular2/core";
import { planet } from "./system/objects/planet";
import { cObject } from "./system/objects/cObject";
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
    cObjects: cObject[];
    
    context: CanvasRenderingContext2D;
    canvasManager: canvasManager;
    framerate: number = 60;

    // Visualisation Options
    simSpeed: number = 1;
    zoomLevel: number = 24;
    currentDate: number = 0;
    running: boolean = true;
    showMoons: boolean = true;


    constructor(private ngZone: NgZone) {
        this.planets = loadObjects.loadPlanets();
        //this.cObjects = loadObjects.loadCObjects();

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
        requestAnimationFrame(() => this.tick());

        if (this.running) {
                var ctx = this.context;
                canvasManager.clearCanvas(ctx);
                canvasManager.drawSky(ctx);
                // draw all the planets
                for (let i = 0; i < this.planets.length; i++) {
                    this.planets[i].updatePosition(this.simSpeed);
                    if (this.showMoons && this.planets[i].moons.length )
                    {
                        for (let o = 0; o < this.planets[i].moons.length; o++)
                        {
                            this.planets[i].moons[o].updatePosition(this.simSpeed);
                        }
                    }
                    this.currentDate += (this.simSpeed /  this.framerate);
                    canvasManager.drawOrbit(ctx, this.planets[i], this.zoomLevel);
                    canvasManager.drawPlanet(ctx, this.planets[i], this.zoomLevel);
                }
        }

    }
}
