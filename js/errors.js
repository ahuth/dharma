/*jslint vars: true, browser: true */

var dharma = dharma || {};

// errors provides error logging services.
dharma.errors = (function (console) {
    "use strict";
    
    function log(moduleName, functionName, errorMessage) {
        var errorString = "Module: " + moduleName + ", function: " + functionName +
                          ", error: " + errorMessage;
        console.log(errorString);
    }
    
    return {
        log: log
    };

}(parent.console));