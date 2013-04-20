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
	
	// Insert today's date into the time#today element on the page.
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
				  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		today = new Date();
	document.getElementById("today").innerHTML = months[today.getMonth()] +
												 " " + today.getDate() +
												 ", " + today.getFullYear();
	months = null;
	today = null;
	
}("init", dharma.core));