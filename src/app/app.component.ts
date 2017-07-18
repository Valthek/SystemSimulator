import { Component, Directive, View, ViewChild, AfterViewInit, NgZone, ElementRef  } from "angular2/core";
import { FORM_DIRECTIVES } from 'angular2/common';
import { planet } from "./system/objects/planet";
import { vector2d } from "./system/engine/vector2d";
import { cObject } from "./system/objects/cObject";
import { loadObjects } from "./system/loadObjects";
import { canvasManager } from "./system/engine/canvasManager";
import { travelManager } from "./system/engine/travelManager";

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

    nowTime: number = 0;
    thenTime: number = 0;
    deltaTime: number = 0;

    currentDateY: number = 0;
    currentDateM: number = 0;
    currentDateD: number = 0;

    travelDestination:number = 0;
    travelSource: number= 0;

    // Visualisation Options
    simSpeed: number = 1;
    zoomLevel: number = 23;
    isRunning: boolean = true;
    showMoons: boolean = true;
    playButtonText: string = "Pause Animation";
    systemPositionOffset: vector2d = new vector2d(0, 0);
    dateUnlocked: boolean = true;

    // internal data
    private actualDate: number = 0;


    constructor(private ngZone: NgZone) {
        this.planets = loadObjects.loadPlanets();
        this.thenTime = Date.now();
        //this.cObjects = loadObjects.loadCObjects();
        console.log("The simulator has loaded. Starting...");
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

    togglePlay() {
        this.isRunning = !this.isRunning;
        if (this.isRunning) {
            this.dateUnlocked = true;
            this.playButtonText = "Pause Animation";
        }
        else {
            this.dateUnlocked = false;
            this.playButtonText = "Resume Animation";
        }
    }

    onTimeSubmit() {
        let newDate: number = (+this.currentDateY * 366) + (+this.currentDateM * 28) + +this.currentDateD;
        this.dateUnlocked = true;
        this.actualDate = newDate;
        this.setPlanetPositions();
    }

    calculateTravelOptions()
    {
        travelManager.calculateHohmanDeltaV(this.planets[this.travelSource], this.planets[this.travelDestination]);
        travelManager.calculateHohmanTransferTime(this.planets[this.travelSource], this.planets[this.travelDestination]);
        travelManager.calculateHohmanTransferWindow(this.planets[this.travelSource], this.planets[this.travelDestination]);
        travelManager.calculateLaunchTiming(this.planets[this.travelSource], this.planets[this.travelDestination]);
        travelManager.calculateBrachistochroneDeltaV(this.planets[this.travelSource], this.planets[this.travelDestination], 0.01);
        travelManager.calculateBrachistochroneTransitTime(this.planets[this.travelSource], this.planets[this.travelDestination], 0.01);
    }

    lockTime() {
        this.dateUnlocked = false;
    }

    private tick() {
        requestAnimationFrame(() => this.tick());
        // Update Time
        this.updateTime();

        if (this.isRunning) {
            // Increment current date
            this.actualDate += (this.simSpeed * this.deltaTime);
        }
            // Update position of all objects
            this.updateObjects();
            // Render all objects
            this.render();
            // update Form objecst & GUI
            this.updateGUI();
        
    }

    private updateObjects() {
        // Update Planets
        for (let p = 0; p < this.planets.length; p++) {
            this.planets[p].setAngle(this.actualDate);
            this.planets[p].updatePosition(new vector2d(0, 0));
            // Update Moons
            if (this.planets[p].moons.length > 0) {
                for (let m = 0; m < this.planets[p].moons.length; m++) {
                    this.planets[p].moons[m].setAngle(this.actualDate);
                    this.planets[p].moons[m].updatePosition(this.planets[p].currentPosition);
                }
            }
        }
    }

    private render() { 
        // deal with Canvas & Background
        var ctx = this.context;
        canvasManager.clearCanvas(ctx);
        canvasManager.drawSky(ctx);
        // draw all the planets
        for (let p = 0; p < this.planets.length; p++) {
            canvasManager.drawOrbit(ctx, this.planets[p], this.planets[0], this.zoomLevel);
            canvasManager.drawPlanet(ctx, this.planets[p], this.zoomLevel);
            // Update Moons
            if (this.showMoons && this.planets[p].moons.length != 0) {
                for (let m = 0; m < this.planets[p].moons.length; m++) {
                    //canvasManager.drawOrbit(ctx, this.planets[p].moons[m], this.planets[p], this.zoomLevel);
                    canvasManager.drawMoon(ctx, this.planets[p].moons[m], this.zoomLevel, false);
                }
            }
        }

    }

    private updateGUI() {
        if (this.dateUnlocked) {
            this.ngZone.run(() => this.setDate(this.actualDate));
        }
    }

    private setPlanetPositions() {
        for (let p = 0; p < this.planets.length; p++) {
            this.planets[p].setAngle(this.actualDate);
        }
    }

    private updateTime() {
        this.nowTime = Date.now();
        this.deltaTime = (this.nowTime - this.thenTime) / 1000; // seconds since last frame
        this.thenTime = this.nowTime;
    }

    private setDate(newDate: number) {
        let dateRemainder: number = newDate;
        let year: number = Math.floor(dateRemainder / 336);
        dateRemainder = +dateRemainder - (year * 336);
        this.currentDateY = year;
        let month: number = Math.floor(dateRemainder / 28);
        dateRemainder = +dateRemainder - (month * 28);
        this.currentDateM = month;
        this.currentDateD = Math.floor(dateRemainder);
    }
}
