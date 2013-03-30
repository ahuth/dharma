/*jslint vars: true, browser: true, nomen: true */
/*global dharma */

dharma.hotswap = (function (me, core) {
	"use strict";
    
    core.subscribe("show-overview", me, function (_group) {
        core.publish("clear-content");
        // Ask for data.  Hopefully another module is listening for these data
        // requests to be succesful.
        core.publish("request-data", {type: "overview", what: "karma", group: _group});
        core.publish("request-data", {type: "overview", what: "quality", group: _group});
        core.publish("request-data", {type: "overview", what: "spending", group: _group});
        core.publish("request-data", {type: "overview", what: "production", group: _group});
    });
    
}("hotswap", dharma.core));