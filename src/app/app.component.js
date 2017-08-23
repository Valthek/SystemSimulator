System.register(['./system/engine/Library', "angular2/core", "./system/engine/vector2d", "./system/loadObjects", "./system/engine/canvasManager", "./system/engine/travelManager"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var Library_1, core_1, vector2d_1, loadObjects_1, canvasManager_1, travelManager_1;
    var AppComponent;
    return {
        setters:[
            function (Library_1_1) {
                Library_1 = Library_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (vector2d_1_1) {
                vector2d_1 = vector2d_1_1;
            },
            function (loadObjects_1_1) {
                loadObjects_1 = loadObjects_1_1;
            },
            function (canvasManager_1_1) {
                canvasManager_1 = canvasManager_1_1;
            },
            function (travelManager_1_1) {
                travelManager_1 = travelManager_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(ngZone) {
                    this.ngZone = ngZone;
                    this.framerate = 60;
                    this.nowTime = 0;
                    this.thenTime = 0;
                    this.deltaTime = 0;
                    this.currentDateY = 0;
                    this.currentDateM = 0;
                    this.currentDateD = 0;
                    this.travelDestination = 0;
                    this.travelSource = 0;
                    this.shipThrustInG = 0;
                    // Visualisation Options
                    this.simSpeed = 1;
                    this.zoomLevel = 10;
                    this.isRunning = true;
                    this.showMoons = true;
                    this.playButtonText = "Pause Animation";
                    this.systemPositionOffset = new vector2d_1.vector2d(0, 0);
                    this.dateUnlocked = true;
                    this.daysList = [];
                    this.yearsList = [];
                    this.calculationDate = new Array(3);
                    this.hohmanResults = new Array(5);
                    this.brachistochroneResults = new Array(16);
                    this.showResults = false;
                    // internal data
                    this.actualDate = 0;
                    this.actualZoom = 1;
                    this.thenTime = Date.now();
                    this.loadDateVisualisation();
                    this.loadAllObjects();
                    console.log("The simulator has loaded. Starting...");
                    this.isRunning = true;
                }
                AppComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    this.context = this.myCanvas.nativeElement.getContext("2d");
                    this.updateCanvas();
                    this.ngZone.runOutsideAngular(function () { return _this.tick(); });
                };
                AppComponent.prototype.ngOnDestroy = function () {
                    this.isRunning = false;
                };
                AppComponent.prototype.togglePlay = function () {
                    this.isRunning = !this.isRunning;
                    if (this.isRunning) {
                        this.dateUnlocked = true;
                        this.playButtonText = "Pause Animation";
                    }
                    else {
                        this.dateUnlocked = false;
                        this.playButtonText = "Resume Animation";
                    }
                };
                AppComponent.prototype.onTimeSubmit = function () {
                    var newDate = (+this.currentDateY * 336) + (+this.currentDateM * 28) + +this.currentDateD;
                    this.actualDate = newDate;
                    this.updateObjects();
                    this.dateUnlocked = true;
                };
                AppComponent.prototype.calculateTravelOptions = function () {
                    this.showResults = true;
                    this.calculationDate[0] = "" + this.currentDateD;
                    this.calculationDate[1] = "" + this.currentDateM;
                    this.calculationDate[2] = "" + this.currentDateY;
                    // hohman transfer results
                    this.hohmanResults[0] = "" + travelManager_1.travelManager.calculateHohmanDeltaV(this.planets[this.travelSource], this.planets[this.travelDestination])[0];
                    this.hohmanResults[1] = "" + travelManager_1.travelManager.calculateHohmanDeltaV(this.planets[this.travelSource], this.planets[this.travelDestination])[1];
                    this.hohmanResults[2] = "" + travelManager_1.travelManager.calculateHohmanDeltaV(this.planets[this.travelSource], this.planets[this.travelDestination])[2];
                    this.hohmanResults[3] = "" + travelManager_1.travelManager.calculateHohmanTransferTime(this.planets[this.travelSource], this.planets[this.travelDestination]);
                    this.hohmanResults[4] = "" + travelManager_1.travelManager.calculateHohmanTransferWindow(this.planets[this.travelSource], this.planets[this.travelDestination]);
                    this.hohmanResults[5] = "" + travelManager_1.travelManager.calculateDaysToNextHohmanTravelDate(this.planets[this.travelSource], this.planets[this.travelDestination], this.actualDate);
                    // brachistochrone transfer results
                    this.brachistochroneResults[0] = "" + travelManager_1.travelManager.calculateBrachistochroneDeltaVNow(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG);
                    this.brachistochroneResults[1] = "" + travelManager_1.travelManager.calculateBrachistochroneTransitTimeNow(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG);
                    this.brachistochroneResults[2] = "" + travelManager_1.travelManager.calculateNextBrachistochroneTransit(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG, this.actualDate);
                    this.brachistochroneResults[3] = "" + travelManager_1.travelManager.calculateBrachistochroneDeltaVNow(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG / 2);
                    this.brachistochroneResults[4] = "" + travelManager_1.travelManager.calculateBrachistochroneTransitTimeNow(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG / 2);
                    this.brachistochroneResults[5] = "" + travelManager_1.travelManager.calculateNextBrachistochroneTransit(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG / 2, this.actualDate);
                    this.brachistochroneResults[6] = "" + travelManager_1.travelManager.calculateBrachistochroneDeltaVNow(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG / 4);
                    this.brachistochroneResults[7] = "" + travelManager_1.travelManager.calculateBrachistochroneTransitTimeNow(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG / 4);
                    this.brachistochroneResults[8] = "" + travelManager_1.travelManager.calculateNextBrachistochroneTransit(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG / 4, this.actualDate);
                };
                AppComponent.prototype.canvasMouseDown = function (e) {
                    console.log("mouse down" + " " + e.offsetX + " " + e.offsetY);
                };
                AppComponent.prototype.lockTime = function () {
                    this.dateUnlocked = false;
                };
                AppComponent.prototype.tick = function () {
                    var _this = this;
                    requestAnimationFrame(function () { return _this.tick(); });
                    // Update Time
                    this.updateTime();
                    this.updateCanvas();
                    var ctx = this.context;
                    if (this.isRunning) {
                        // Increment current date
                        this.actualDate += (this.simSpeed * this.deltaTime);
                    }
                    if (this.cObjects.length > 0 && this.planets.length > 0) {
                        // Update position of all objects
                        this.updateObjects();
                        // Render all objects
                        this.render(ctx);
                    }
                    // update Form objecst & GUI
                    this.updateGUI();
                };
                AppComponent.prototype.updateObjects = function () {
                    // Update Planets
                    for (var p = 0; p < this.planets.length; p++) {
                        this.planets[p].setAngle(this.actualDate);
                        this.planets[p].updatePosition(this.cObjects[0].currentPosition);
                        // Update Moons
                        if (this.planets[p].moons.length > 0) {
                            for (var m = 0; m < this.planets[p].moons.length; m++) {
                                this.planets[p].moons[m].setAngle(this.actualDate);
                                this.planets[p].moons[m].updatePosition(this.planets[p].currentPosition);
                            }
                        }
                    }
                };
                AppComponent.prototype.render = function (ctx) {
                    // deal with Canvas & Background
                    canvasManager_1.canvasManager.clearCanvas(ctx);
                    canvasManager_1.canvasManager.drawSky(ctx);
                    // draw all the planets
                    for (var p = 0; p < this.planets.length; p++) {
                        canvasManager_1.canvasManager.drawOrbit(ctx, this.planets[p], this.cObjects[0], this.actualZoom, 1);
                        canvasManager_1.canvasManager.drawPlanet(ctx, this.planets[p], this.actualZoom, true);
                        // Update Moons 
                        if (this.showMoons && this.planets[p].moons.length != 0) {
                            for (var m = 0; m < this.planets[p].moons.length; m++) {
                                canvasManager_1.canvasManager.drawMoon(ctx, this.planets[p].moons[m], this.actualZoom, false);
                            }
                        }
                    }
                    canvasManager_1.canvasManager.drawPlanet(ctx, this.cObjects[0], this.actualZoom, false);
                    // draw empty or unidentified orbits
                    for (var c = 1; c < this.cObjects.length; c++) {
                        canvasManager_1.canvasManager.drawObjectArea(ctx, this.cObjects[c], this.cObjects[c].size, this.actualZoom, true);
                    }
                };
                AppComponent.prototype.updateGUI = function () {
                    var _this = this;
                    if (this.dateUnlocked) {
                        this.ngZone.run(function () { return _this.setDate(_this.actualDate); });
                    }
                };
                AppComponent.prototype.updateTime = function () {
                    this.nowTime = Date.now();
                    this.deltaTime = (this.nowTime - this.thenTime) / 1000; // seconds since last frame
                    this.thenTime = this.nowTime;
                };
                AppComponent.prototype.updateCanvas = function () {
                    this.actualZoom = this.zoomLevel / 10;
                    var viewPortWidth;
                    var viewPortHeight;
                    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
                    if (typeof window.innerWidth != 'undefined') {
                        viewPortWidth = window.innerWidth,
                            viewPortHeight = window.innerHeight;
                    }
                    else if (typeof document.documentElement != 'undefined'
                        && typeof document.documentElement.clientWidth !=
                            'undefined' && document.documentElement.clientWidth != 0) {
                        viewPortWidth = document.documentElement.clientWidth,
                            viewPortHeight = document.documentElement.clientHeight;
                    }
                    else {
                        viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
                            viewPortHeight = document.getElementsByTagName('body')[0].clientHeight;
                    }
                    this.viewportWidth = viewPortWidth;
                    this.viewportHeight = viewPortHeight;
                    var doc = document.getElementById("simulatorCanvas");
                    doc.setAttribute('width', "" + this.viewportWidth);
                    doc.setAttribute('height', "" + this.viewportHeight);
                };
                AppComponent.prototype.setDate = function (newDate) {
                    var dateRemainder = newDate;
                    var year = Math.floor(dateRemainder / 336);
                    dateRemainder = +dateRemainder - (year * 336);
                    this.currentDateY = year;
                    var month = Math.floor(dateRemainder / 28);
                    dateRemainder = +dateRemainder - (month * 28);
                    this.currentDateM = month;
                    this.currentDateD = Math.floor(dateRemainder);
                };
                AppComponent.prototype.loadAllObjects = function () {
                    this.cObjects = loadObjects_1.loadObjects.loadCObjects();
                    this.planets = loadObjects_1.loadObjects.loadPlanets();
                };
                AppComponent.prototype.loadDateVisualisation = function () {
                    this.daysList = Library_1.Library.arbitraryArray(28);
                    this.monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    this.yearsList = Library_1.Library.arbitraryArray(50);
                };
                __decorate([
                    core_1.ViewChild("simulatorCanvas"), 
                    __metadata('design:type', core_1.ElementRef)
                ], AppComponent.prototype, "myCanvas", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'simulator',
                    }),
                    core_1.View({
                        templateUrl: "src/app/templates/simulator.html"
                    }), 
                    __metadata('design:paramtypes', [core_1.NgZone])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map