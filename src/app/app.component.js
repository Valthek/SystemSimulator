System.register(["angular2/core", "./system/engine/vector2d", "./system/loadObjects", "./system/engine/canvasManager", "./system/engine/travelManager"], function(exports_1, context_1) {
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
    var core_1, vector2d_1, loadObjects_1, canvasManager_1, travelManager_1;
    var AppComponent;
    return {
        setters:[
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
                    this.zoomLevel = 23;
                    this.isRunning = true;
                    this.showMoons = true;
                    this.playButtonText = "Pause Animation";
                    this.systemPositionOffset = new vector2d_1.vector2d(0, 0);
                    this.dateUnlocked = true;
                    // internal data
                    this.actualDate = 0;
                    this.thenTime = Date.now();
                    this.loadAllObjects();
                    console.log("The simulator has loaded. Starting...");
                    this.isRunning = true;
                }
                AppComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    this.context = this.myCanvas.nativeElement.getContext("2d");
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
                    console.log(this.actualDate);
                    console.log(this.currentDateY * 366 + "y" + this.currentDateM * 28 + "m" + this.currentDateD + "d");
                    var newDate = (+this.currentDateY * 366) + (+this.currentDateM * 28) + +this.currentDateD;
                    console.log(newDate);
                    this.dateUnlocked = true;
                    this.actualDate = newDate;
                    this.updateObjects();
                };
                AppComponent.prototype.calculateTravelOptions = function () {
                    travelManager_1.travelManager.calculateHohmanDeltaV(this.planets[this.travelSource], this.planets[this.travelDestination]);
                    travelManager_1.travelManager.calculateHohmanTransferTime(this.planets[this.travelSource], this.planets[this.travelDestination]);
                    travelManager_1.travelManager.calculateHohmanTransferWindow(this.planets[this.travelSource], this.planets[this.travelDestination]);
                    travelManager_1.travelManager.calculateLaunchTiming(this.planets[this.travelSource], this.planets[this.travelDestination]);
                    travelManager_1.travelManager.calculateBrachistochroneDeltaV(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG);
                    travelManager_1.travelManager.calculateBrachistochroneTransitTime(this.planets[this.travelSource], this.planets[this.travelDestination], this.shipThrustInG);
                    travelManager_1.travelManager.calculateDaysToNextHohmanTravelDate(this.planets[this.travelSource], this.planets[this.travelDestination], this.actualDate);
                };
                AppComponent.prototype.canvasMouseDown = function () {
                    console.log("mouse down");
                };
                AppComponent.prototype.lockTime = function () {
                    this.dateUnlocked = false;
                };
                AppComponent.prototype.tick = function () {
                    var _this = this;
                    requestAnimationFrame(function () { return _this.tick(); });
                    // Update Time
                    this.updateTime();
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
                AppComponent.prototype.render = function () {
                    // deal with Canvas & Background
                    var ctx = this.context;
                    canvasManager_1.canvasManager.clearCanvas(ctx);
                    canvasManager_1.canvasManager.drawSky(ctx);
                    // draw all the planets
                    for (var p = 0; p < this.planets.length; p++) {
                        canvasManager_1.canvasManager.drawOrbit(ctx, this.planets[p], this.cObjects[0], this.zoomLevel, 1);
                        canvasManager_1.canvasManager.drawPlanet(ctx, this.planets[p], this.zoomLevel, true);
                        // Update Moons 
                        if (this.showMoons && this.planets[p].moons.length != 0) {
                            for (var m = 0; m < this.planets[p].moons.length; m++) {
                                canvasManager_1.canvasManager.drawMoon(ctx, this.planets[p].moons[m], this.zoomLevel, false);
                            }
                        }
                    }
                    canvasManager_1.canvasManager.drawPlanet(ctx, this.cObjects[0], this.zoomLevel, false);
                    // draw empty or unidentified orbits
                    for (var c = 1; c < this.cObjects.length; c++) {
                        canvasManager_1.canvasManager.drawObjectArea(ctx, this.cObjects[c], this.cObjects[c].size, this.zoomLevel, true);
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