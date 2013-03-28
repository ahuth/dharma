/*jslint vars: true, browser: true */
/*global dharma */

dharma.init = (function (core) {
	"use strict";
    var me = "init";
	core.subscribe("test", me, function () {
		alert("Test");
	});
	core.publish("test", {});
    core.unsubscribe("test", me);
    core.publish("test", {});
}(dharma.core));