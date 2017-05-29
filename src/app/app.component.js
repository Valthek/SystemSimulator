System.register(["angular2/core", "./system/objects/planet", "./system/engine/drawCanvas"], function(exports_1, context_1) {
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
    var core_1, planet_1, drawCanvas_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (planet_1_1) {
                planet_1 = planet_1_1;
            },
            function (drawCanvas_1_1) {
                drawCanvas_1 = drawCanvas_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    //planets: planet[] = loadObjects.loadPlanets();
                    this.p = new planet_1.planet("test", 1, 3);
                    this.canvas = new drawCanvas_1.drawCanvas();
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'simulator',
                        templateUrl: "src/app/templates/canvas.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
            this.canvas.drawCanvas(p);
        }
    }
});
//# sourceMappingURL=app.component.js.map