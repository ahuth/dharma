/*jslint vars: true, browser: true, nomen: true, plusplus: true */
/*global dharma */

dharma.widgets = dharma.widgets || {};

dharma.widgets.production = (function (name, accounting, Widget, core) {
    "use strict";
    
    var chartOptions = {bar_width: 20, bar_spacing: 46};
    // me is our instance of the Widget object.  In the initialization we specify
    // the name and templates to use.
    var me = new Widget("production", "production-overview-template", "fail-overview-template");
    // destination is the default location on the page we'll render this widget
    // to.
    var destination = "content";
    
    // formatResultsObject takes our ajax response and formats the numbers as
    // money.
    function formatResults(obj) {
        var item, output = {};
        output.results = [];
        for (item = 0; item < obj.results.length; item++) {
            output.results.push({
                milestone: obj.results[item].milestone,
                result: accounting.formatMoney(obj.results[item].result, "$", 0)
            });
        }
        return output;
    }
    
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
            var item, results;
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
                return;
            }
            // Format the numbers and output them.
            results = formatResults(response[name]);
            me.renderSuccess(destination, results);
            me.addEvent("click", function () {
                core.publish("widget-clicked", _group, name);
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
    
    core.subscribe("reconstruct-overview", name, function (data) {
        var results;
        if (!data.hasOwnProperty(name)) {
            me.renderFail(destination);
            return;
        }
        results = formatResults(data[name]);
        me.renderSuccess(destination, results);
        me.addEvent("click", function () {
            core.publish("widget-clicked", data.group, name);
        });
    });
    
}("production", parent.accounting, dharma.widget, dharma.core));