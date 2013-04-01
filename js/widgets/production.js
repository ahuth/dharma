/*jslint vars: true, browser: true, nomen: true */
/*global dharma */

dharma.widgets = dharma.widgets || {};

dharma.widgets.production = (function (name, accounting, Widget, core) {
    "use strict";
    
    // me is our instance of the Widget object.  In the initialization we specify
    // the name and templates to use.
    var me = new Widget("production", "production-template", "fail-template");
    // destination is the default location on the page we'll render this widget
    // to.
    var destination = "content";
    
    core.subscribe("clear-screen", name, function () {
        me.remove();
    });
    
    core.subscribe("show-overview", name, function (_group) {
        // args is the arguments we use when requesting data.  We save these so
        // that we can recognize the returned request.
        var args = {
            type: "overview",
            what: name,
            group: _group
        };
        core.publish("request-data", args);
        core.subscribe("here's-data", name, function (_args, response) {
            var totalData, nutsData, boltsData,
                chartOptions = {bar_width: 20, bar_spacing: 46};
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
            me.renderSuccess(destination);
            // Split up our data and format everything.
            totalData = response[name].total;
            nutsData = response[name].nuts;
            boltsData = response[name].bolts;
            // Make some charts!
            core.publish("request-chart", "bar", "total-prod-chart", totalData, chartOptions);
            core.publish("request-chart", "bar", "nuts-prod-chart", nutsData, chartOptions);
            core.publish("request-chart", "bar", "bolts-prod-chart", boltsData, chartOptions);
            me.addEvent("click", function () {
                core.publish("widget-clicked", name);
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
    
}("production", parent.accounting, dharma.widget, dharma.core));