/*jslint vars: true, browser: true */
/*global dharma */

dharma.init = (function (name, core) {
	"use strict";
    // Main entry point for the program.  Start off by showing the jenkintown
    // overview.
    core.publish("show-overview", "jenkintown");
    // Main program subscriptions that control the flow.
    core.subscribe("widget-clicked", name, function (widget) {
        core.publish("clear-screen");
        alert(widget);
    });
}("init", dharma.core));