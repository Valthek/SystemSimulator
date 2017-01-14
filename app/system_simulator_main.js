System.register(["angular2/platform/browser", "./system_simulator_app.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, system_simulator_app_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (system_simulator_app_component_1_1) {
                system_simulator_app_component_1 = system_simulator_app_component_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(system_simulator_app_component_1.AppComponent);
        }
    }
});
//# sourceMappingURL=system_simulator_main.js.map