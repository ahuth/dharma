/*jslint vars: true, browser: true, nomen: true, plusplus: true */
/*global dharma */

dharma.widgets = dharma.widgets || {};

dharma.widgets.quality_breakdown = (function (name, Charts, Widget, core) {
    "use strict";
	
	var me = new Widget(name, "quality-breakdown-template", "fail-breakdown-template"),
        destination = "content";
	
	core.subscribe("clear-screen", name, function () {
        me.remove();
    });
	
	core.subscribe("show-breakdown", name, function (_group, _what) {
		var args = {
            type: "breakdown",
            what: _what,
            group: _group
        };
        if (_what !== "quality") {
            return;
        }
        core.publish("request-data", args);
        core.subscribe("here's-data", name, function (_args, response) {
			var data;
            // See if the response is from the request we made.
            if (args !== _args) {
                return;
            }
            // After we render this, we won't need to listen for more data.
            core.unsubscribe("here's-data", name);
            core.unsubscribe("no-data", name);
			// The dates we get back from the server are strings, so we must
			// massage them into javacript date objects.  Also, add up the values
			// for each date to get cumulative numbers.
			//data = convertDates(response[_what]);
			//data = accumulateKarma(data);
			me.renderSuccess(destination);
			//drawChart(data);
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
	
}("quality-breakdown", parent.Charts, dharma.widget, dharma.core));