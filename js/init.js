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
	
	// Main entry point for the program.  Start off by showing the jenkintown
	// overview.
	core.publish("show-overview", "jenkintown");
	
}("init", dharma.core));