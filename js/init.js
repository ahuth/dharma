/*jslint vars: true, browser: true */
/*global dharma */

dharma.init = (function (name, document, core) {
	"use strict";
    
    // Main entry point for the program.  Start off by showing the jenkintown
    // overview.  Then subscribe to control-flow messages.
    core.publish("show-overview", "jenkintown");
    core.subscribe("widget-clicked", name, function (widget) {
        core.publish("clear-screen");
    });
    core.subscribe("group-clicked", name, function (group) {
        core.publish("clear-screen");
        core.publish("show-overview", group);
    });
    
}("init", parent.document, dharma.core));