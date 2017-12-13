import { Component, AfterViewInit, NgZone, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Library } from './system/engine/Library';
import { planet } from './system/objects/planet';
import { vector2d } from './system/engine/vector2d';
import { cObject } from './system/objects/cObject';
import { loadObjects } from './system/loadObjects';
import { canvasManager } from './system/engine/canvasManager';
import { travelManager } from './system/engine/travelManager';

@Component({
    selector: 'app-root',
    templateUrl: './../app/templates/simulator.html'
})

export class AppComponent implements AfterViewInit {
    @ViewChild('simulatorCanvas') myCanvas: ElementRef;

    planets: planet[];
    cObjects: cObject[];

    context: CanvasRenderingContext2D;
    canvasManager: canvasManager;
    framerate = 60;

    nowTime = 0;
    thenTime = 0;
    deltaTime = 0;

    currentDateD = 1;
    currentDateM = 0;
    currentDateY = 0;

    travelDestination = 3;
    travelSource = 2;
    shipThrustInG = 0.005;

    systemDataSource = 'antara';

    // Visualisation Options
    simSpeed = 1;
    zoomLevel = 10;
    isRunning = true;
    showMoons = true;
    playButtonText = 'Pause Animation';
    systemPositionOffset: vector2d = new vector2d(0, 0);
    dateUnlocked = true;
    monthsList: string[];
    daysList: number[] = [];
    yearsList: number[] = [];
    viewportWidth: number;
    viewportHeight: number;
    calculationDate: string[] = new Array<string>(3);
    hohmannResults: string[] = new Array<string>(6);
    brachistochroneResults: string[] = new Array<string>(19);
    hohmannOffset: number;
    brachistochroneOffset: number[] = new Array<number>(3);
    showResults = false;

    // mouse variables
    private mouseDown = false;
    private lastMousePosition: vector2d = new vector2d(0, 0);
    private mousePosition: vector2d = new vector2d(0, 0);

    // internal data
    // Actual Date is date since 0.0.0AT in days
    public actualDate = 0;
    private actualZoom = 1;

    ctx: any;

    constructor(private ngZone: NgZone) {
        this.thenTime = Date.now();
        this.getUrlParameters();
        console.log('Url Parameters loaded');
        this.loadDateVisualisation();
        this.loadAllObjects(this.systemDataSource);
        this.brachistochroneOffset = [0, 0, 0];
        this.hohmannOffset = 0;
        console.log('The simulator has loaded. Starting...');
        this.isRunning = true;
        this.onTimeSubmit();
    }

