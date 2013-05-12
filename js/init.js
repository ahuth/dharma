/*jslint vars: true, browser: true, plusplus: true */
/*global dharma */

// init does some initial setup of the app, manages what happens when a widget or
// group label get clicked, and starts the ball rolling by publishing an initial
// "show-overview" message.
dharma.init = (function (name, core) {
	"use strict";
	
	// Manage what happens when we click on a widget, group-link, or breadcrumb.
	core.subscribe("widget-clicked", function (group, widget) {
		core.publish("show-breakdown", group.toLowerCase(), widget.toLowerCase());
	});
	core.subscribe("group-clicked", function (group) {
		core.publish("show-overview", group.toLowerCase());
	});
	core.subscribe("breadcrumb-clicked", function (group) {
		core.publish("show-overview", group.toLowerCase());
	});
	
	// When we show an overview, cheat by starting to download the data we might
	// need if the user clicks on one of the widgets.
	core.subscribe("show-overview", function (group) {
		var type = "breakdown";
		core.publish("cache-data", {type: type, group: group, what: "karma"});
		core.publish("cache-data", {type: type, group: group, what: "quality"});
		core.publish("cache-data", {type: type, group: group, what: "spending"});
		core.publish("cache-data", {type: type, group: group, what: "production"});
	});
	
	// Main entry point for the program.  Start off by showing the Jenkintown
	// overview.
	core.publish("show-overview", "jenkintown");
	
}("init", dharma.core));