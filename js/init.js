/*jslint vars: true, browser: true */
/*global dharma */

dharma.init = (function (name, core) {
	"use strict";
    
    core.subscribe("widget-clicked", name, function (widget) {
        core.publish("clear-screen");
		core.publish("show-breakdown", widget);
    });
    core.subscribe("group-clicked", name, function (group) {
        core.publish("clear-screen");
        core.publish("show-overview", group);
    });
    core.subscribe("reconstruct-previous-state", name, function (data) {
        core.publish("clear-screen");
        core.publish("update-breadcrumbs", data.group, data.category);
        if (data.type === "overview") {
            core.publish("reconstruct-overview");
        } else {
            core.publish("reconstruct-breakdown");
        }
    });
	
	// Main entry point for the program.  Start off by showing the jenkintown
    // overview.
    core.publish("show-overview", "jenkintown");
    
}("init", dharma.core));