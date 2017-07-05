System.register(["angular2/core", "./system/engine/vector2d", "./system/loadObjects", "./system/engine/canvasManager"], function(exports_1, context_1) {
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
    var core_1, vector2d_1, loadObjects_1, canvasManager_1;
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
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(ngZone) {
                    this.ngZone = ngZone;
                    this.framerate = 60;
                    // Visualisation Options
                    this.simSpeed = 1;
                    this.zoomLevel = 23;
                    this.isRunning = true;
                    this.showMoons = true;
                    this.playButtonText = "Stop";
                    this.systemPositionOffset = new vector2d_1.vector2d(0, 0);
                    // internal data
                    this.actualDate = 0;
                    this.planets = loadObjects_1.loadObjects.loadPlanets();
                    //this.cObjects = loadObjects.loadCObjects();
                }
                AppComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    this.isRunning = true;
                    this.context = this.myCanvas.nativeElement.getContext("2d");
                    this.ngZone.runOutsideAngular(function () { return _this.tick(); });
                };
                AppComponent.prototype.ngOnDestroy = function () {
                    this.isRunning = false;
                };
                AppComponent.prototype.tick = function () {
                    var _this = this;
                    requestAnimationFrame(function () { return _this.tick(); });
                    if (this.isRunning) {
                        var ctx = this.context;
                        canvasManager_1.canvasManager.clearCanvas(ctx);
                        canvasManager_1.canvasManager.drawSky(ctx);
                        // draw all the planets
                        for (var i = 0; i < this.planets.length; i++) {
                            this.planets[i].updatePosition(this.simSpeed / 10, this.planets[0].currentPosition);
                            if (this.showMoons && this.planets[i].moons.length) {
                                for (var o = 0; o < this.planets[i].moons.length; o++) {
                                    this.planets[i].moons[o].updatePosition(this.simSpeed / 10, this.planets[i].currentPosition);
                                }
                            }
                            this.actualDate += (this.simSpeed / this.framerate);
                            canvasManager_1.canvasManager.drawOrbit(ctx, this.planets[i], this.zoomLevel);
                            canvasManager_1.canvasManager.drawPlanet(ctx, this.planets[i], this.zoomLevel);
                        }
                        this.ngZone.run(function () { return _this.setDate(); });
                    }
                };
                AppComponent.prototype.togglePlay = function () {
                    this.isRunning = !this.isRunning;
                    if (this.isRunning) {
                        this.playButtonText = "Stop";
                    }
                    else {
                        this.playButtonText = "Play";
                    }
                };
                AppComponent.prototype.onTimeSubmit = function () {
                    this.actualDate = this.currentDateY * 366 + this.currentDateM * 28 + this.currentDateD;
                    var ctx = this.context;
                    canvasManager_1.canvasManager.clearCanvas(ctx);
                    canvasManager_1.canvasManager.drawSky(ctx);
                    for (var i = 0; i < this.planets.length; i++) {
                        this.planets[i].setPosition(this.actualDate);
                        if (this.showMoons && this.planets[i].moons.length) {
                            for (var o = 0; o < this.planets[i].moons.length; o++) {
                                this.planets[i].moons[o].updatePosition(this.simSpeed / 10, this.planets[i].currentPosition);
                            }
                        }
                        canvasManager_1.canvasManager.drawOrbit(ctx, this.planets[i], this.zoomLevel);
                        canvasManager_1.canvasManager.drawPlanet(ctx, this.planets[i], this.zoomLevel);
                    }
                };
                AppComponent.prototype.setDate = function () {
                    var dateRemainder = this.actualDate;
                    var year = Math.floor(dateRemainder / 336);
                    dateRemainder = +dateRemainder - (year * 336);
                    this.currentDateY = year;
                    var month = Math.floor(dateRemainder / 28);
                    dateRemainder = +dateRemainder - (month * 28);
                    this.currentDateM = month;
                    this.currentDateD = Math.floor(dateRemainder);
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