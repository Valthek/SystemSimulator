import { Component, Directive, View, ViewChild, AfterViewInit, NgZone, ElementRef } from "angular2/core";
import { planet } from "./system/objects/planet";
import { vector2d } from "./system/engine/vector2d";
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

    currentDateY: number;
    currentDateM:number;
    currentDateD:number;

    // Visualisation Options
    simSpeed: number = 1;
    zoomLevel: number = 23;
    isRunning: boolean = true;
    showMoons: boolean = true;
    playButtonText:string = "Stop";
    systemPositionOffset: vector2d = new vector2d(0,0);

    // internal data
    private actualDate: number = 0;


    constructor(private ngZone: NgZone) {
        this.planets = loadObjects.loadPlanets();
        //this.cObjects = loadObjects.loadCObjects();

    }
    @ViewChild("simulatorCanvas") myCanvas: ElementRef;

    ngAfterViewInit() {
        this.isRunning = true;
        this.context = this.myCanvas.nativeElement.getContext("2d");
        this.ngZone.runOutsideAngular(() => this.tick());
    }

    ngOnDestroy() {
        this.isRunning = false;
    }

    private tick() 
    { 
        requestAnimationFrame(() => this.tick());

        if (this.isRunning) {
                var ctx = this.context;
                canvasManager.clearCanvas(ctx);
                canvasManager.drawSky(ctx);
                // draw all the planets
                for (let i = 0; i < this.planets.length; i++) {
                    this.planets[i].updatePosition(this.simSpeed/10, this.planets[0].currentPosition);
                    if (this.showMoons && this.planets[i].moons.length )
                    {
                        for (let o = 0; o < this.planets[i].moons.length; o++)
                        {
                            this.planets[i].moons[o].updatePosition(this.simSpeed/10, this.planets[i].currentPosition);
                        }
                    }
                    this.actualDate += (this.simSpeed /  this.framerate);
                    canvasManager.drawOrbit(ctx, this.planets[i], this.zoomLevel);
                    canvasManager.drawPlanet(ctx, this.planets[i], this.zoomLevel);
                }
        this.ngZone.run(() => this.setDate());
        }

    }

    togglePlay()
    {
        this.isRunning = !this.isRunning;
        if (this.isRunning)
        {
            this.playButtonText = "Stop";
        }
        else
        {
            this.playButtonText = "Play";
        }
    }

    onTimeSubmit()
    {
        this.actualDate =  this.currentDateY*366 + this.currentDateM*28 + this.currentDateD;   

        var ctx = this.context;
                canvasManager.clearCanvas(ctx);
                canvasManager.drawSky(ctx);     
         for (let i = 0; i < this.planets.length; i++) {
             this.planets[i].setPosition(this.actualDate);
             if (this.showMoons && this.planets[i].moons.length )
                    {
                        for (let o = 0; o < this.planets[i].moons.length; o++)
                        {
                            this.planets[i].moons[o].updatePosition(this.simSpeed/10, this.planets[i].currentPosition);
                        }
                    }
                    canvasManager.drawOrbit(ctx, this.planets[i], this.zoomLevel);
                    canvasManager.drawPlanet(ctx, this.planets[i], this.zoomLevel);
         }
    }

    private setDate()
    {
        let dateRemainder:number = this.actualDate;
        let year : number = Math.floor(dateRemainder/336);
        dateRemainder = +dateRemainder - (year * 336);
        this.currentDateY = year;
        let month:number = Math.floor(dateRemainder/28);
        dateRemainder = +dateRemainder - (month*28);
        this.currentDateM = month;
        this.currentDateD = Math.floor(dateRemainder);
    }
}
