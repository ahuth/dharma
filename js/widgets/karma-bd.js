/*jslint vars: true, browser: true, nomen: true */
/*global dharma */

dharma.widgets = dharma.widgets || {};

dharma.widgets.karma = (function (name, Widget, core) {
    "use strict";
    
    var me = new Widget(name, "karma-breakdown-template", "fail-overview-template"),
        destination = "content";
    
    core.subscribe("clear-screen", name, function () {
        me.remove();
    });
    
    core.subscribe("show-breakdown", name, function (_group, _what) {
        if (_what !== "karma") {
            return;
        }
        var args = {
            type: "breakdown",
            what: _what,
            group: _group
        };
        core.publish("request-data", args);
        core.subscribe("here's-data", name, function (_args, response) {
            // See if the response is from the request we made.
            if (args !== _args) {
                return;
            }
            // After we render this, we won't need to listen for more data.
            core.unsubscribe("here's-data", name);
            core.unsubscribe("no-data", name);
            me.renderSuccess(destination, {});
        });
        core.subscribe("no-data", name, function (_args) {
            if (args !== _args) {
                return;
            }
            me.renderFail(destination);
            core.unsubscribe("here's-data", name);
            core.unsubscribe("no-data", name);
        });
    });
    
}("karma-breakdown", dharma.widget, dharma.core));