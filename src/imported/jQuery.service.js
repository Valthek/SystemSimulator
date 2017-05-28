System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1;
    var JQ_TOKEN;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            exports_1("JQ_TOKEN", JQ_TOKEN = new core_1.OpaqueToken('jQuery'));
        }
    }
});
//# sourceMappingURL=jQuery.service.js.map