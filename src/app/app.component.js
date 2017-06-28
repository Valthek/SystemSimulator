System.register(["angular2/core", "./system/loadObjects", "./system/engine/canvasManager"], function(exports_1, context_1) {
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
    var core_1, loadObjects_1, canvasManager_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
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
                    this.simSpeed = 1;
                    this.zoomLevel = 20;
                    this.currentDate = 0;
                    this.framerate = 60;
                    this.planets = loadObjects_1.loadObjects.loadPlanets();
                }
                AppComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    this.running = true;
                    this.context = this.myCanvas.nativeElement.getContext("2d");
                    this.ngZone.runOutsideAngular(function () { return _this.tick(); });
                };
                AppComponent.prototype.ngOnDestroy = function () {
                    this.running = false;
                };
                AppComponent.prototype.tick = function () {
                    var _this = this;
                    if (this.running) {
                        var ctx = this.context;
                        canvasManager_1.canvasManager.clearCanvas(ctx);
                        canvasManager_1.canvasManager.drawSky(ctx);
                        // draw all the planets
                        for (var i = 0; i < this.planets.length; i++) {
                            this.planets[i].updatePosition(this.simSpeed / 250);
                            this.currentDate += this.simSpeed / 250;
                            console.log(this.currentDate);
                            canvasManager_1.canvasManager.drawOrbit(ctx, this.planets[i], this.zoomLevel);
                            canvasManager_1.canvasManager.drawPlanet(ctx, this.planets[i], this.zoomLevel);
                        }
                    }
                    requestAnimationFrame(function () { return _this.tick(); });
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