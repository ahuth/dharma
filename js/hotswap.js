/*jslint vars: true, browser: true, nomen: true */
/*global dharma */

dharma.hotswap = (function (me, core) {
	"use strict";
    
    core.subscribe("show-overview", me, function (_group) {
        // Subscribe to data response channels.
        core.subscribe("request-data-complete", me, function (args, response) {
            // Publish the data and unsubscribe.
        });
        core.subscribe("request-data-failed", me, function (args) {
            // Publish the failure and unsubscribe.
        });
        // Ask for data.
        core.publish("request-data", {type: "overview", what: "karma", group: _group});
        core.publish("request-data", {type: "overview", what: "quality", group: _group});
        core.publish("request-data", {type: "overview", what: "spending", group: _group});
        core.publish("request-data", {type: "overview", what: "production", group: _group});
    });
    
}("hotswap", dharma.core));