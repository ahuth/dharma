/*jslint vars: true, browser: true */
/*global dharma */

dharma.init = (function (me, core) {
	"use strict";
	core.publish("request-ajax", {type: "overview", what: "karma", group: "jeknintown"});
}("init", dharma.core));