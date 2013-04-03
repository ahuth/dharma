/*jslint vars: true, browser: true */
/*global dharma */

dharma.init = (function (name, document, core) {
	"use strict";
    
	// General control flow subscriptions.
    core.subscribe("widget-clicked", name, function (widget) {
        core.publish("clear-screen");
		core.publish("show-breakdown", widget);
        core.publish("capture-history");
    });
    core.subscribe("group-clicked", name, function (group) {
        core.publish("clear-screen");
        core.publish("show-overview", group);
        core.publish("capture-history");
    });
	
	// Main entry point for the program.  Start off by showing the jenkintown
    // overview.  Then capture the current state of the page so we can come back
    // to it later with the back-button.
    core.publish("show-overview", "jenkintown");
    core.publish("capture-history");
    
}("init", parent.document, dharma.core));