/*jslint vars: true, browser: true */
/*global dharma */

dharma.init = (function (name, core) {
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
	
	// Main entry point for the program.  Start off by showing the jenkintown
    // overview.  Then capture the current state of the page so we can come back
    // to it later with the back-button.
    core.publish("show-overview", "jenkintown");
    
}("init", dharma.core));