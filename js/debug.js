/*jslint vars: true, browser: true */

var dharma = dharma || {};

// errors provides error logging services.
dharma.debug = (function (console) {
    "use strict";
    
    function log(moduleName, functionName, errorMessage) {
        var errorString = "Module: " + moduleName + ", function: " + functionName +
                          ", error: " + errorMessage;
        console.log(errorString);
    }
	
	function var_dump(variable) {
		var item;
		switch (typeof variable) {
		case "object":
			for (item in variable) {
				if (variable.hasOwnProperty(item)) {
					console.log(item + ":" + variable[item]);
				}
			}
			break;
		default:
			console.log(typeof variable + ":" + variable);
			break;
		}
	}
    
    return {
        log: log,
		var_dump: var_dump
    };

}(parent.console));