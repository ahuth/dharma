/*jslint vars: true, browser: true */
/*global dharma */

// init does some initial setup of the app, manages what happens when a widget or
// group label get clicked, and starts the ball rolling by publishing an initial
// "show-overview" message.
dharma.init = (function (name, core) {
	"use strict";
	
	core.subscribe("widget-clicked", name, function (group, widget) {
		core.publish("clear-screen");
		core.publish("show-breakdown", group.toLowerCase(), widget.toLowerCase());
	});
	core.subscribe("group-clicked", name, function (group) {
		core.publish("clear-screen");
		core.publish("show-overview", group.toLowerCase());
	});
	
	// Main entry point for the program.  Start off by showing the Jenkintown
	// overview.
	core.publish("show-overview", "jenkintown");
	
	// Insert today's date into the time#today element on the page.
	var currentDate = (function () {
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
					  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			today = new Date(),
			dateElement = document.getElementById("today");
		dateElement.innerHTML = months[today.getMonth()] + " " + today.getDate() + ", " + today.getFullYear();
	}());
	currentDate = null;
	
}("init", dharma.core));