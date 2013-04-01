/*jslint vars: true, browser: true, nomen: true */
/*global dharma */

dharma.widgets = dharma.widgets || {};

dharma.widgets.karma = (function (name, Widget, core) {
    "use strict";
    
    // me is our instance of the Widget object.  In the initialization we specify
    // the name and templates to use.
    var me = new Widget("karma", "karma-template", "fail-template");
    // args is the arguments we use when requesting data.  We save these so that
    // we can recognize the returned request.
    var args;
    // destination is the default location on the page we'll render this widget
    // to.
    var destination = "content";
    
    core.subscribe("clear-screen", name, function () {
        me.remove();
    });
    
    core.subscribe("show-overview", name, function (_group) {
        args = {
            type: "overview",
            what: name,
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
            // Make sure that the data looks right.
            if (!response.hasOwnProperty(name)) {
                me.renderFail(destination);
            }
            me.renderSuccess(destination, response[name]);
            me.addEvent("click", function () {
                alert("Hello!");
            });
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
    
}("karma", dharma.widget, dharma.core));