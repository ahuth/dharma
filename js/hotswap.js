/*jslint vars: true, browser: true, nomen: true */
/*global dharma */

dharma.hotswap = (function (me, core) {
	"use strict";
    
    // allTrue checks an object to see if all of its values are true.
    function allTrue(obj) {
        var item;
        for (item in obj) {
            if (obj.hasOwnProperty(item)) {
                if (obj[item] !== true) {
                    return false;
                }
            }
        }
        return true;
    }
    
    core.subscribe("show-overview", me, function (_group) {
        // Keep track of which widgets have been rendered.
        var rendered = {karma: false, quality: false, spending: false, production: false};
        // Subscribe to data response channels.
        core.subscribe("request-data-complete", me, function (args, response) {
            core.publish("data-ready", response);
            rendered[args.what] = true;
            if (allTrue(rendered)) {
                core.unsubscribe("request-data-complete", me);
                core.unsubscribe("request-data-failed", me);
            }
        });
        core.subscribe("request-data-failed", me, function (args) {
            core.publish("data-failed", args.what);
            rendered[args.what] = true;
            if (allTrue(rendered)) {
                core.unsubscribe("request-data-complete", me);
                core.unsubscribe("request-data-failed", me);
            }
        });
        // Ask for data.
        core.publish("request-data", {type: "overview", what: "karma", group: _group});
        core.publish("request-data", {type: "overview", what: "quality", group: _group});
        core.publish("request-data", {type: "overview", what: "spending", group: _group});
        core.publish("request-data", {type: "overview", what: "production", group: _group});
    });
    
}("hotswap", dharma.core));