import { Component, AfterViewInit, NgZone, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Library } from './system/engine/Library';
import { planet } from "./system/objects/planet";
import { vector2d } from "./system/engine/vector2d";
import { cObject } from "./system/objects/cObject";
import { loadObjects } from "./system/loadObjects";
import { canvasManager } from "./system/engine/canvasManager";
import { travelManager } from "./system/engine/travelManager";

@Component({
    selector: 'app-root',
    templateUrl: './../app/templates/simulator.html'
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

    systemDataSource: string = "antara_system.xml";

    // Visualisation Options
    simSpeed: number = 1;
    zoomLevel: number = 10;
    isRunning: boolean = true;
    showMoons: boolean = true;
    playButtonText: string = "Pause Animation";
    systemPositionOffset: vector2d = new vector2d(0, 0);
    dateUnlocked: boolean = true;
    monthsList: string[];
    daysList: number[] = [];
    yearsList: number[] = [];
    viewportWidth: number;
    viewportHeight: number;
    calculationDate: string[] = new Array<string>(3);
    hohmanResults: string[] = new Array<string>(5);
    brachistochroneResults: string[] = new Array<string>(16);
    showResults: boolean = false;

    // mouse variables
    private mouseDown: boolean = false;
    private lastMousePosition: vector2d = new vector2d(0, 0);
    private mousePosition: vector2d = new vector2d(0, 0);

    // internal data
    private actualDate: number = 0;
    private actualZoom: number = 1;

    ctx : any;


    constructor(private ngZone: NgZone) {
        this.thenTime = Date.now();
        this.loadDateVisualisation();
        console.log("setting load: " + this.systemDataSource);
        this.loadAllObjects(this.systemDataSource);
        console.log("The simulator has loaded. Starting...");
        this.isRunning = true;
    }
    @ViewChild("simulatorCanvas") myCanvas: ElementRef;

    ngAfterViewInit() {
        this.context = this.myCanvas.nativeElement.getContext("2d");
        this.ctx = this.context;
        this.updateCanvas();
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
        this.showResults = true;
        this.calculationDate[0] = "" + this.currentDateD;
        this.calculationDate[1] = "" + this.currentDateM;
        this.calculationDate[2] = "" + this.currentDateY;
        // hohman transfer results
        this.hohmanResults[0] = /* total DeltaV*/ "" + travelManager.calculateHohmanDeltaV(this.planets[this.travelSource], this.planets[this.travelDestination])[0];
        this.hohmanResults[1] = /* insertion Burn */ "" + travelManager.calculateHohmanDeltaV(this.planets[this.travelSource], this.planets[this.travelDestination])[1];
        this.hohmanResults[2] = /* arrival Burn */ "" + travelManager.calculateHohmanDeltaV(this.planets[this.travelSource], this.planets[this.travelDestination])[2];
        this.hohmanResults[3] = /* travel time for hohman*/"" + travelManager.calculateHohmanTransferTime(this.planets[this.travelSource], this.planets[this.travelDestination]);
        this.hohmanResults[4] = /* next window in days*/"" + travelManager.calculateDaysToNextHohmanTravelDate(this.planets[this.travelSource], this.planets[this.travelDestination], this.actualDate);
        this.hohmanResults[5] = /* launch window every x days*/"" + travelManager.calculateHohmanTransferWindow(this.planets[this.travelSource], this.planets[this.travelDestination]);
        // brachistochrone transfer results
        this.brachistochroneResults[0] = "" + travelManager.calculateBrachistochroneDeltaVNow(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG);
        this.brachistochroneResults[1] = /* brachistochrone at full thrust*/"" + travelManager.calculateBrachistochroneTransitTimeNow(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG);
        this.brachistochroneResults[2] = "" + travelManager.calculateNextBrachistochroneTransit(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG, this.actualDate);

        this.brachistochroneResults[3] = "" + travelManager.calculateBrachistochroneDeltaVNow(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG / 2);
        this.brachistochroneResults[4] = /* brachistochrone at half thrust*/"" + travelManager.calculateBrachistochroneTransitTimeNow(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG / 2);
        this.brachistochroneResults[5] = "" + travelManager.calculateNextBrachistochroneTransit(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG / 2, this.actualDate);

        this.brachistochroneResults[6] = "" + travelManager.calculateBrachistochroneDeltaVNow(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG / 4);
        this.brachistochroneResults[7] = /* brachistochrone at quarter thrust*/"" + travelManager.calculateBrachistochroneTransitTimeNow(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG / 4);
        this.brachistochroneResults[8] = "" + travelManager.calculateNextBrachistochroneTransit(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG / 4, this.actualDate);
    }

    calculateDirectFlight() {
        // TODO: do direct flight calculations (when to leave, coasting etc)
    }


    /* Mouse events */

    @HostListener('mousedown', ['$event'])
    onMousedown(event) {
        if (event.path[0].id == "simulatorCanvas") {
            this.mouseDown = true;
            this.mousePosition = new vector2d(event.clientX - (this.viewportWidth / 2), event.clientY - (this.viewportHeight / 2));
            this.lastMousePosition = this.mousePosition;
            console.log(this.systemPositionOffset);
        }
    }

    @HostListener('wheel', ['$event'])
    onMouseScroll(event) {
        if (event.path[0].id == "simulatorCanvas") { 
            if (this.zoomLevel + (0.05 * event.deltaY) > 0) {
                this.zoomLevel = +(this.zoomLevel) + +(0.05 * event.deltaY);
            }
        }
        if (event.path[0].id == "menu") {
            this.simSpeed += 0.01 * event.deltaY;
        }

    }

    @HostListener('mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        if (this.mouseDown) {            
            this.mousePosition = new vector2d(event.clientX - (this.viewportWidth / 2), event.clientY - (this.viewportHeight / 2));
            this.systemPositionOffset.subtract(this.lastMousePosition.subtract(this.mousePosition));
            this.lastMousePosition = this.mousePosition;
        }
    }

    @HostListener('mouseup')
    onMouseup() {
        this.mouseDown = false;
    }
    /* Mouse events */

    changeDataSource() {
        // fire off load function with a specific data source
        this.loadAllObjects(this.systemDataSource);
    }

    lockTime() {
        // stop all animations
        this.dateUnlocked = false;
    }

    private tick() {
        // function called every frame (~60 hz)
        requestAnimationFrame(() => this.tick());
        // Update Time
        this.updateTime();
        this.updateCanvas();
        

        if (this.isRunning) {
            // Increment current date
            this.actualDate += (this.simSpeed * this.deltaTime);
        }
        if (this.cObjects.length > 0 && this.planets.length > 0) {
            // Update position of all objects
            this.updateObjects();
            // Render all objects
            this.render(this.ctx);
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

    private render(ctx) {
        // deal with Canvas & Background
        canvasManager.clearCanvas(ctx);
        canvasManager.drawSky(ctx);
        canvasManager.drawPlanet(ctx, this.cObjects[0], this.actualZoom, false, this.systemPositionOffset);
        // draw all the planets
        for (let p = 0; p < this.planets.length; p++) {
            canvasManager.drawOrbit(ctx, this.planets[p], this.cObjects[0], this.actualZoom, 1, this.systemPositionOffset);
            canvasManager.drawPlanet(ctx, this.planets[p], this.actualZoom, true, this.systemPositionOffset);
            // Update Moons 
            if (this.showMoons && this.planets[p].moons.length != 0) {
                for (let m = 0; m < this.planets[p].moons.length; m++) {
                    canvasManager.drawMoon(ctx, this.planets[p].moons[m], this.actualZoom, false, this.systemPositionOffset);
                }
            }
        }
        // draw empty or unidentified orbits
        for (let c = 1; c < this.cObjects.length; c++) {
            canvasManager.drawObjectArea(ctx, this.cObjects[c], this.cObjects[c].size, this.actualZoom, true, this.systemPositionOffset);
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

    private updateCanvas() {
        this.actualZoom = this.zoomLevel / 10;
        let viewPortWidth;
        let viewPortHeight;

        // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
        if (typeof window.innerWidth != 'undefined') {
            viewPortWidth = window.innerWidth,
                viewPortHeight = window.innerHeight
        }

        // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
        else if (typeof document.documentElement != 'undefined'
            && typeof document.documentElement.clientWidth !=
            'undefined' && document.documentElement.clientWidth != 0) {
            viewPortWidth = document.documentElement.clientWidth,
                viewPortHeight = document.documentElement.clientHeight
        }

        // older versions of IE
        else {
            viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
                viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
        }

        this.viewportWidth = viewPortWidth;
        this.viewportHeight = viewPortHeight;

        let doc = document.getElementById("simulatorCanvas");
        doc.setAttribute('width', "" + this.viewportWidth);
        doc.setAttribute('height', "" + this.viewportHeight);
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

    private loadAllObjects(source: string) {
        this.cObjects = loadObjects.loadCObjects(source);
        this.planets = loadObjects.loadPlanets(source);
    }

    private loadDateVisualisation() {
        this.daysList = Library.arbitraryArray(28);
        this.monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.yearsList = Library.arbitraryArray(50);
    }
}
