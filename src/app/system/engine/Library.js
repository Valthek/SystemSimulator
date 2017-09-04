System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var library;
    return {
        setters:[],
        execute: function() {
            library = (function () {
                function library() {
                }
                Object.defineProperty(library, "astronomicalUnit", {
                    //Astronomical unit in meters
                    get: function () { return 149597870700; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(library, "gravitationConstant", {
                    // gravitation constant for Antara TODO: make editable
                    get: function () { return 116798853600000000000; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(library, "monthsInAYear", {
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
                library.arbitraryArray = function (size) {
                    // return an arbitrarily large sized array (mostly for ngFor loops)
                    return size ? library.arbitraryArray(size - 1).concat(size) : [];
                };
                return library;
            }());
            exports_1("library", library);
        }
    }
});
//# sourceMappingURL=library.js.map