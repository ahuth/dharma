/*jslint vars: true, browser: true */
/*global dharma */

dharma.init = (function (me, core) {
	"use strict";
    core.publish("clear-content");
    core.publish("show-overview", "jenkintown");
}("init", dharma.core));