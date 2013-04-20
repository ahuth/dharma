/*jslint vars: true, browser: true */
/*global dharma */

dharma.init = (function (name, core) {
	"use strict";
	
	core.subscribe("widget-clicked", name, function (group, widget) {
		core.publish("clear-screen");
		core.publish("show-breakdown", group, widget);
	});
	core.subscribe("group-clicked", name, function (group) {
		core.publish("clear-screen");
		core.publish("show-overview", group);
	});
	core.subscribe("reconstruct-previous-state", name, function (data) {
		core.publish("clear-screen");
		if (data.type === "overview") {
			core.publish("reconstruct-overview", data);
		} else {
			core.publish("reconstruct-breakdown", data);
		}
	});
	
	// Main entry point for the program.  Start off by showing the jenkintown
	// overview.
	core.publish("show-overview", "jenkintown");
	
}("init", dharma.core));