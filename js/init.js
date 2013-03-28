/*jslint vars: true, browser: true */
/*global dharma */

dharma.init = (function (me, core) {
	"use strict";
	core.subscribe("test", me, function () {
		alert("Test");
	});
	core.publish("test", {});
    core.unsubscribe("test", me);
    core.publish("test", {});
}("init", dharma.core));