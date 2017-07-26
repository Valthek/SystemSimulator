System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Library;
    return {
        setters:[],
        execute: function() {
            Library = (function () {
                function Library() {
                }
                Object.defineProperty(Library, "astronomicalUnit", {
                    get: function () { return 149597870700; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Library, "gravitationConstant", {
                    get: function () { return 116798853600000000000; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Library, "monthsInAYear", {
                    get: function () {
                        var months;
                        (function (months) {
                            months[months["January"] = 0] = "January";
                            months[months["February"] = 1] = "February";
                            months[months["March"] = 2] = "March";
                            months[months["April"] = 3] = "April";
                            months[months["May"] = 4] = "May";
                            months[months["June"] = 5] = "June";
                            months[months["July"] = 6] = "July";
                            months[months["August"] = 7] = "August";
                            months[months["September"] = 8] = "September";
                            months[months["October"] = 9] = "October";
                            months[months["November"] = 10] = "November";
                            months[months["December"] = 11] = "December";
                        })(months || (months = {}));
                        return months;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Library;
            }());
            exports_1("Library", Library);
        }
    }
});
//# sourceMappingURL=Library.js.map