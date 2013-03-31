/*jslint vars: true, browser: true, nomen: true */
/*global dharma */

dharma.widgets = dharma.widgets || {};

dharma.widgets.quality = (function (name, accounting, Widget, core) {
    "use strict";
    
    // me is our instance of the Widget object.  In the initialization we specify
    // the name and templates to use.
    var me = new Widget("quality", "quality-template", "fail-template");
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
            var data;
            if (args !== _args) {
                return;
            }
            core.unsubscribe("here's-data", name);
            core.unsubscribe("no-data", name);
            if (!response.hasOwnProperty(name)) {
                me.renderFail(destination);
            }
            data = {
                turnbacks: response[name].turnbacks,
                scrap: accounting.formatMoney(response[name].scrap, "$", 0)
            };
            me.renderSuccess(destination, data);
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
    
}("quality", parent.accounting, dharma.widget, dharma.core));