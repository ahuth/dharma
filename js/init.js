/*jslint vars: true, browser: true */
/*global dharma */

dharma.init = (function (name, document, core) {
	"use strict";
    
	// General control flow subscriptions.
    core.subscribe("widget-clicked", name, function (widget) {
        core.publish("clear-screen");
		core.publish("show-breakdown", widget);
    });
    core.subscribe("group-clicked", name, function (group) {
        core.publish("clear-screen");
        core.publish("show-overview", group);
    });
	core.subscribe("show-overview", name, function () {
		core.publish("capture-history");
	});
	core.subscribe("show-breakdown", name, function () {
		core.publish("capture-history");
	});
	
	// Main entry point for the program.  Start off by showing the jenkintown
    // overview.
    core.publish("show-overview", "jenkintown");
    
}("init", parent.document, dharma.core));