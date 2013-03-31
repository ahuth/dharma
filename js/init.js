/*jslint vars: true, browser: true */
/*global dharma */

dharma.init = (function (me, core) {
	"use strict";
    // Main entry point for the program.  Start off by showing the jenkintown
    // overview.
    core.publish("show-overview", "jenkintown");
}("init", dharma.core));