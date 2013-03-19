/*jslint vars: true, browser: true */

var dharma = dharma || {};

dharma.templates = (function (document, hogan) {
	"use strict";
    
    var karma = hogan.compile(document.getElementById("karma-template").innerHTML);
    
    return {
        karma: karma
    };
    
}(parent.document, parent.Hogan));