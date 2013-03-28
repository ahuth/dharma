/*jslint vars: true, browser: true */
/*global dharma */

dharma.render = (function (document, hogan, core) {
	"use strict";
    var me = "render";
    
	var templates = {
		karma      : hogan.compile(document.getElementById("karma-template").innerHTML),
		quality    : hogan.compile(document.getElementById("quality-template").innerHTML),
		spending   : hogan.compile(document.getElementById("spending-template").innerHTML),
		production : hogan.compile(document.getElementById("production-template").innerHTML),
		fail       : hogan.compile(document.getElementById("fail-template").innerHTML)
	};
	
}(parent.document, parent.Hogan, dharma.core));