    ngAfterViewInit() {
        this.context = this.myCanvas.nativeElement.getContext('2d');
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
            this.playButtonText = 'Pause Animation';
        } else {
            this.dateUnlocked = false;
            this.playButtonText = 'Resume Animation';
        }
    }

    onTimeSubmit() {
        this.actualDate = ((+this.currentDateY) * 336) + ((+this.currentDateM) * 28) + (+this.currentDateD);
        this.updateObjects();
        this.dateUnlocked = true;
    }

    calculateTravelOptions(showResult: boolean) {
        this.showResults = showResult;
        this.calculationDate[0] = '' + this.currentDateD;
        this.calculationDate[1] = '' + this.currentDateM;
        this.calculationDate[2] = '' + this.currentDateY;
        // hohman transfer results

        this.calculateHohMannTransfer();
        this.calculateBrachistochroneTransfer();
    }

    /* Mouse events */

    @HostListener('mousedown', ['$event'])
    onMousedown(event) {
        if (event.path[0].id === 'simulatorCanvas') {
            this.mouseDown = true;
            this.mousePosition = new vector2d(event.clientX - (this.viewportWidth / 2), event.clientY - (this.viewportHeight / 2));
            this.lastMousePosition = this.mousePosition;
        }
    }

    @HostListener('wheel', ['$event'])
    onMouseScroll(event) {
        if (event.path[0].id === 'simulatorCanvas') {
            // mouse event's scroll wheel event emits values that are multiples of 100, hence the weird multiplication.

            if (event.deltaY > 0 && (this.zoomLevel * +(0.01 * 1.1 * event.deltaY) < 500)) {
                this.zoomLevel *= +(0.01 * 1.1 * event.deltaY);
            } else if ((this.zoomLevel * (1 / +(0.01 * 1.1 * Math.abs(event.deltaY)))) > 0.5) {
                this.zoomLevel *= (1 / +(0.01 * 1.1 * Math.abs(event.deltaY)));
            }
        }
        if (event.path[0].id === 'menu') {
            this.simSpeed += 0.01 * event.deltaY;
        }

    }

    @HostListener('mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        if (this.mouseDown) {
            this.mousePosition = new vector2d(event.clientX - (this.viewportWidth / 2), event.clientY - (this.viewportHeight / 2));
            const offsetResult = this.lastMousePosition.subtract(this.mousePosition);
            if (this.viewportWidth > this.viewportHeight) {
                offsetResult.multiply(1 / this.viewportWidth);
            } else {
                offsetResult.multiply(1 / this.viewportHeight);
            }
            offsetResult.multiply(this.actualZoom);
            this.systemPositionOffset.subtract(offsetResult);
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
            // Simspeed = number of days per second
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
        canvasManager.drawPlanet(ctx, this.cObjects[0], this.actualZoom, true, this.systemPositionOffset);
        if (this.hohmannOffset === 0 || this.brachistochroneOffset === [0, 0, 0]) {
            this.calculateTravelOptions(false);
        }
        canvasManager.drawHohmannPath(ctx, this.planets[this.travelSource], this.planets[this.travelDestination], 3,
            '#99c140', this.actualZoom, this.systemPositionOffset, this.hohmannOffset);

        canvasManager.drawBrachistochronePath(ctx, this.planets[this.travelSource], this.planets[this.travelDestination], 3,
             '#cc3232', this.actualZoom, this.systemPositionOffset, this.brachistochroneOffset[0], this.brachistochroneOffset[1]);

        canvasManager.drawBrachistochronePath(ctx, this.planets[this.travelSource], this.planets[this.travelDestination], 3,
            '#db7b2b', this.actualZoom, this.systemPositionOffset, this.brachistochroneOffset[2], this.brachistochroneOffset[2] + +this.brachistochroneResults[5]);

        // draw all the planets
        for (let p = 0; p < this.planets.length; p++) {
            canvasManager.drawOrbit(ctx, this.planets[p], this.cObjects[0], this.actualZoom, 1, this.systemPositionOffset);
            canvasManager.drawPlanet(ctx, this.planets[p], this.actualZoom, true, this.systemPositionOffset);
            // Update Moons
            if (this.showMoons && this.planets[p].moons.length !== 0) {
                for (let m = 0; m < this.planets[p].moons.length; m++) {
                    canvasManager.drawMoon(ctx, this.planets[p].moons[m], this.actualZoom, false, this.systemPositionOffset);
                }
            }
        }
        // draw empty or unidentified orbits
        for (let c = 1; c < this.cObjects.length; c++) {
            canvasManager.drawObjectArea(ctx, this.cObjects[c], this.cObjects[c].size, this.actualZoom, true, this.systemPositionOffset);
        }

        // draw selectors for selected planets
        canvasManager.drawSelector(ctx, this.planets[this.travelSource], this.actualZoom, this.systemPositionOffset, 3,
            '#16DB93', this.actualDate * 10);
        canvasManager.drawSelector(ctx, this.planets[this.travelDestination], this.actualZoom, this.systemPositionOffset, 3,
            '#E2EF70', this.actualDate * 10);
    }

    private updateGUI() {
        if (this.dateUnlocked) {
            this.ngZone.run(() => this.setDate());
        }
    }

    private setDate() {
        const dates = this.getDateForTimeStamp(this.actualDate);
        this.currentDateD = +dates[0];
        this.currentDateM = +dates[1];
        this.currentDateY = +dates[2];
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
        if (typeof window.innerWidth !== 'undefined') {
            viewPortWidth = window.innerWidth;
            viewPortHeight = window.innerHeight;
        }else if (typeof document.documentElement !== 'undefined'
            && typeof document.documentElement.clientWidth !==
            'undefined' && document.documentElement.clientWidth !== 0) {
            viewPortWidth = document.documentElement.clientWidth;
                viewPortHeight = document.documentElement.clientHeight;
        }else {
            viewPortWidth = document.getElementsByTagName('body')[0].clientWidth;
                viewPortHeight = document.getElementsByTagName('body')[0].clientHeight;
        }

        this.viewportWidth = viewPortWidth;
        this.viewportHeight = viewPortHeight;

        const doc = document.getElementById('simulatorCanvas');
        doc.setAttribute('width', '' + this.viewportWidth);
        doc.setAttribute('height', '' + this.viewportHeight);
    }

    private getDateForTimeStamp(timeStamp: number) {
        const dateResult: string[] = new Array<string>(3);
        let dateRemainder: number = timeStamp;
        let remainingDays = dateRemainder % 336;
        remainingDays = remainingDays % 28;
        dateResult[0] = '' + Math.floor(remainingDays);

        dateRemainder = dateRemainder - remainingDays;
        let remainingMonths = dateRemainder % 336;
        remainingMonths = remainingMonths / 28;
        dateResult[1] = '' + Math.floor(remainingMonths);

        dateRemainder = dateRemainder - remainingMonths;
        const remainingYears = dateRemainder / 336;
        dateResult[2] = '' + Math.floor(remainingYears);
        return dateResult;
    }

    private loadAllObjects(source: string) {
        this.cObjects = loadObjects.loadCObjects(source + '_system.xml');
        this.planets = loadObjects.loadPlanets(source + '_system.xml');
    }

    private loadDateVisualisation() {
        this.daysList = Library.arbitraryArray(28);
        this.monthsList = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        this.yearsList = Library.arbitraryArray(50);
    }

    // get specific url parameters
    private getUrlParameters() {
        const url = window.location.href;
        const queryString = url ? url.split('?')[1] : window.location.search.slice(1);
        if (queryString) {
            const strings = queryString.split('&');
            for (let i = 0; i < strings.length; i++) {
                const split = strings[i].split('=');
                switch (split[0]) {
                    case 'time':
                        const date = split[1].split('.');
                        if (parseInt(date[0], 10) > 0 && parseInt(date[0], 10) < 29) {
                            this.currentDateD = parseInt(date[0], 10) - 1;
                        }
                        if (parseInt(date[1], 10) > 0 && parseInt(date[1], 10) < 13) {
                            this.currentDateM = parseInt(date[1], 10) - 1;
                        }
                        if (parseInt(date[2], 10) > 0 && parseInt(date[2], 10) < 50) {
                            this.currentDateY = parseInt(date[2], 10);
                        }
                        break;
                    case 'datasource':
                        this.systemDataSource = split[1];
                        break;
                    case 'speed':
                        this.simSpeed = parseInt(split[1], 10);
                        break;
                    case 'zoom':
                        this.zoomLevel = parseInt(split[1], 10);
                        break;
                }
            }
        }
    }

    private calculateHohMannTransfer() {
        const hohMannDeltaV = travelManager.calculateHohmanDeltaV(this.planets[this.travelSource], this.planets[this.travelDestination]);
        this.hohmannResults[0] = /* total DeltaV*/ '' + hohMannDeltaV[0];
        this.hohmannResults[1] = /* insertion Burn */ '' + hohMannDeltaV[1];
        this.hohmannResults[2] = /* arrival Burn */ '' + hohMannDeltaV[2];
        this.hohmannResults[3] = /* travel time for hohman*/'' + travelManager.calculateHohmanTransferTime(this.planets[this.travelSource], this.planets[this.travelDestination]);
        this.hohmannResults[4] = /* next window in days*/'' + travelManager.calculateDaysToNextHohmanTravelDate(this.planets[this.travelSource], this.planets[this.travelDestination], this.actualDate);
        this.hohmannOffset = +this.actualDate + +this.hohmannResults[4];
        const tempDate = this.getDateForTimeStamp(this.actualDate + +this.hohmannResults[4]);
        this.hohmannResults[5] = '' + this.daysList[tempDate[0]] + ' ' + this.monthsList[tempDate[1]] + ' ' + tempDate[2];
        this.hohmannResults[6] = /* launch window every x days*/'' + travelManager.calculateHohmanTransferWindow(this.planets[this.travelSource], this.planets[this.travelDestination]);
    }

    private calculateBrachistochroneTransfer() {
        // brachistochrone transfer results
        this.brachistochroneResults[0] = /* DeltaV Required*/'' + travelManager.calculateBrachistochroneDeltaV(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG, this.actualDate);
        this.brachistochroneResults[1] = /* Brachistochrone travel time at full thrust (now)*/'' + travelManager.calculateBrachistochroneTransitTime(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG, this.actualDate);
        this.brachistochroneResults[2] = /* Ideal Brachistochrone Launch*/'' + travelManager.calculateNextBrachistochroneTransit(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG, this.actualDate);
        const tempDate = this.getDateForTimeStamp(this.actualDate + +this.brachistochroneResults[2]);
        this.brachistochroneResults[3] = /* Ideal Brachistochrone Launch date*/'' + this.daysList[tempDate[0]] + ' ' + this.monthsList[tempDate[1]] + ' ' + [tempDate[2]];
        this.brachistochroneOffset[0] = /* Launch Date Now*/ this.actualDate;
        this.brachistochroneOffset[1] = /* Brachistochrone arrival date*/this.actualDate + +this.brachistochroneResults[1];

        this.brachistochroneResults[4] = /* DeltaV Required*/'' + travelManager.calculateBrachistochroneDeltaV(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG, this.actualDate + +this.brachistochroneResults[2]);
        this.brachistochroneResults[5] = /* Ideal Brachistochrone travel time*/'' + travelManager.calculateBrachistochroneTransitTime(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG, this.actualDate + +this.brachistochroneResults[2]);
        this.brachistochroneOffset[2] = this.actualDate + +this.brachistochroneResults[2];
    }

    calculateDirectFlight() {
        // TODO: do direct flight calculations (when to leave, coasting etc)
    }
}
