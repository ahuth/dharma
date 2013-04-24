/*jslint vars: true, browser: true, plusplus: true */
/*global dharma */

// init does some initial setup of the app, manages what happens when a widget or
// group label get clicked, and starts the ball rolling by publishing an initial
// "show-overview" message.
dharma.init = (function (name, document, core) {
	"use strict";
	
	// Manage what happens when we click on a widget, group-link, or breadcrumb.
	core.subscribe("widget-clicked", name, function (group, widget) {
		core.publish("show-breakdown", group.toLowerCase(), widget.toLowerCase());
	});
	core.subscribe("group-clicked", name, function (group) {
		core.publish("show-overview", group.toLowerCase());
	});
	core.subscribe("breadcrumb-clicked", name, function (group) {
		core.publish("show-overview", group.toLowerCase());
	});
	
	// When we show an overview, cheat by starting to download the data we might
	// need if the user clicks on one of the widgets.
	core.subscribe("show-overview", name, function (group) {
		var categories = ["karma", "quality", "spending", "production"],
			item;
		for (item = 0; item < categories.length; item++) {
			core.publish("cache-data", {
				type: "breakdown",
				group: group,
				what: categories[item]
			});
		}
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
	
}("init", parent.document, dharma.core));