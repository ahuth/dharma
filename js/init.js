/*jslint vars: true, browser: true */
/*global dharma */

dharma.init = (function (core) {
	"use strict";
	core.subscribe("test", function () {
		alert("Test");
	});
	core.publish("test", {});
}(dharma.core));