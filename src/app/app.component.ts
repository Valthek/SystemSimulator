import { Library } from './system/engine/Library';
import { Component, Directive, View, ViewChild, AfterViewInit, NgZone, ElementRef } from "angular2/core";
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


    travelDestination: number = 0;
    travelSource: number = 0;
    shipThrustInG: number = 0;

    // Visualisation Options
    simSpeed: number = 1;
    zoomLevel: number = 1;
    isRunning: boolean = true;
    showMoons: boolean = true;
    playButtonText: string = "Pause Animation";
    systemPositionOffset: vector2d = new vector2d(0, 0);
    dateUnlocked: boolean = true;

    // internal data
    private actualDate: number = 0;
    private actualZoom: number = 0;


    constructor(private ngZone: NgZone) {
        this.thenTime = Date.now();
        this.loadAllObjects();
        console.log("The simulator has loaded. Starting...");
        this.isRunning = true;

    }
    @ViewChild("simulatorCanvas") myCanvas: ElementRef;

    ngAfterViewInit() {
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
        let newDate: number = (+this.currentDateY * 336) + (+this.currentDateM * 28) + +this.currentDateD;
        this.actualDate = newDate;
        this.updateObjects();
        this.dateUnlocked = true;

    }

    calculateTravelOptions() {
        console.log("On " + this.currentDateD + "/" + this.currentDateM + "/"+ this.currentDateY + " the following values are true: ");
        travelManager.calculateHohmanDeltaV(this.planets[this.travelSource], this.planets[this.travelDestination]);
        travelManager.calculateHohmanTransferTime(this.planets[this.travelSource], this.planets[this.travelDestination]);
        travelManager.calculateHohmanTransferWindow(this.planets[this.travelSource], this.planets[this.travelDestination]);
        travelManager.calculateLaunchTiming(this.planets[this.travelSource], this.planets[this.travelDestination]);
        travelManager.calculateBrachistochroneDeltaV(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG);
        travelManager.calculateBrachistochroneTransitTime(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG);
        travelManager.calculateDaysToNextHohmanTravelDate(this.planets[this.travelSource], this.planets[this.travelDestination], this.actualDate);
    }

    canvasMouseDown() {
        console.log("mouse down");
    }

    lockTime() {
        this.dateUnlocked = false;
    }

    private tick() {
        requestAnimationFrame(() => this.tick());
        // Update Time
        this.updateTime();
        this.updateZoom();

        if (this.isRunning) {
            // Increment current date
            this.actualDate += (this.simSpeed * this.deltaTime);
        }
        if (this.cObjects.length > 0 && this.planets.length > 0) {
            // Update position of all objects
            this.updateObjects();
            // Render all objects
            this.render();
        }
        // update Form objecst & GUI
        this.updateGUI();
    }

    private updateObjects() {
        // Update Planets
        for (let p = 0; p < this.planets.length; p++) {
            this.planets[p].setAngle(this.actualDate);
            this.planets[p].updatePosition(this.cObjects[0].currentPosition);
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
            canvasManager.drawOrbit(ctx, this.planets[p], this.cObjects[0], this.actualZoom, 1);
            canvasManager.drawPlanet(ctx, this.planets[p], this.actualZoom, true);
            // Update Moons 
            if (this.showMoons && this.planets[p].moons.length != 0) {
                for (let m = 0; m < this.planets[p].moons.length; m++) {
                    canvasManager.drawMoon(ctx, this.planets[p].moons[m], this.actualZoom, false);
                }
            }
        }
        canvasManager.drawPlanet(ctx, this.cObjects[0], this.actualZoom, false);
        // draw empty or unidentified orbits
        for (let c = 1; c < this.cObjects.length; c++) {
            canvasManager.drawObjectArea(ctx, this.cObjects[c], this.cObjects[c].size, this.actualZoom, true);
        }
    }

    private updateGUI() {
        if (this.dateUnlocked) {
            this.ngZone.run(() => this.setDate(this.actualDate));
        }
    }

    private updateTime() {
        this.nowTime = Date.now();
        this.deltaTime = (this.nowTime - this.thenTime) / 1000; // seconds since last frame
        this.thenTime = this.nowTime;
    }

    private updateZoom() {
        this.actualZoom = this.zoomLevel/10;
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

    private loadAllObjects() {
        this.cObjects = loadObjects.loadCObjects();
        this.planets = loadObjects.loadPlanets();
    }
}
